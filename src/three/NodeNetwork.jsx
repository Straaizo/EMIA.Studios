import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

const NEON_COLORS = ["#2dd9f5", "#39ff9d", "#ff8a3d", "#ff3dcb", "#4d6bff"];
const NODE_COUNT = 90;
const CONNECT_DISTANCE = 2.6;
const SPREAD = 7;

/**
 * Genera nodos aleatorios dentro de un volumen y las aristas entre
 * los que están a menos de CONNECT_DISTANCE. Se calcula una sola vez:
 * animar solo rotación/parallax del grupo evita recomputar geometría cada frame.
 * `nodeCount` es variable (ver `lite` en NodeNetwork): las conexiones son
 * O(n²), así que bajar de 90 a 45 nodos no solo dibuja menos puntos sino
 * que corta ~4x el trabajo de calcular qué nodos conectar.
 */
function useNetworkGeometry(nodeCount) {
  return useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * SPREAD * 2;
      const y = (Math.random() - 0.5) * SPREAD;
      const z = (Math.random() - 0.5) * SPREAD;
      nodes.push(new THREE.Vector3(x, y, z));

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const c = new THREE.Color(NEON_COLORS[i % NEON_COLORS.length]);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const linePositions = [];
    const lineColors = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < CONNECT_DISTANCE) {
          linePositions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
          const c1 = new THREE.Color(NEON_COLORS[i % NEON_COLORS.length]);
          lineColors.push(c1.r, c1.g, c1.b, c1.r, c1.g, c1.b);
        }
      }
    }

    return {
      positions,
      colors,
      linePositions: new Float32Array(linePositions),
      lineColors: new Float32Array(lineColors),
    };
  }, [nodeCount]);
}

/**
 * `lite`: hardware o viewport débil (ver HeroCanvas) — la mitad de los
 * nodos (y por lo tanto muchas menos líneas, ver nota arriba) y sin
 * Sparkles, que es un sistema de partículas/shader aparte y su propio draw
 * call.
 * `interactive`: false en mobile (HeroCanvas la apaga vía useIsMobile) — sin
 * hover real no tiene sentido seguir el "mouse", y en touch los valores de
 * `state.pointer` durante un scroll/drag son ruidosos (saltan con cada
 * toque), lo que se traduciría en una rotación nerviosa en vez de suave.
 * La autorrotación en Y se mantiene siempre, así igual se ve vivo.
 */
export default function NodeNetwork({ reducedMotion = false, lite = false, interactive = true }) {
  const groupRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const nodeCount = lite ? Math.round(NODE_COUNT / 2) : NODE_COUNT;
  const { positions, colors, linePositions, lineColors } = useNetworkGeometry(nodeCount);
  const { size } = useThree();

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.045;

    if (!interactive) {
      void size;
      return;
    }

    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.03;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.03;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.current.y * 0.25,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -pointer.current.x * 0.15,
      0.05
    );

    // Parallax de cámara sutil siguiendo el mouse
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.current.x * 0.6, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.current.y * 0.4, 0.04);
    state.camera.lookAt(0, 0, 0);

    void size;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {!reducedMotion && !lite && (
        <Sparkles
          count={60}
          scale={[SPREAD * 2, SPREAD, SPREAD * 2]}
          size={2}
          speed={0.25}
          opacity={0.5}
          color="#4d6bff"
        />
      )}
    </group>
  );
}
