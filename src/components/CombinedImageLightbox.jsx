import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const CombinedImageLightbox = ({ imageUrl, divStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [autoZoomed, setAutoZoomed] = useState(false);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = imageUrl;
    preloadImage.onload = () => {
      setImageLoaded(true);
    };
  }, [imageUrl]);

  const openLightbox = () => {
    setIsOpen(true);

    // Trigger auto zoom after 2 seconds
    setTimeout(() => {
      setAutoZoomed(true);
    }, 500);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setAutoZoomed(false); // Reset auto zoom state
  };

  return (
    <div style={{zIndex: '1'}}>
      <div style={{ ...divStyle, cursor: 'pointer' }} onClick={openLightbox}></div>

      {isOpen && imageLoaded && (
        <Lightbox
          mainSrc={imageUrl}
          onCloseRequest={closeLightbox}
          reactModalProps={{ onAfterOpen: () => { if (autoZoomed) document.querySelector(".ril-zoom-in").click(); }}}
        />
      )}
    </div>
  );
};

export default CombinedImageLightbox;
