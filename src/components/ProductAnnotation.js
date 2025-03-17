import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Info, Close } from '@mui/icons-material';

const ProductAnnotation = ({ annotations, products, onLegendToggle }) => {
  const [showLegend, setShowLegend] = useState(false);
  const [highlightedProductId, setHighlightedProductId] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const productRefs = useRef({});

  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const handleAnnotationClick = (productId) => {
    setHighlightedProductId(productId);
    
    if (!showLegend) {
      toggleLegend(true);
    }
    
    setTimeout(() => {
      if (productRefs.current[productId]) {
        productRefs.current[productId].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }, 100);
  };

  useEffect(() => {
    if (highlightedProductId && showLegend && productRefs.current[highlightedProductId]) {
      productRefs.current[highlightedProductId].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [highlightedProductId, showLegend]);

  const toggleLegend = (value) => {
    const newState = typeof value === 'boolean' ? value : !showLegend;
    setShowLegend(newState);
    if (onLegendToggle) {
      onLegendToggle(newState);
    }
  };

  return (
    <>
      {annotations.map((annotation) => {
        const product = getProductById(annotation.productId);
        if (!product) return null;

        return (
          <Tooltip
            key={annotation.id}
            title={
              <Box>
                <Typography variant="subtitle2">{product.name}</Typography>
                <Typography variant="body2">${product.price}</Typography>
              </Box>
            }
          >
            <Box
              sx={{
                position: 'absolute',
                left: `${annotation.x}%`,
                top: `${annotation.y}%`,
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: 'white',
                border: '2px solid #000',
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)',
                '&:hover': {
                  transform: 'translate(-50%, -50%) scale(1.2)',
                },
              }}
              onClick={() => handleAnnotationClick(product.id)}
            />
          </Tooltip>
        );
      })}

      <IconButton
        onClick={() => toggleLegend()}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.5)',
          zIndex: 2,
        }}
      >
        <Info />
      </IconButton>

      {showLegend && (
        <Paper
          sx={{
            position: 'absolute',
            bottom: isMobile ? 80 : 20,
            left: 20,
            right: 20,
            p: 2,
            bgcolor: 'rgba(0,0,0,0.8)',
            color: 'white',
            maxHeight: isMobile ? '20vh' : '30vh',
            zIndex: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">
              Products in this Look
            </Typography>
            <IconButton onClick={() => toggleLegend(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex',
              overflowX: 'auto',
              gap: 2,
              pb: 1,
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255,255,255,0.1)',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '4px',
              },
            }}
          >
            {annotations.map((annotation) => {
              const product = getProductById(annotation.productId);
              if (!product) return null;

              return (
                <Box
                  key={annotation.id}
                  ref={el => productRefs.current[product.id] = el}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '180px',
                    maxWidth: '200px',
                    flex: '0 0 auto',
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    bgcolor: highlightedProductId === product.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  onClick={() => window.open(product.productUrl, '_blank')}
                >
                  <Box
                    component="img"
                    src={product.imageUrl}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  />
                  <Typography variant="subtitle2" noWrap>{product.name}</Typography>
                  <Typography variant="body2" mb={1}>${product.price}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(product.productUrl, '_blank');
                    }}
                  >
                    Shop
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ProductAnnotation;