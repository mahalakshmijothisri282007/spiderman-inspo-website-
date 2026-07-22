import { AI_TOOLS } from './portfolioContent'

type Props = {
  className?: string
}

/** Dual-track marquee — hover pauses (matches live site hint). */
export function AiToolsMarquee({ className = '' }: Props) {
  const dup = [...AI_TOOLS, ...AI_TOOLS]

  return (
    <div className={`marquee-wrap ${className}`.trim()}>
      <div className="marquee marquee--a">
        <div className="marquee__track">
          {dup.map((tool, i) => (
            <span key={`a-${i}-${tool}`} className="marquee__pill">
              {tool}
            </span>
          ))}
        </div>
      </div>
      <div className="marquee marquee--b">
        <div className="marquee__track marquee__track--slow">
          {dup.map((tool, i) => (
            <span key={`b-${i}-${tool}`} className="marquee__pill">
              {tool}
            </span>
          ))}
        </div>
      </div>
      <p className="marquee-wrap__live">{AI_TOOLS.length}+ tools · synced from mj Portfolio</p>
    </div>
  )
}
