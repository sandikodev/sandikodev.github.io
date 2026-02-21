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
  const [showToast, setShowToast] = useState<"error" | "idle" | "success">(
    "idle",
  );

  const handleInput =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowToast("idle");

    try {
      // Craft a professional WhatsApp message
      const text = `*New Contact Message from Portfolio* 🚀

*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

---
_Sent via sandikodev.github.io_`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/6289649246450?text=${encodedText}`;

      // Logic delay for feedback synchronization
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Trigger the Toast
      setShowToast("success");

      // Small delay before redirect to let user see the toast
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1500);

      setFormData({ email: "", message: "", name: "", subject: "" });

      // Auto hide toast
      setTimeout(() => setShowToast("idle"), 5000);
    } catch {
      setShowToast("error");
      setTimeout(() => setShowToast("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-inner relative">
      {/* Premium Toast Notification */}
      {showToast !== "idle" && (
        <div
          className={`animate-in fade-in slide-in-from-bottom-10 fixed bottom-8 right-1/2 z-50 flex w-[90%] translate-x-1/2 items-center gap-4 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 md:right-8 md:w-auto md:translate-x-0 ${
            showToast === "success"
              ? "border-green-500/20 bg-white/80 dark:bg-slate-900/80"
              : "border-red-500/20 bg-white/80 dark:bg-slate-900/80"
          }`}
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-opacity-10 ${
              showToast === "success"
                ? "bg-green-500 text-green-500"
                : "bg-red-500 text-red-500"
            }`}
          >
            {showToast === "success" ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                ></path>
              </svg>
            )}
          </div>
          <div className="flex flex-col pr-8">
            <h4 className="text-sm font-bold text-main">
              {showToast === "success" ? "Inquiry Sent!" : "Transfer Error"}
            </h4>
            <p className="text-xs text-muted">
              {showToast === "success"
                ? "Opening WhatsApp for secure discussion..."
                : "Failed to process your request. Please try again."}
            </p>
          </div>
          <button
            className="absolute right-3 top-3 text-muted hover:text-main"
            onClick={() => setShowToast("idle")}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </button>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="group">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted transition-colors group-focus-within:text-primary"
              htmlFor="name"
            >
              Nama Lengkap
            </label>
            <input
              className="bg-surface/50 focus:border-primary/50 focus:ring-primary/5 w-full rounded-xl border border-border px-4 py-3.5 text-main shadow-sm outline-none backdrop-blur-md transition-all focus:ring-4"
              id="name"
              onChange={handleInput("name")}
              placeholder="Your full name"
              required
              type="text"
              value={formData.name}
            />
          </div>

          <div className="group">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted transition-colors group-focus-within:text-primary"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="bg-surface/50 focus:border-primary/50 focus:ring-primary/5 w-full rounded-xl border border-border px-4 py-3.5 text-main shadow-sm outline-none backdrop-blur-md transition-all focus:ring-4"
              id="email"
              onChange={handleInput("email")}
              placeholder="example@provider.com"
              required
              type="email"
              value={formData.email}
            />
          </div>
        </div>

        <div className="group">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted transition-colors group-focus-within:text-primary"
            htmlFor="subject"
          >
            Project Category
          </label>
          <input
            className="bg-surface/50 focus:border-primary/50 focus:ring-primary/5 w-full rounded-xl border border-border px-4 py-3.5 text-main shadow-sm outline-none backdrop-blur-md transition-all focus:ring-4"
            id="subject"
            onChange={handleInput("subject")}
            placeholder="e.g. Web Development, UI/UX Design, or API Integration"
            required
            type="text"
            value={formData.subject}
          />
        </div>

        <div className="group">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted transition-colors group-focus-within:text-primary"
            htmlFor="message"
          >
            Project Brief
          </label>
          <textarea
            className="bg-surface/50 focus:border-primary/50 focus:ring-primary/5 min-h-[160px] w-full resize-none rounded-xl border border-border px-4 py-3.5 text-main shadow-sm outline-none backdrop-blur-md transition-all focus:ring-4"
            id="message"
            onChange={handleInput("message")}
            placeholder="Please describe your project goals, preferred stack, and timeline..."
            required
            rows={5}
            value={formData.message}
          />
        </div>

        <button
          className="shadow-primary/20 hover:bg-primary-hover group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 animate-spin text-white"
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
              <span>Processing...</span>
            </div>
          ) : (
            <span className="flex items-center gap-2">
              Send Project Inquiry
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
