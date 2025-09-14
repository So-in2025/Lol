import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

export default function YouTubePlayer({ videoId }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // Carga la API de YouTube una sola vez
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = () => {
        loadPlayer();
      };
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      // Si ya está cargada, intenta crear el player
      if (!player) {
          loadPlayer();
      }
    }
  }, []);
  
  const loadPlayer = () => {
    if (window.YT && playerRef.current) {
        const ytPlayer = new window.YT.Player(playerRef.current.id, {
            videoId: videoId,
            playerVars: {
                autoplay: 0, // Lo controlaremos con el observer
                mute: 1,
                controls: 0,
                loop: 1,
                playlist: videoId, // Necesario para que el loop funcione
                showinfo: 0,
                modestbranding: 1,
            },
            events: {
                onReady: (event) => {
                    setPlayer(event.target);
                }
            }
        });
    }
  }

  // Configura el Intersection Observer para autoplay
  const observerRef = useRef(null);
  useEffect(() => {
    if (player && playerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          // Si el video es visible, dale play. Si no, pausalo.
          if (entries[0].isIntersecting) {
            player.playVideo();
          } else {
            player.pauseVideo();
          }
        },
        { threshold: 0.5 } // Se activa/desactiva cuando el 50% del video es visible
      );

      observer.observe(playerRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [player]);

  // Función para manejar el sonido
  const toggleMute = () => {
    if (!player) return;
    if (player.isMuted()) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  return (
    <div className="relative aspect-w-16 aspect-h-9">
      <div id={`Youtubeer-${videoId}`} ref={playerRef} className="w-full h-full" />
      <button 
        onClick={toggleMute}
        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all z-10"
        aria-label="Activar/Desactivar sonido"
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>
    </div>
  );
}