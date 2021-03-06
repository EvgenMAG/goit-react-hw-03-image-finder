import React, { Component } from 'react';
import s from './Form.module.css';
import { v4 as idv4 } from 'uuid';
import PropTypes from 'prop-types';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = evt => {
    const { name, value } = evt.currentTarget;
    return this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const id = idv4();
    const newContact = { id, name, number };

    this.props.onSubmit(newContact);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form__container}>
        <label htmlFor="" className={s.form__label}>
          {' '}
          Name
          <input
            type="text"
            name="name"
            className={s.form__input}
            placeholder="Kim Chen In"
            required
            value={this.state.name}
            onChange={this.handleInput}
          />
        </label>
        <br />
        <label htmlFor="" className={s.form__label}>
          {' '}
          Number
          <input
            type="tel"
            name="number"
            className={s.form__input}
            placeholder="38-067-504-13-09"
            required
            value={this.state.number}
            onChange={this.handleInput}
          />
        </label>
        <button type="submit" className={s.form__button}>
          Add contact
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
