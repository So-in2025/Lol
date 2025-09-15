import React, { useRef, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

export default function VideoPlayer({ videoId, onReady, isMuted }) {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      mute: isMuted ? 1 : 0,
    },
  };

  return (
    <div className="relative pt-[56.25%] w-full">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full rounded-3xl"
      />
    </div>
  );
}