import React, { useState, useEffect } from 'react';
import './SetiembreSeminarioPage.css';

const SetiembreSeminarioPage: React.FC = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  
  const fullTitle = "Seminario de Biodescodificación";
  const fullSubtitle = "Ansiedad y Depresión";

  useEffect(() => {
    // Efecto de escritura a lápiz para el título
    const titleTimer = setTimeout(() => {
      setTitleVisible(true);
    }, 800);

    // Efecto de escritura a lápiz para el subtítulo después del título
    const subtitleTimer = setTimeout(() => {
      setSubtitleVisible(true);
    }, 2000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
    };
  }, []);

  const handleBuyTicket = () => {
    // Aquí puedes integrar con tu sistema de pagos o redirigir a WhatsApp
    const message = encodeURIComponent("Hola! Me interesa comprar una entrada para el Seminario de Biodescodificación - Ansiedad y Depresión del 20 de Setiembre 2025 en el Hotel Radisson Montevideo. ¿Podrías darme más información sobre precios y disponibilidad?");
    const whatsappUrl = `https://wa.me/59896611764?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="seminar-page">
      <div className="seminar-hero">
        <div className="corner-notification">
          <div className="notification-content">
            <span className="notification-text">Consigue tu entrada</span>
            <div className="corner-ping-indicator">
              <span className="corner-ping-ring corner-ping-ring-1"></span>
              <span className="corner-ping-ring corner-ping-ring-2"></span>
              <span className="corner-ping-center"></span>
            </div>
          </div>
        </div>
        <div className="hero-content">
          <h1 className={`seminar-title ${titleVisible ? 'title-visible' : ''}`}>
            {fullTitle}
          </h1>
          <h2 className={`seminar-subtitle ${subtitleVisible ? 'subtitle-visible' : ''}`}>
            {fullSubtitle}
          </h2>
          <p className="seminar-date">
            20 de Setiembre 2025
          </p>
          <div className="seminar-location">
            <svg className="location-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Hotel Radisson Montevideo</span>
          </div>
        </div>
      </div>

      <div className="seminar-content">
        <div className="container">
          <div className="seminar-info">
            <div className="info-section">
              <h3>¿Qué es la Biodescodificación?</h3>
              <p>
                La Biodescodificación es una metodología que nos permite entender 
                el origen emocional de las enfermedades y síntomas físicos. A través 
                de técnicas específicas, podemos identificar y transformar los 
                conflictos emocionales que se manifiestan en nuestro cuerpo.
              </p>
            </div>

            <div className="info-section">
              <h3>Temática del Seminario</h3>
              <div className="topics">
                <div className="topic-item">
                  <h4>Ansiedad</h4>
                  <p>Descubre las causas emocionales de la ansiedad y aprende técnicas para gestionarla desde la raíz.</p>
                </div>
                <div className="topic-item">
                  <h4>Depresión</h4>
                  <p>Explora el origen emocional de la depresión y encuentra herramientas para transformar estos estados.</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>¿Qué aprenderás?</h3>
              <ul className="learning-list">
                <li>Identificar los conflictos emocionales detrás de la ansiedad y depresión</li>
                <li>Técnicas de liberación emocional</li>
                <li>Herramientas para el autoconocimiento</li>
                <li>Protocolos de Biodescodificación aplicados</li>
                <li>Ejercicios prácticos de transformación</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Información del Evento</h3>
              <div className="event-details">
                <div className="detail-item">
                  <strong>Fecha:</strong> 20 de Setiembre 2025
                </div>
                <div className="detail-item">
                  <strong>Lugar:</strong> Hotel Radisson Montevideo
                </div>
                <div className="detail-item">
                  <strong>Modalidad:</strong> Presencial
                </div>
                <div className="detail-item">
                  <strong>Duración:</strong> Día completo
                </div>
              </div>
            </div>

            <div className="cta-section">
              <h3>¡Reserva tu lugar!</h3>
              <p>
                Cupos limitados. Asegura tu participación en este seminario 
                transformador de Biodescodificación.
              </p>
              <button 
                className="buy-ticket-btn"
                onClick={handleBuyTicket}
              >
                <svg className="ticket-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                Comprar Entrada
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetiembreSeminarioPage;
