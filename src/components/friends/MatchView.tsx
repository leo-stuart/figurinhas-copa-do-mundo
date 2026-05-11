import Link from 'next/link'
import { ArrowLeft, ArrowLeftRight, Gift, HandHeart, PackageOpen } from 'lucide-react'
import { getStickerInfo } from '@/lib/album-data'
import type { Match } from '@/domain/entities/Match'

interface Props {
  friendName: string
  match: Match
}

export default function MatchView({ friendName, match }: Props) {
  const totalForMe = match.friendDupesForMe.length
  const totalForFriend = match.myDupesForFriend.length

  return (
    <div className="match-view">
      <header className="match-header">
        <Link href="/friends" className="link-button match-back">
          <ArrowLeft size={16} /> Voltar
        </Link>
        <div>
          <div className="hero-kicker">Trocas</div>
          <h1 className="match-title">
            <ArrowLeftRight size={22} aria-hidden="true" />
            {friendName}
          </h1>
        </div>
      </header>

      <section className="match-columns">
        <MatchColumn
          title={`${friendName} tem para você`}
          subtitle="Repetidas dele(a) que cobrem suas faltas"
          icon={<Gift size={18} />}
          codes={match.friendDupesForMe}
          total={totalForMe}
          empty="Sem ofertas no momento."
          accent="for-me"
        />
        <MatchColumn
          title={`Você tem para ${friendName}`}
          subtitle="Suas repetidas que cobrem as faltas dele(a)"
          icon={<HandHeart size={18} />}
          codes={match.myDupesForFriend}
          total={totalForFriend}
          empty="Sem repetidas suas que cubram faltas dele(a)."
          accent="for-friend"
        />
      </section>
    </div>
  )
}

function MatchColumn({
  title,
  subtitle,
  icon,
  codes,
  total,
  empty,
  accent,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  codes: string[]
  total: number
  empty: string
  accent: 'for-me' | 'for-friend'
}) {
  return (
    <div className={`match-column match-column--${accent}`}>
      <div className="match-column-header">
        <div className="match-column-titles">
          <span className="match-column-icon">{icon}</span>
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>
        <span className="match-column-count">{total}</span>
      </div>
      {codes.length === 0 ? (
        <div className="empty-state match-empty">
          <PackageOpen size={28} strokeWidth={2} />
          <p>{empty}</p>
        </div>
      ) : (
        <ul className="match-list">
          {codes.map(code => {
            const info = getStickerInfo(code)
            return (
              <li key={code} className="match-item">
                <span className="match-item-code">{code}</span>
                <span className="match-item-title">{info.title}</span>
                <span className="match-item-sub">{info.sub}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
