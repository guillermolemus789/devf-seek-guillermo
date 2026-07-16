import { useState } from "react";
import { useForm } from "react-hook-form";

function PromptForm() {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSubmittedData(data);
    reset();
  };

  const inputStyles = `
    w-full rounded-xl border bg-slate-950/70 px-4 py-3
    text-slate-100 outline-none transition
    placeholder:text-slate-500
    focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
  `;

  return (
    <section className="w-full max-w-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:p-8"
      >
        <div className="mb-8">
          <span className="inline-block rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
            React Hook Form
          </span>

          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Cuéntanos qué quieres aprender
          </h2>

          <p className="mt-2 text-slate-400">
            Completa el formulario y valida tus datos antes de enviar la
            consulta.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Nombre
            </label>

            <input
              id="name"
              type="text"
              placeholder="Guillermo López"
              aria-invalid={errors.name ? "true" : "false"}
              className={`${inputStyles} ${
                errors.name ? "border-red-500" : "border-slate-700"
              }`}
              {...register("name", {
                required: "El nombre es obligatorio.",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede superar 50 caracteres.",
                },
              })}
            />

            {errors.name && (
              <p role="alert" className="mt-2 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              placeholder="guillermo@email.com"
              aria-invalid={errors.email ? "true" : "false"}
              className={`${inputStyles} ${
                errors.email ? "border-red-500" : "border-slate-700"
              }`}
              {...register("email", {
                required: "El correo electrónico es obligatorio.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresa un correo electrónico válido.",
                },
              })}
            />

            {errors.email && (
              <p role="alert" className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="topic"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Tema
          </label>

          <select
            id="topic"
            aria-invalid={errors.topic ? "true" : "false"}
            className={`${inputStyles} ${
              errors.topic ? "border-red-500" : "border-slate-700"
            }`}
            {...register("topic", {
              required: "Selecciona un tema.",
            })}
          >
            <option value="">Selecciona una opción</option>
            <option value="react">React</option>
            <option value="tailwind">Tailwind CSS</option>
            <option value="formularios">React Hook Form</option>
            <option value="git">Git y GitHub</option>
          </select>

          {errors.topic && (
            <p role="alert" className="mt-2 text-sm text-red-400">
              {errors.topic.message}
            </p>
          )}
        </div>

        <div className="mt-6">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Mensaje
          </label>

          <textarea
            id="message"
            rows="5"
            placeholder="Describe tu duda o lo que te gustaría construir..."
            aria-invalid={errors.message ? "true" : "false"}
            className={`${inputStyles} resize-none ${
              errors.message ? "border-red-500" : "border-slate-700"
            }`}
            {...register("message", {
              required: "El mensaje es obligatorio.",
              minLength: {
                value: 10,
                message: "El mensaje debe tener al menos 10 caracteres.",
              },
              maxLength: {
                value: 500,
                message: "El mensaje no puede superar 500 caracteres.",
              },
            })}
          />

          {errors.message && (
            <p role="alert" className="mt-2 text-sm text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="mt-6">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-600 accent-cyan-400"
              {...register("terms", {
                required: "Debes aceptar los términos para continuar.",
              })}
            />

            <span>
              Confirmo que los datos proporcionados son correctos.
            </span>
          </label>

          {errors.terms && (
            <p role="alert" className="mt-2 text-sm text-red-400">
              {errors.terms.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 w-full rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Enviando..." : "Enviar consulta"}
        </button>
      </form>

      {submittedData && (
        <div
          role="status"
          className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-200"
        >
          <h3 className="font-bold">Formulario enviado correctamente</h3>

          <p className="mt-1 text-sm">
            Gracias, {submittedData.name}. Registramos tu consulta sobre{" "}
            <strong>{submittedData.topic}</strong>.
          </p>
        </div>
      )}
    </section>
  );
}

export default PromptForm;