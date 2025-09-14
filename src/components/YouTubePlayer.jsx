import React, { useEffect, useRef, useState } from 'react';
import { FaPlayCircle, FaVolumeUp } from 'react-icons/fa';

export default function YouTubePlayer({ videoId }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);

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
                mute: 1,
                controls: 0,
                loop: 1,
                playlist: videoId,
                showinfo: 0,
                modestbranding: 1,
            },
            events: {
                onReady: (event) => setPlayer(event.target),
            }
        });
    }
  };

  const observerRef = useRef(null);
  useEffect(() => {
    if (player && playerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            player.playVideo();
          } else {
            player.pauseVideo();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(playerRef.current);
      observerRef.current = observer;
    }
    return () => observerRef.current?.disconnect();
  }, [player]);

  const handlePlayWithSound = () => {
    if (!player) return;
    player.unMute();
    setShowOverlay(false);
  };

  return (
    <div className="relative aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden">
      <div id={`Youtubeer-${videoId}`} ref={playerRef} className="w-full h-full" />
      
      {showOverlay && (
        <div 
          onClick={handlePlayWithSound}
          className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 cursor-pointer group transition-all duration-300"
        >
          <FaPlayCircle className="text-white text-7xl mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          <span className="font-display text-2xl text-white font-bold tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
            ACTIVAR SONIDO
          </span>
        </div>
      )}
    </div>
  );
}