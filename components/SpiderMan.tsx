'use client'

export default function SpiderMan() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: '9%',
        zIndex: 20,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="spiderman-swing"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Ağ ipi */}
        <div
          style={{
            width: '1.5px',
            height: '88px',
            background: 'linear-gradient(to bottom, rgba(210,220,255,0.7) 0%, rgba(190,210,255,0.25) 100%)',
          }}
        />

        {/* Spider-Man — ters asılı */}
        <svg width="76" height="114" viewBox="0 0 76 114" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/* ── BACAKLAR (üstte, ters çünkü) ── */}
          <line x1="38" y1="20" x2="16" y2="3" stroke="rgba(125,155,255,0.82)" strokeWidth="5" strokeLinecap="round"/>
          <line x1="38" y1="20" x2="60" y2="3" stroke="rgba(125,155,255,0.82)" strokeWidth="5" strokeLinecap="round"/>
          <circle cx="15" cy="3" r="4" fill="rgba(125,155,255,0.6)"/>
          <circle cx="61" cy="3" r="4" fill="rgba(125,155,255,0.6)"/>

          {/* ── GÖVDE ── */}
          <ellipse cx="38" cy="44" rx="16" ry="23" fill="#07071e" stroke="rgba(120,150,255,0.25)" strokeWidth="1.5"/>

          {/* Örümcek amblemi */}
          <ellipse cx="38" cy="37" rx="3.5" ry="5.5" fill="rgba(130,160,255,0.42)"/>
          <line x1="38" y1="40" x2="29" y2="49" stroke="rgba(130,160,255,0.32)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="38" y1="40" x2="47" y2="49" stroke="rgba(130,160,255,0.32)" strokeWidth="1.2" strokeLinecap="round"/>

          {/* ── KOLLAR ── */}
          <line x1="29" y1="47" x2="2"  y2="63" stroke="rgba(125,155,255,0.82)" strokeWidth="5" strokeLinecap="round"/>
          <line x1="47" y1="47" x2="74" y2="63" stroke="rgba(125,155,255,0.82)" strokeWidth="5" strokeLinecap="round"/>
          {/* Ağ fırlatıcı bilekler */}
          <circle cx="2"  cy="63" r="4" fill="rgba(185,205,255,0.52)"/>
          <circle cx="74" cy="63" r="4" fill="rgba(185,205,255,0.52)"/>

          {/* ── BOYUN ── */}
          <ellipse cx="38" cy="68" rx="7" ry="4.5" fill="#07071e"/>

          {/* ── KAFA ── */}
          <circle cx="38" cy="91" r="20" fill="#07071e" stroke="rgba(120,150,255,0.25)" strokeWidth="1.5"/>

          {/* Maskede ağ deseni (ince) */}
          <path d="M38 71 Q50 79 55 91 Q50 103 38 111" stroke="rgba(120,150,255,0.11)" strokeWidth="0.9" fill="none"/>
          <path d="M38 71 Q26 79 21 91 Q26 103 38 111" stroke="rgba(120,150,255,0.11)" strokeWidth="0.9" fill="none"/>
          <circle cx="38" cy="91" r="12" stroke="rgba(120,150,255,0.09)" strokeWidth="0.9" fill="none"/>
          <line x1="38" y1="71" x2="38" y2="111" stroke="rgba(120,150,255,0.08)" strokeWidth="0.9"/>
          <line x1="18" y1="91" x2="58" y2="91" stroke="rgba(120,150,255,0.08)" strokeWidth="0.9"/>

          {/* ── GÖZLER (beyaz lens, Spider-Man ikonik şekli) ── */}
          <path d="M15 87 C18 75 32 75 35 84 C32 92 18 93 15 87 Z" fill="white" opacity="0.93"/>
          <path d="M61 87 C58 75 44 75 41 84 C44 92 58 93 61 87 Z" fill="white" opacity="0.93"/>
        </svg>
      </div>
    </div>
  )
}
