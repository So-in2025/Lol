import React, { useRef, useEffect, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function VideoPlayer({ src, className = "" }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(e => {
                console.error("Error playing video:", e);
                setError(true);
              });
            } else {
              videoRef.current.pause();
            }
          });
        },
        {
          threshold: 0.5, // El video se reproduce cuando el 50% es visible
        }
      );

      observer.observe(videoRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [src]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative w-full aspect-w-16 aspect-h-9 overflow-hidden ${className}`}>
      {error ? (
        <div className="absolute inset-0 bg-lol-blue-medium flex items-center justify-center text-lol-gold-light text-center p-4">
          <p>El video no se pudo cargar. Por favor, asegúrate de que el archivo `promo.mp4` esté en el directorio `public/`.</p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            controls
            loop
            muted={isMuted}
            playsInline
            onError={() => setError(true)}
            className="w-full h-full object-cover"
          ></video>
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 p-2 bg-lol-blue-medium/70 rounded-full text-lol-gold-light hover:bg-lol-blue-medium transition-colors"
          >
            {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
          </button>
        </>
      )}
    </div>
  );
}