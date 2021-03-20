import React, { Component } from 'react';

import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';

class ImageGallery extends Component {
  state = {
    showModal: false,
    bigImg: '',
    bigAlt: '',
    focusItem: false,
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      bigImg: '',
      bigAlt: '',
    }));
  };

  onImageClick = (src, alt) => {
    this.togleModal();
    this.setState({ bigImg: src, bigAlt: alt });
  };

  render() {
    const { bigImg, bigAlt, showModal, focusItem } = this.state;
    const { pictures, onDeletCard } = this.props;
    // console.log(onDeletCard);
    return (
      <>
        <ul className={s.gallery}>
          {pictures.map(picture => {
            return (
              <ImageGalleryItem
                key={picture.id}
                image={picture}
                focus={focusItem}
                onDeletCard={onDeletCard}
                openModal={this.onImageClick}
              />
            );
          })}
        </ul>
        {showModal && (
          <Modal onClose={this.togleModal}>
            {bigImg && <img src={bigImg} alt={bigAlt} />}
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
