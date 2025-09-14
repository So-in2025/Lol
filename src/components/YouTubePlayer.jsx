import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function YouTubePlayer({ videoId, shouldPlay }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false); // Nuevo estado para los controles

  useEffect(() => {
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
          controls: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => setPlayer(event.target),
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            else setIsPlaying(false);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!player || !shouldPlay) return; // Solo se activa si la página principal lo permite
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          player.playVideo();
          player.unMute(); // El intento de activar sonido ahora tiene permiso
        } else {
          player.pauseVideo();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(playerRef.current);
    return () => observer.disconnect();
  }, [player, shouldPlay]);

  const togglePlayPause = () => {
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  };
  
  const handleVideoClick = () => {
      setShowControls(prev => !prev); // Muestra u oculta los controles al hacer clic
  }

  return (
    <div onClick={handleVideoClick} className="relative aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden cursor-pointer">
      <div id={`Youtubeer-${videoId}`} ref={playerRef} className="w-full h-full" />
      
      {/* Interfaz personalizada que aparece/desaparece al hacer clic */}
      <div 
        className={`absolute inset-0 bg-black flex justify-center items-center transition-opacity duration-300 ${showControls ? 'bg-opacity-40' : 'bg-opacity-0'}`}
      >
        {showControls && (
            <button 
                onClick={togglePlayPause}
                className="text-white text-6xl"
                aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
            >
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
        )}
      </div>
    </div>
  );
}