import { useState, useEffect } from 'react';
import ContactList from './ContactsList/ContactsList';
import {ContactForm} from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import css from "./App.module.css"

export default function App () {

  const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem('contacts')) ?? [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);

  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])
  
  const handleAddNewContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name}) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({id}) => id !== contactId));
  
  };
    return (
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 15,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddNewContact} />

      <h2 className={css.titleContacts}>Contacts</h2>
      <div className={css.allContacts}>All contacts: {contacts.length}</div>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
      </div>
    )
  }


