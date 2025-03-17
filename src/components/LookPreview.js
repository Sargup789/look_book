import React, { useEffect, useRef, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const LookPreview = ({ mediaItem, isMuted, isPaused, onMediaComplete }) => {
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const progressInterval = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear any existing timers when component updates
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset progress
    setProgress(0);

    if (mediaItem.type === 'image' && !isPaused) {
      // For images, set a 5-second timer and update progress
      progressInterval.current = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 20; // 5 seconds total (100/5 = 20 per second)
          return newProgress;
        });
      }, 1000);

      // After 5 seconds, trigger the next media
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
        // For videos, play for 5 seconds then move to next
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Video playback error:", error);
            setVideoError(true);
          });
        }

        // Set timeout to move to next media after 5 seconds
        timeoutRef.current = setTimeout(() => {
          if (onMediaComplete) {
            onMediaComplete();
          }
        }, 5000);
      }
    }

    return () => {
      // Clean up timers when component unmounts or updates
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
      // Calculate progress based on 5 seconds max duration
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