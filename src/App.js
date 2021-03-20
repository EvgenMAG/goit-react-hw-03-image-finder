import React, { Component } from 'react';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ ImageGallery/ ImageGallery';
import getImages from './api-service/Api-service';
import Button from './components/Button';

import Load from './components/Loader/Loader';

import s from './App.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalHits: null,
    perPage: 12,
    status: '',
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: previousSearch, page: previousPage } = prevState;
    const { query: currentSearch, page: currentPage } = this.state;

    if (previousSearch !== currentSearch || previousPage !== currentPage) {
      this.setState({ status: Status.PENDING });
      this.findImages(currentSearch, currentPage);
    }
  }

  findImages = (query, page) => {
    getImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          return Promise.reject(
            new Error(`Ops!Ops!Ops! We couldn't find ${query}`),
          );
        }
        const newImages = hits.map(image => {
          return {
            id: image.id,
            largeImageURL: image.largeImageURL,
            webformatURL: image.webformatURL,
            tags: image.tags,
          };
        });

        this.setState({
          images: [...this.state.images, ...newImages],
          totalHits,
          status: Status.RESOLVED,
        });
        if (this.page !== 1) {
          window.scrollTo({
            top:
              document.documentElement.scrollTop +
              document.documentElement.clientHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => {
        this.setState({
          images: [],
          error: error.message,
          status: Status.REJECTED,
        });
      });
  };

  onChangeImagesArray = id => {
    console.log(id);
    const newArray = this.state.images.filter(image => {
      return image.id !== id;
    });
    this.setState({ images: [...newArray] });
    console.log(newArray);
  };

  onSubmithandler = searchQuery => {
    this.setState(({ query }) => {
      if (query === searchQuery) return;
      return {
        query: searchQuery,
        page: 1,
        images: [],
      };
    });
  };

  incrementPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onBtnLoad = () => {
    this.incrementPage();
  };

  render() {
    const { images, totalHits, perPage, page, status, error } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmithandler} />
        {(status === 'resolved' || status === 'pending') && (
          <ImageGallery
            pictures={images}
            onDeletCard={this.onChangeImagesArray}
          />
        )}

        {status === 'resolved' && totalHits > page * perPage && (
          <Button onClickBtn={this.onBtnLoad} />
        )}

        {status === 'rejected' && <div className={s.Error}>{error}</div>}

        {status === 'pending' && (
          <div className={s.Loader}>
            {' '}
            <Load />
          </div>
        )}
      </div>
    );
  }
}

export default App;
