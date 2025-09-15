import React, { useRef, useEffect, useState } from 'react';

export default function VideoPlayer({ src, className = "" }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(false);

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

  return (
    <div className={`relative w-full aspect-w-1 aspect-h-1 overflow-hidden ${className}`}> {/* Modificado aquí */}
      {error ? (
        <div className="absolute inset-0 bg-lol-blue-medium flex items-center justify-center text-lol-gold-light text-center p-4">
          <p>El video no se pudo cargar. Por favor, asegúrate de que el archivo `promo.mp4` esté en el directorio `public/`.</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          controls
          loop
          muted
          playsInline
          onError={() => setError(true)}
          className="w-full h-full object-cover"
        ></video>
      )}
    </div>
  );
}