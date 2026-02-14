import { useState, useEffect, useRef } from 'react'
import './App.css'

interface Question {
  question: string
  answers: string[]
  correctAnswer: number
}

function App() {
  const [showLetter, setShowLetter] = useState(false)
  const [letterText, setLetterText] = useState('')
  const [showSecret, setShowSecret] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const questions: Question[] = [
    {
      question: "¿Cuándo nos conocimos?",
      answers: ["5 de Noviembre", "7 de Noviembre", "8 de Noviembre"],
      correctAnswer: 1
    },
    {
      question: "¿Cuáles son tus flores favoritas?",
      answers: ["Rosas", "Tulipanes y Lirios", "Girasoles"],
      correctAnswer: 1
    },
    {
      question: "¿Cuál es tu serie favorita?",
      answers: ["Stranger Things", "Bridgerton", "Game of Thrones"],
      correctAnswer: 1
    },
    {
      question: "¿Cuál es tu color favorito?",
      answers: ["Morado", "Rosa", "Azul"],
      correctAnswer: 0
    },
    {
      question: "¿Cuál es tu número preferido?",
      answers: ["3", "2", "7"],
      correctAnswer: 2
    },
    {
      question: "¿Qué prefieres?",
      answers: ["Perro", "Gato", "Ballena"],
      correctAnswer: 2
    }
  ]

  useEffect(() => {
    fetch('/texto.txt')
      .then(response => response.text())
      .then(text => setLetterText(text))
      .catch(() => setLetterText('Error al cargar el texto'))
  }, [])

  useEffect(() => {
    if ((showQuestion || showMusicPlayer) && modalRef.current) {
      setTimeout(() => {
        modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [showQuestion, showMusicPlayer, currentQuestionIndex])

  const handleSecretClick = () => {
    setShowQuestion(true)
    setCurrentQuestionIndex(0)
  }

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer)
    const currentQuestion = questions[currentQuestionIndex]
    
    if (answer === currentQuestion.correctAnswer) {
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          // Siguiente pregunta
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setSelectedAnswer(null)
        } else {
          // Última pregunta correcta - mostrar mensaje final
          setShowFinalMessage(true)
        }
      }, 800)
    } else {
      // Respuesta incorrecta
      setTimeout(() => {
        setSelectedAnswer(null)
      }, 1500)
    }
  }

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
              {/* <div className="season-text">Temporada Social de 1813</div> */}
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
            <div 
              className="wax-seal" 
              onMouseEnter={() => setShowSecret(true)}
              onMouseLeave={() => !showQuestion && setShowSecret(false)}
              onClick={handleSecretClick}
              style={{ cursor: showSecret ? 'pointer' : 'default' }}
            >
              {showSecret && !showQuestion && (
                <div className="secret-hint">¿Un secreto?</div>
              )}
            </div>

            {showQuestion && !showFinalMessage && (
              <div className="question-modal" ref={modalRef}>
                <div className="question-content">
                  <div className="question-progress">
                    Pregunta {currentQuestionIndex + 1} de {questions.length}
                  </div>
                  <h3 className="question-title">
                    {currentQuestionIndex === 0 ? '' : '¡Sigamos!'}
                  </h3>
                  <p className="question-text">{questions[currentQuestionIndex].question}</p>
                  <div className="answers-container">
                    {questions[currentQuestionIndex].answers.map((answer, index) => (
                      <button 
                        key={index}
                        className={`answer-btn ${
                          selectedAnswer === index 
                            ? index === questions[currentQuestionIndex].correctAnswer 
                              ? 'correct' 
                              : 'wrong'
                            : ''
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                  {selectedAnswer !== null && selectedAnswer !== questions[currentQuestionIndex].correctAnswer && (
                    <p className="feedback wrong-feedback">Intenta de nuevo...</p>
                  )}
                  {selectedAnswer === questions[currentQuestionIndex].correctAnswer && (
                    <p className="feedback correct-feedback">¡Correcto! 💜</p>
                  )}
                </div>
              </div>
            )}

            {showFinalMessage && (
              <div className="question-modal" ref={modalRef}>
                <div className="question-content final-message">
                  <h3 className="question-title">¡Perfecto! 💜✨</h3>
                  <p className="secret-message">
                    Sabía que te conocía bien... Has desbloqueado algo muy especial:
                  </p>
                  <a 
                    href="https://drive.google.com/file/d/1zpfzwPZVqm5ARJr_teJA5yvamCdMeYUO/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="secret-link-emoji"
                  >
                    👀
                  </a>
                  <button 
                    className="close-modal-btn"
                    onClick={() => {
                      setShowQuestion(false)
                      setShowFinalMessage(false)
                      setSelectedAnswer(null)
                      setShowSecret(false)
                      setCurrentQuestionIndex(0)
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

            <div className="letter-text">
              {letterText.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <div className="music-section">
              <p className="music-intro">
                P.D. Hay una canción que me recuerda mucho a ti... Me gustaría que la escuches 🎵
              </p>
              <button 
                className="music-btn"
                onClick={() => setShowMusicPlayer(true)}
              >
                🎶 Escuchar la canción
              </button>
            </div>
          </div>

          {showMusicPlayer && (
            <div className="question-modal" ref={modalRef}>
              <div className="question-content music-player-modal">
                <h3 className="question-title">Esta Canción</h3>
                <p className="music-description">
                  Me receurda a ti...
                </p>
                
                <div className="audio-player">
                  <audio 
                    ref={audioRef}
                    controls 
                    className="audio-element"
                  >
                    <source src="/cancion.mp3" type="audio/mpeg" />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                </div>

                <div className="music-actions">
                  <a 
                    href="https://www.youtube.com/watch?v=PivfFlgUH4w&list=RDPivfFlgUH4w&start_radio=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="spotify-link"
                  >
                    <span className="spotify-icon">🎵</span>
                    Escuchar la original (creo que lo saca mejor jsjs) bueno me enforce por sacarla bien, es con cariño
                  </a>
                </div>

                <button 
                  className="close-modal-btn"
                  onClick={() => {
                    setShowMusicPlayer(false)
                    if (audioRef.current) {
                      audioRef.current.pause()
                      audioRef.current.currentTime = 0
                    }
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
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
