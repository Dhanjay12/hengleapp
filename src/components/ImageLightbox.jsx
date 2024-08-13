import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageLightbox = ({ isOpen, imageUrl, onClose }) => {
  const [autoZoomed, setAutoZoomed] = useState('in'); // 'in' for zooming in, 'out' for zooming out

  useEffect(() => {
    let zoomInTimer;
    let zoomOutTimer;

    if (isOpen) {
      zoomInTimer = setTimeout(() => {
        setAutoZoomed('in');
      }, 500); // Change the delay to your desired value (in milliseconds)

      zoomOutTimer = setTimeout(() => {
        setAutoZoomed('out');
      }, 600); // Change the delay for zooming out
    }

    return () => {
      clearTimeout(zoomInTimer);
      clearTimeout(zoomOutTimer);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <Lightbox
        mainSrc={imageUrl}
        onCloseRequest={onClose}
        reactModalProps={{
          onAfterOpen: () => {
            if (autoZoomed === 'in') {
              const zoomInButton = document.querySelector('.ril-zoom-in');
              if (zoomInButton) {
                zoomInButton.click();
              }
            } else if (autoZoomed === 'out') {
              const zoomOutButton = document.querySelector('.ril-zoom-out');
              if (zoomOutButton) {
                zoomOutButton.click();
              }
            }
          }
        }}
      />
    )
  );
};

export default ImageLightbox;
