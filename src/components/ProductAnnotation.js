import React, { useState } from 'react';
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
import { Info } from '@mui/icons-material';

const ProductAnnotation = ({ annotations, products }) => {
  const [showLegend, setShowLegend] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  return (
    <>
      {/* Product Dots */}
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
              onClick={() => window.open(product.productUrl, '_blank')}
            />
          </Tooltip>
        );
      })}

      {/* Legend Toggle Button */}
      <IconButton
        onClick={() => setShowLegend(!showLegend)}
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

      {/* Product Legend */}
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
            maxHeight: isMobile ? '30vh' : '40vh',
            overflowY: 'auto',
            zIndex: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Products in this Look
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {annotations.map((annotation) => {
              const product = getProductById(annotation.productId);
              if (!product) return null;

              return (
                <Box
                  key={annotation.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
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
                      width: 40,
                      height: 40,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle2">{product.name}</Typography>
                    <Typography variant="body2">${product.price}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => window.open(product.productUrl, '_blank')}
                    >
                      Shop
                    </Button>
                  </Box>
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