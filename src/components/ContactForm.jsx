import { useState } from "react";
import { CheckIcon, AlertIcon } from "./icons";

const PROJECT_TYPES = ["Web", "App Móvil", "Datos", "IA", "Otro"];

const STATUS = { IDLE: "idle", SUBMITTING: "submitting", SUCCESS: "success", ERROR: "error" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Ingresá tu nombre.";
  if (!fields.email.trim()) errors.email = "Ingresá tu email.";
  else if (!EMAIL_RE.test(fields.email)) errors.email = "Ese email no parece válido.";
  if (!fields.projectType) errors.projectType = "Elegí una opción.";
  if (!fields.message.trim()) errors.message = "Contanos brevemente qué necesitás.";
  else if (fields.message.trim().length < 10) errors.message = "Contanos un poco más (mínimo 10 caracteres).";
  return errors;
}

const inputBase =
  "min-h-12 w-full rounded-xl border border-border bg-text/5 px-4 text-base text-text placeholder:text-text-faint transition-colors focus:border-neon-cyan/60 focus:outline-none";

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-text-muted">{label}</label>
      {children}
      {/* Error inline: borde/texto en magenta suave, como pide el resto del
          formulario — reutiliza el acento de marca en vez de un rojo genérico. */}
      {error && <p className="mt-1.5 text-sm text-neon-magenta/90">{error}</p>}
    </div>
  );
}

/**
 * Formulario de #contacto. Envía por Web3Forms (POST JSON directo a su API,
 * sin backend propio). La access key sale de VITE_WEB3FORMS_KEY — ver
 * .env.example para cómo configurarla.
 */
export default function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", projectType: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    setErrors((er) => (er[name] ? { ...er, [name]: undefined } : er));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot: un bot que autocompleta todos los inputs va a llenar este
    // campo oculto; un humano nunca lo ve. Si viene lleno, cortamos en
    // silencio (sin mostrar error, para no darle pistas al bot).
    if (e.target.elements.botcheck.value) return;

    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus(STATUS.SUBMITTING);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: fields.name,
          email: fields.email,
          project_type: fields.projectType,
          message: fields.message,
          subject: `Nuevo lead EMIA — ${fields.projectType}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus(STATUS.SUCCESS);
        setFields({ name: "", email: "", projectType: "", message: "" });
      } else {
        setStatus(STATUS.ERROR);
      }
    } catch {
      setStatus(STATUS.ERROR);
    }
  }

  if (status === STATUS.SUCCESS) {
    return (
      <div className="glass flex flex-col items-center rounded-2xl px-8 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-neon-green text-neon-green">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-text">¡Mensaje enviado!</h3>
        <p className="mt-2 max-w-sm text-base text-text-muted">
          Te respondemos en menos de 24 horas.
        </p>
        <button
          type="button"
          onClick={() => setStatus(STATUS.IDLE)}
          className="mt-8 min-h-12 rounded-full border border-border px-6 text-base text-text transition-colors hover:border-neon-cyan/60"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-6 sm:p-8">
      {/* Honeypot: oculto visualmente y para lectores de pantalla, pero
          presente en el DOM/tab order engañoso para bots simples. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {/* [PC] Nombre + Email lado a lado (sm: 2 columnas) · [MÓVIL] apilados */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" error={errors.name}>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            autoComplete="name"
            className={inputBase}
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            autoComplete="email"
            className={inputBase}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Tipo de proyecto" error={errors.projectType}>
          <select
            name="projectType"
            value={fields.projectType}
            onChange={handleChange}
            className={`${inputBase} appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23a9aabb%22 stroke-width=%221.6%22%3E%3Cpath d=%22M6 9l6 6 6-6%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${
              fields.projectType ? "" : "text-text-faint"
            }`}
          >
            <option value="" disabled>
              Elegí una opción
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} className="text-text">
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Mensaje" error={errors.message}>
          <textarea
            name="message"
            value={fields.message}
            onChange={handleChange}
            placeholder="Cuéntanos qué estás construyendo..."
            rows={5}
            className={`${inputBase} min-h-32 resize-y py-3`}
          />
        </Field>
      </div>

      {status === STATUS.ERROR && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-neon-magenta/40 bg-neon-magenta/5 p-4 text-sm text-text">
          <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-neon-magenta" />
          <p>
            No pudimos enviar tu mensaje. Probá de nuevo o escribinos directo a{" "}
            <a href="mailto:hola@emiastudios.com" className="underline hover:text-neon-cyan">
              hola@emiastudios.com
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === STATUS.SUBMITTING}
        className="relative mt-7 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta px-8 font-display font-medium text-[#0a0a0f] transition-opacity disabled:opacity-70"
      >
        {status === STATUS.SUBMITTING ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f]"
            />
            Enviando...
          </>
        ) : status === STATUS.ERROR ? (
          "Reintentar envío"
        ) : (
          "Enviar mensaje"
        )}
      </button>
    </form>
  );
}
