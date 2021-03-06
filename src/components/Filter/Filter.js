import React from 'react';
import s from './Filter.module.css';
import ProtoTypes from 'prop-types';

const Filter = ({ search, onChangeInput }) => {
  return (
    <div className={s.filter__container}>
      <h3 className={s.filter__title}>Find contact by name</h3>
      <input
        className={s.filter__input}
        type="text"
        value={search}
        onChange={onChangeInput}
      />
    </div>
  );
};

Filter.protoTypes = {
  search: ProtoTypes.string.isRequired,
  onChangeInput: ProtoTypes.func.isRequired,
};

export default Filter;
