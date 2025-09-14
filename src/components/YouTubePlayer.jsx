import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function YouTubePlayer({ videoId }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Carga la API de YouTube si no está presente
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }
  }, []);

  const createPlayer = () => {
    if (window.YT && playerRef.current) {
        const ytPlayer = new window.YT.Player(playerRef.current.id, {
            videoId: videoId,
            playerVars: {
                autoplay: 0,
                controls: 0, // Ocultamos todos los controles de YouTube
                loop: 1,
                playlist: videoId,
                modestbranding: 1,
            },
            events: {
                onReady: (event) => setPlayer(event.target),
                onStateChange: (event) => {
                    // Sincronizamos nuestro estado con el del reproductor
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        setIsPlaying(true);
                    } else if (event.data === window.YT.PlayerState.PAUSED) {
                        setIsPlaying(false);
                    }
                }
            }
        });
    }
  };

  // Lógica de scroll para play/pause
  useEffect(() => {
    if (!player) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          player.playVideo();
          player.unMute(); // Intentamos activar el sonido
        } else {
          player.pauseVideo();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(playerRef.current);
    return () => observer.disconnect();
  }, [player]);

  // Función para el botón personalizado
  const togglePlayPause = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
      player.unMute(); // Se asegura de que tenga sonido si el usuario le da play
    }
  };

  return (
    <div className="relative aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden group">
      <div id={`Youtubeer-${videoId}`} ref={playerRef} className="w-full h-full" />
      
      {/* Interfaz personalizada de Play/Pausa */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex justify-center items-center">
        <button 
          onClick={togglePlayPause}
          className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
          aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
}