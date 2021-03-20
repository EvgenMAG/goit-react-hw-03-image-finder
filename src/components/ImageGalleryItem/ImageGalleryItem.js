import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonClose from '../ButtonClose/ButtonClose';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, openModal, onDeletCard }) => {
  const { webformatURL, largeImageURL, tags } = image;
  const [focus, setFocus] = useState(false);
  console.log(focus);
  const handleGetElem = () => {
    openModal(largeImageURL, tags);
  };

  return (
    <li
      className={s.ImageGalleryItem}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItem__image}
        onClick={handleGetElem}
      />
      {focus && <ButtonClose onBtnClick={onDeletCard} id={image.id} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
