import dynamic from 'next/dynamic'

const Converter = dynamic(() => import('../components/Converter'), { ssr: false })

export default function Home() {
  return (
    <div 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '5rem',
        height: 'calc(100vh - 16px)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        fontFamily: 'sans-serif', 
      }}
    >
      <img src="https://neptunemutual.com/logos/neptune-mutual-full.png" width={600} alt="logo" />
      <Converter />
    </div>
  )
}
