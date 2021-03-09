import React, { Component } from 'react';

import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';

class ImageGallery extends Component {
  state = {
    showModal: false,
    bigImg: '',
    bigAlt: '',
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
    const { bigImg, bigAlt, showModal } = this.state;
    const { pictures } = this.props;
    return (
      <>
        <ul className={s.gallery}>
          {pictures.map(picture => {
            return (
              <ImageGalleryItem
                key={picture.id}
                image={picture}
                openModal={this.onImageClick}
              />
            );
          })}
        </ul>
        {showModal && (
          <Modal onClose={this.togleModal}>
            {<img src={bigImg} alt={bigAlt} />}
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
