import React, { Component } from 'react';

import s from './App.module.css';

import Filter from './components/Filter';
import Form from './components/Form';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onSubmitHandler = data => {
    const { contacts } = this.state;
    const newName = data.name.toLowerCase();
    const newPhone = data.number;
    if (contacts.find(el => el.name.toLowerCase() === newName)) {
      return alert(`${newName} is already in contacts`);
    }

    if (contacts.find(el => el.number.toLowerCase() === newPhone)) {
      return alert(`${newPhone} is already in contacts`);
    }
    const newContact = contacts.concat(data);

    this.setState(prevState => {
      return { ...prevState, contacts: newContact };
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('fuck');
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const foundName = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

    return (
      <div className={s.blocks}>
        <h1 className={s.title}>Phonebook</h1>
        <Form onSubmit={this.onSubmitHandler} />
        <h2 className={s.title__contacts}>Contacts</h2>
        <Filter search={this.state.filter} onChangeInput={this.changeFilter} />
        <ContactList
          searchedName={foundName}
          cleanContactList={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
