"use client"

function Avatar({ className, src, name, ...props }) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : '?';
  return (
    <div className={`relative inline-flex items-center justify-center h-11 w-11 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold text-sm shadow-lg border-2 border-slate-800/50 hover:shadow-glow transition-all ${className || ''}`} {...props}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}

export default Avatar;
