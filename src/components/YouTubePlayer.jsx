import React from 'react';
import { useEffect, useRef, useState } from 'react';

// Este es el componente final que maneja toda la lógica del video.
export default function YouTubePlayer({ videoId, shouldPlay }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isInView, setIsInView] = useState(false);

  // Carga la API de YouTube y crea el reproductor
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = createPlayer;
      } else {
        createPlayer();
      }
    };

    const createPlayer = () => {
      if (playerRef.current && !player) {
        const ytPlayer = new window.YT.Player(playerRef.current.id, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event) => setPlayer(event.target),
          },
        });
      }
    };

    loadYouTubeAPI();
  }, [videoId, player]);

  // Observer para detectar si el video está en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (playerRef.current) {
      observer.observe(playerRef.current);
    }

    return () => {
      if (playerRef.current) {
        observer.unobserve(playerRef.current);
      }
    };
  }, []);

  // Efecto principal que controla la reproducción
  useEffect(() => {
    if (player && shouldPlay) {
      if (isInView) {
        player.unMute();
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }, [player, isInView, shouldPlay]);

  // Maneja el clic en el video para pausar o reanudar
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
    <div onClick={handleVideoClick} className="relative aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden cursor-pointer">
      <div id={`Youtubeer-${videoId}`} ref={playerRef} className="w-full h-full" />
    </div>
  );
}