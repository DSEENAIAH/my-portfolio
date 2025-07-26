export function Progress({ value }) {
  return (
    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-400 to-pink-500"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
