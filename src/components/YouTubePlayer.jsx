import React from 'react';
import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

export default function YouTubePlayer({ videoId, shouldPlay }) {
  const [player, setPlayer] = useState(null);
  const containerRef = useRef(null);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0, // Cero controles visibles
      loop: 1,
      playlist: videoId, // Para que el loop funcione
      modestbranding: 1,
      playsinline: 1,
      rel: 0, // No mostrar videos relacionados al final
    },
  };

  const onReady = (event) => {
    // La librería nos entrega el reproductor listo para usar
    setPlayer(event.target);
  };

  // Observer para detectar si el video está en pantalla
  useEffect(() => {
    if (!player) return; // Espera a que el player esté listo

    const observer = new IntersectionObserver(
      (entries) => {
        if (shouldPlay && entries[0].isIntersecting) {
          player.unMute();
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [player, shouldPlay]);

  // Maneja el clic en el video para pausar o reanudar
  const handleVideoClick = () => {
    if (player) {
      const playerState = player.getPlayerState();
      if (playerState === 1) { // 1 es el código de YouTube para "PLAYING"
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleVideoClick}
      className="relative aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden cursor-pointer w-full h-full"
    >
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}