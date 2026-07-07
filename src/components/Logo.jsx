export default function Logo({ size = 'default' }) {
  return (
    <div className={`logo logo--${size}`}>
      <span className="logo__mark">D</span>
      <span className="logo__text">Digitorizon</span>
    </div>
  )
}
