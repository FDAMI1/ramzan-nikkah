// Silhouette for the Maghrib scene: a domed masjid with two minarets between
// palms and the low Mumbai skyline. Drawn once; coloured by `fill`.
export default function Skyline({ className = '', fill = '#0B1233' }) {
  return (
    <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <g fill={fill}>
        {/* City blocks */}
        <path d="M0 300V214h46v-30h38v44h30v-62h52v40h28v-24h44v58h36v-18h40v96zM1440 300v-92h-40v-36h-44v52h-30v-60h-54v44h-26v-20h-46v56h-38v-14h-40v70z" />
        <path d="M150 300v-138h22v-16h20v16h22v138zM1250 300v-128h24v-18h18v18h24v128z" />
        {/* Masjid base and steps */}
        <path d="M560 300v-104h320v104zM540 300v-26h360v26z" />
        {/* Side domes */}
        <path d="M600 196c0-28 18-40 34-48 16 8 34 20 34 48zM772 196c0-28 18-40 34-48 16 8 34 20 34 48z" />
        {/* Main dome with finial and crescent */}
        <path d="M640 196c0-62 46-86 80-108 34 22 80 46 80 108z" />
        <path d="M717 88V58h6v30z" />
        <path d="M720 30a12 12 0 1 0 9 20 10 10 0 1 1-9-20z" />
        {/* Minarets */}
        <path d="M506 300V112h20v188zM914 300V112h20v188z" />
        <path d="M500 140h32v8h-32zM500 196h32v8h-32zM908 140h32v8h-32zM908 196h32v8h-32z" />
        <path d="M506 112l10-44 10 44zM914 112l10-44 10 44z" />
        <path d="M514 68h4v-14h-4zM922 68h4v-14h-4z" />
        {/* Arched doorway cut-outs read as lit windows */}
        <path d="M700 300v-56c0-14 10-22 20-28 10 6 20 14 20 28v56z" fill="#F0C88A" opacity=".55" />
        <path d="M620 250v-22c0-6 5-10 10-13 5 3 10 7 10 13v22zM800 250v-22c0-6 5-10 10-13 5 3 10 7 10 13v22z" fill="#F0C88A" opacity=".4" />
        {/* Palms */}
        <path d="M330 300c4-60 0-110-12-150l6-2c14 40 18 92 14 152z" />
        <path d="M322 150c-30-14-62-10-84 6 26-6 52-4 80 6-24 2-50 14-66 32 22-14 48-22 74-24-12 14-20 34-20 54 10-22 24-40 40-52 6 18 6 40 2 60 12-20 14-44 8-64 22 4 44 18 58 34-8-22-28-40-52-46 22-8 48-6 70 6-20-18-48-24-74-18 18-14 40-20 64-18-26-12-54-8-74 6z" />
        <path d="M1118 300c-4-52 0-98 10-132l6 2c-10 32-12 78-8 130z" />
        <path d="M1130 168c26-14 56-12 76 2-24-4-48-2-72 8 22 2 44 12 58 28-20-12-42-18-64-20 10 12 18 30 18 48-10-20-22-34-36-44-6 16-6 34-2 52-10-18-12-38-6-56-20 4-38 16-50 30 8-20 26-36 48-42-20-6-42-4-62 6 18-16 42-22 66-16-16-12-36-16-56-14 24-10 50-6 68 8z" />
      </g>
    </svg>
  )
}
