import React, { useState } from "react";

interface FormData {
  email: string;
  message: string;
  name: string;
  subject: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    message: "",
    name: "",
    subject: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "error" | "idle" | "success"
  >("idle");

  const handleInput =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({ email: "", message: "", name: "", subject: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="name"
          >
            Nama
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            id="name"
            onChange={handleInput("name")}
            placeholder="Masukkan nama Anda"
            required
            type="text"
            value={formData.name}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            id="email"
            onChange={handleInput("email")}
            placeholder="Masukkan email Anda"
            required
            type="email"
            value={formData.email}
          />
        </div>
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="subject"
        >
          Subjek
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          id="subject"
          onChange={handleInput("subject")}
          placeholder="Subjek pesan"
          required
          type="text"
          value={formData.subject}
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="message"
        >
          Pesan
        </label>
        <textarea
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          id="message"
          onChange={handleInput("message")}
          placeholder="Tulis pesan Anda di sini..."
          required
          rows={6}
          value={formData.message}
        />
      </div>

      <button
        className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:bg-blue-400"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <>
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              ></path>
            </svg>
            Mengirim...
          </>
        ) : (
          "Kirim Pesan"
        )}
      </button>

      {submitStatus === "success" && (
        <div className="rounded-lg border border-green-400 bg-green-100 p-4 text-green-700 dark:bg-green-900 dark:text-green-300">
          Pesan berhasil dikirim! Saya akan membalas segera.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="rounded-lg border border-red-400 bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-300">
          Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.
        </div>
      )}
    </form>
  );
}
