export function Card({ children, className = '' }) {
  return <div className={`p-4 rounded-lg shadow bg-white/10 ${className}`}>{children}</div>
}

export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>
}

export function CardTitle({ children }) {
  return <h3 className="text-xl font-bold text-white">{children}</h3>
}

export function CardDescription({ children }) {
  return <p className="text-white/70 text-sm">{children}</p>
}

export function CardContent({ children }) {
  return <div>{children}</div>
}
