"use client"

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      className={`flex h-12 w-full rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-sm ring-1 ring-inset ring-slate-900/50 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-slate-600 ${className || ''}`}
      {...props}
    />
  );
}

export default Input;
