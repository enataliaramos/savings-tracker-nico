export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#1a1a1a',
          fontSize: '24px',
          marginBottom: '20px'
        }}>Loading Savings Tracker...</h1>
      </div>
    </main>
  )
}
