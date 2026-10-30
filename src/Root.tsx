import React from 'react';
import { Composition } from 'remotion';
import { LyricVideo } from './LyricVideo';
import './style.css';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="LyricVideo"
        component={LyricVideo}
        durationInFrames={7095} // ~3m 56s @ 30 FPS
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

