import React from 'react';
import s from './ContactList.module.css';
import ProtoTypes from 'prop-types';

const ContactList = ({ searchedName, cleanContactList }) => {
  return (
    <ul className={s.contact__list}>
      {searchedName.map(({ id, name, number }) => {
        return (
          <li key={id} className={s.contact__item}>
            <span className={s.contact__text}>{name}: </span>
            <span className={s.contact__text}>{number}</span>
            <button
              className={s.contact__button}
              onClick={() => cleanContactList(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.protoTypes = {
  searchedName: ProtoTypes.shape({
    id: ProtoTypes.string.isRequired,
    name: ProtoTypes.string.isRequired,
    number: ProtoTypes.number.isRequired,
  }),
  cleanContactList: ProtoTypes.func.isRequired,
};

export default ContactList;
