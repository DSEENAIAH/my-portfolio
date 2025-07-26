export function Badge({ children, className = '', variant = '' }) {
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs bg-purple-600 text-white ${className}`}>
      {children}
    </span>
  )
}
