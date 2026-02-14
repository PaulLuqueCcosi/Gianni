import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [showLetter, setShowLetter] = useState(false)
  const [letterText, setLetterText] = useState('')

  useEffect(() => {
    fetch('/texto.txt')
      .then(response => response.text())
      .then(text => setLetterText(text))
      .catch(() => setLetterText('Error al cargar el texto'))
  }, [])

  return (
    <div className="bridgerton-container">
      {!showLetter ? (
        <div className="cover-page">
          <div className="ornament-top"></div>
          <div className="cover-content">
            <div className="floral-border">
              <h1 className="cover-title">Una Carta</h1>
              <div className="subtitle">de Corazón Sincero</div>
              <div className="decorative-line"></div>
              <div className="season-text">Temporada Social de 1813</div>
            </div>
          </div>
          <button className="open-letter-btn" onClick={() => setShowLetter(true)}>
            Abrir Carta
          </button>
          <div className="ornament-bottom"></div>
        </div>
      ) : (
        <div className="letter-page">
          <div className="letter-ornament-top"></div>
          <div className="letter-content">
            <div className="wax-seal"></div>
            <div className="letter-text">
              {letterText.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          <button className="back-btn" onClick={() => setShowLetter(false)}>
            Volver a la Portada
          </button>
          <div className="letter-ornament-bottom"></div>
        </div>
      )}
    </div>
  )
}

export default App
