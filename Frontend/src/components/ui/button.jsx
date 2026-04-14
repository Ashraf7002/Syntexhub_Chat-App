"use client"

function Button({ className, variant = 'default', size = 'default', ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-xl text-sm font-semibold ring-offset-slate-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md hover:shadow-lg backdrop-blur-sm border border-transparent";
  
  const variantClasses = variant === 'default' ? "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white" :
    variant === 'destructive' ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white" :
    variant === 'ghost' ? "bg-slate-800/50 hover:bg-slate-700/70 hover:border-primary-500/50 text-white border border-slate-700/50" :
    variant === 'outline' ? "bg-transparent hover:bg-slate-800/30 text-white border border-slate-700/50 hover:border-primary-500" :
    "bg-slate-800/70 hover:bg-slate-700 text-white border border-slate-700/50";

  const sizeClasses = size === 'default' ? "h-11 px-6" :
    size === 'sm' ? "h-9 px-4" :
    size === 'lg' ? "h-12 px-8" :
    size === 'icon' ? "h-11 w-11" : "h-11 w-11";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ''}`}
      {...props}
    />
  );
}

export default Button;
