import React, { useState } from 'react';
import { Box, IconButton, useTheme, useMediaQuery, Typography, Button, Badge, Fade } from '@mui/material';
import { ChevronLeft, ChevronRight, VolumeUp, VolumeOff, Favorite, BookmarkBorder, Bookmark, Close } from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import LookPreview from './LookPreview';
import ProductAnnotation from './ProductAnnotation';

const Lookbook = ({ looks }) => {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [likedLooks, setLikedLooks] = useState({});
  const [savedLooks, setSavedLooks] = useState({});
  const [showProducts, setShowProducts] = useState(false);
  const [isLegendVisible, setIsLegendVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextMedia(),
    onSwipedRight: () => handlePrevMedia(),
    onSwipedUp: () => handleNextLook(),
    onSwipedDown: () => handlePrevLook(),
    trackMouse: true,
  });

  const handleMediaComplete = () => {
    if (!isPaused) {
      handleNextMedia();
    }
  };

  const handleNextMedia = () => {
    const currentLook = looks[currentLookIndex];
    if (currentMediaIndex < currentLook.mediaItems.length - 1) {
      setCurrentMediaIndex(prev => prev + 1);
    } else {
      handleNextLook();
    }
  };

  const handlePrevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(prev => prev - 1);
    } else {
      if (currentLookIndex > 0) {
        setCurrentLookIndex(prev => prev - 1);
        setCurrentMediaIndex(looks[currentLookIndex - 1].mediaItems.length - 1);
      }
    }
  };

  const handleNextLook = () => {
    if (currentLookIndex < looks.length - 1) {
      setCurrentLookIndex(prev => prev + 1);
      setCurrentMediaIndex(0);
      setShowProducts(false);
    }
  };

  const handlePrevLook = () => {
    if (currentLookIndex > 0) {
      setCurrentLookIndex(prev => prev - 1);
      setCurrentMediaIndex(0);
      setShowProducts(false);
    }
  };

  const toggleLike = () => {
    const lookId = currentLook.id;
    setLikedLooks(prev => ({
      ...prev,
      [lookId]: !prev[lookId]
    }));
  };

  const toggleSave = () => {
    const lookId = currentLook.id;
    setSavedLooks(prev => ({
      ...prev,
      [lookId]: !prev[lookId]
    }));
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const toggleProductsPanel = () => {
    setShowProducts(prev => !prev);
  };

  const handleLegendToggle = (isVisible) => {
    setIsLegendVisible(isVisible);
  };

  const currentLook = looks && looks.length > 0 ? looks[currentLookIndex] : null;
  const currentMedia = currentLook && currentLook.mediaItems && currentLook.mediaItems.length > 0 
    ? currentLook.mediaItems[currentMediaIndex] 
    : null;
  const isLiked = likedLooks[currentLook?.id] || false;
  const isSaved = savedLooks[currentLook?.id] || false;

  const progressIndicators = currentLook && currentLook.mediaItems 
    ? currentLook.mediaItems.map((_, index) => ({
        isActive: index === currentMediaIndex,
        id: index
      }))
    : [];

  if (!looks || looks.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'black',
          color: 'white',
        }}
      >
        <Typography variant="h5">No looks available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'black',
      }}
      {...handlers}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          zIndex: 2,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Typography variant="h6" sx={{ color: 'white' }}>{currentLook?.title}</Typography>
        <IconButton 
          onClick={() => setIsMuted(!isMuted)}
          sx={{ color: 'white' }}
        >
          {isMuted ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          p: 1,
          zIndex: 2,
        }}
      >
        {progressIndicators.map((indicator) => (
          <Box
            key={indicator.id}
            sx={{
              height: 4,
              width: `${100 / progressIndicators.length}%`,
              maxWidth: 50,
              bgcolor: indicator.isActive ? 'white' : 'rgba(255,255,255,0.5)',
              borderRadius: 2,
            }}
          />
        ))}
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLookIndex}-${currentMediaIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', height: '100%' }}
          onClick={togglePause}
        >
          <LookPreview
            mediaItem={currentMedia}
            isMuted={isMuted}
            isPaused={isPaused}
            onMuteToggle={() => setIsMuted(!isMuted)}
            onMediaComplete={handleMediaComplete}
          />
          
          {currentMedia && currentMedia.annotations && (
            <ProductAnnotation
              annotations={currentMedia.annotations}
              products={currentLook.products}
              onLegendToggle={handleLegendToggle}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {!isLegendVisible && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={handlePrevMedia}
            sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
            disabled={currentMediaIndex === 0 && currentLookIndex === 0}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNextMedia}
            sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
            disabled={!currentLook || !currentLook.mediaItems || (currentMediaIndex === currentLook.mediaItems.length - 1 && currentLookIndex === looks.length - 1)}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      )}

      {!isLegendVisible && (
        <Box
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={handlePrevLook}
            sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
            disabled={currentLookIndex === 0}
          >
            <ChevronRight sx={{ transform: 'rotate(90deg)' }} />
          </IconButton>
          <IconButton
            onClick={handleNextLook}
            sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
            disabled={currentLookIndex === looks.length - 1}
          >
            <ChevronLeft sx={{ transform: 'rotate(90deg)' }} />
          </IconButton>
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          right: 20,
          bottom: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={toggleLike}
          sx={{ 
            color: isLiked ? 'red' : 'white', 
            bgcolor: 'rgba(0,0,0,0.5)' 
          }}
        >
          <Badge badgeContent={isLiked ? currentLook.likes + 1 : currentLook.likes} color="error">
            <Favorite />
          </Badge>
        </IconButton>
        <IconButton
          onClick={toggleSave}
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(0,0,0,0.5)' 
          }}
        >
          {isSaved ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </Box>

      {!isLegendVisible && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            p: 2,
            zIndex: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={toggleProductsPanel}
            sx={{
              borderRadius: 4,
              px: 4,
            }}
          >
            {showProducts ? 'Hide Products' : 'View Products'}
          </Button>
        </Box>
      )}

      <Fade in={showProducts}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50vh',
            bgcolor: 'rgba(0,0,0,0.9)',
            zIndex: 3,
            p: 2,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: 'white' }}>
              Products in this Look
            </Typography>
            <IconButton onClick={toggleProductsPanel} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {currentLook.products.map((product) => (
              <Box
                key={product.id}
                sx={{
                  width: isMobile ? '45%' : '30%',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => window.open(product.productUrl, '_blank')}
              >
                <Box
                  component="img"
                  src={product.imageUrl}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: 'white' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Shop Now
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default Lookbook; 