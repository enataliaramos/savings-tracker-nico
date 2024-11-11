} else (
  <div style={{ 
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }}>
    <h3 style={{ 
      fontSize: '18px', 
      fontWeight: '500',
      marginBottom: '15px',
      color: '#374151'
    }}>
      Select Account
    </h3>
    
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px'
    }}>
      {availableCards.map(card => (
        <div
          key={card.id}
          onClick={() => setSelectedCard(card.id)}
          style={{
            padding: '15px',
            borderRadius: '10px',
            backgroundColor: selectedCard === card.id ? card.color : '#f8f9fa',
            color: selectedCard === card.id ? 'white' : '#374151',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            border: `2px solid ${selectedCard === card.id ? card.color : 'transparent'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <div style={{ 
            fontWeight: '500', 
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px' 
          }}>
            <span style={{
              backgroundColor: card.color,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              display: 'inline-block',
              border: '2px solid white'
            }}></span>
            {card.name}
          </div>
          <div style={{ 
            fontSize: '14px',
            opacity: selectedCard === card.id ? 0.9 : 0.6
          }}>
            {card.description}
          </div>
        </div>
      ))}
    </div>

    <div style={{ marginTop: '20px' }}>
      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          fontSize: '16px',
          marginBottom: '15px'
        }}
      />
      <button
        onClick={() => setIsAdmin(password === '123456')}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: availableCards.find(c => c.id === selectedCard)?.color || '#4ade80',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Login as Admin
      </button>
    </div>
  </div>
)
