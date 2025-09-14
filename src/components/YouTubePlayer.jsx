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
      controls: 0,
      loop: 1,
      playlist: videoId,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  useEffect(() => {
    if (!player) return;

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

  const handleVideoClick = () => {
    if (player) {
      const playerState = player.getPlayerState();
      if (playerState === 1) {
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