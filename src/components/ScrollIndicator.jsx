import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span className="font-display text-[11px] uppercase tracking-[0.3em] text-white/50">
        Scroll
      </span>
      <div className="flex h-9 w-6 justify-center rounded-full border border-white/25 p-1">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-neon-cyan"
          animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
