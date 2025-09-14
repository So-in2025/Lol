import React from 'react';
import { useEffect, useRef, useState } from 'react';

export default function YouTubePlayer({ videoId, shouldPlay }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);

  // --- Lógica Robusta de Carga y Control ---

  useEffect(() => {
    // 1. Función para crear el reproductor una vez que la API esté lista.
    const createPlayer = () => {
      // Nos aseguramos de no crear el reproductor múltiples veces
      if (playerRef.current && !window.ytPlayer) {
        window.ytPlayer = new window.YT.Player(playerRef.current.id, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0, // Cero controles visibles
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            playsinline: 1, // Esencial para autoplay en móviles
            rel: 0,
          },
          events: {
            onReady: (event) => setPlayer(event.target),
          },
        });
      }
    };

    // 2. Carga el script de la API de YouTube de forma segura.
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }
  }, [videoId]);

  // 3. Observer para detectar si el video está en pantalla
  useEffect(() => {
    if (!player) return; // Solo se activa si el reproductor ya fue creado

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (shouldPlay && entry.isIntersecting) {
          // Si está en pantalla y tenemos permiso, reproducir con sonido
          player.unMute();
          player.playVideo();
        } else {
          // Si no está en pantalla, pausar
          player.pauseVideo();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(playerRef.current);

    return () => {
      if (playerRef.current) {
        observer.unobserve(playerRef.current);
      }
    };
  }, [player, shouldPlay]); // Se reactiva si el player o el permiso cambian

  // 4. Maneja el clic en el video para pausar o reanudar
  const handleVideoClick = () => {
    if (player) {
      const playerState = player.getPlayerState();
      if (playerState === window.YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  return (
    // El div principal es ahora el botón invisible de play/pausa
    <div 
      onClick={handleVideoClick} 
      className="relative aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden cursor-pointer"
    >
      <div id={`Youtubeer-${videoId}`} ref={playerRef} className="w-full h-full" />
    </div>
  );
}