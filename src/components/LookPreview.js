import React, { useEffect, useRef, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const LookPreview = ({ mediaItem, isMuted, isPaused, onMediaComplete }) => {
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const progressInterval = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setProgress(0);

    if (mediaItem.type === 'image' && !isPaused) {
      progressInterval.current = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 20;
          return newProgress;
        });
      }, 1000);

      timeoutRef.current = setTimeout(() => {
        if (onMediaComplete) {
          onMediaComplete();
        }
      }, 5000);
    } else if (mediaItem.type === 'video' && videoRef.current && !videoError) {
      videoRef.current.muted = isMuted;
      
      if (isPaused) {
        videoRef.current.pause();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      } else {
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Video playback error:", error);
            setVideoError(true);
          });
        }

        timeoutRef.current = setTimeout(() => {
          if (onMediaComplete) {
            onMediaComplete();
          }
        }, 5000);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mediaItem, isMuted, isPaused, videoError, onMediaComplete]);

  const handleVideoTimeUpdate = () => {
    if (videoRef.current && !videoError) {
      const currentTime = videoRef.current.currentTime;
      const calculatedProgress = (currentTime / 5) * 100;
      setProgress(Math.min(calculatedProgress, 100));
    }
  };

  const handleVideoError = () => {
    console.error("Video failed to load:", mediaItem.url);
    setVideoError(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {mediaItem.type === 'image' || videoError ? (
        <>
          <Box
            component="img"
            src={mediaItem.url}
            alt="Look preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {!videoError && (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                bgcolor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'white',
                },
              }}
            />
          )}
          {videoError && (
            <Typography 
              variant="caption" 
              sx={{ 
                position: 'absolute', 
                bottom: 10, 
                left: 10, 
                color: 'white', 
                bgcolor: 'rgba(0,0,0,0.5)',
                padding: '2px 6px',
                borderRadius: 1
              }}
            >
              Video unavailable
            </Typography>
          )}
        </>
      ) : (
        <>
          <Box
            component="video"
            ref={videoRef}
            src={mediaItem.url}
            autoPlay
            playsInline
            onTimeUpdate={handleVideoTimeUpdate}
            onError={handleVideoError}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              bgcolor: 'rgba(255,255,255,0.3)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'white',
              },
            }}
          />
        </>
      )}
    </Box>
  );
};

export default LookPreview; 