import React, { useState } from "react";

export const ThoughtBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl border border-stone-800/40 bg-[#1a1a1a] font-sans text-[15px] text-stone-300 antialiased shadow-2xl">
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export const ThoughtLog = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="group border-b border-stone-800/30 last:border-b-0">
      <button
        className="flex w-full cursor-pointer select-none items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
        onClick={() => setOpen(!open)}
      >
        <div className="flex h-5 w-5 items-center justify-center text-stone-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-0" : "-rotate-90"}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <span className="text-[14px] font-medium text-stone-400 transition-colors group-hover:text-stone-300">
          {title}
        </span>
      </button>
      {open && (
        <div className="custom-scrollbar max-h-[600px] space-y-8 overflow-y-auto px-11 pb-8 pt-2">
          {children}
        </div>
      )}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
};

export const AnalyzedLog = ({ path }: { path: string }) => {
  return (
    <div className="group flex items-center gap-3 border-b border-stone-800/30 px-5 py-3 text-left text-stone-300 transition-all last:border-b-0 hover:bg-white/[0.03]">
      <div className="h-4 w-4 shrink-0 text-stone-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2h-0A2 2 0 0 0 3.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
        </svg>
      </div>
      <div className="font-sans text-[13px] text-stone-500 transition-colors group-hover:text-stone-400">
        Analyzed{" "}
        <span className="font-mono text-[11px] italic opacity-70">{path}</span>
      </div>
    </div>
  );
};

export const ThoughtStep = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-top-1 duration-500">
      <h4 className="!mb-0 !mt-3 text-[16px] font-bold leading-tight tracking-tight text-stone-200">
        {title}
      </h4>
      <div className="m-0 text-[15px] font-normal leading-[1.6] text-stone-400">
        {children}
      </div>
    </div>
  );
};
