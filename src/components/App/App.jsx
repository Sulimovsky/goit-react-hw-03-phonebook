import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const LS_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(pP, pS) {
    const { contacts } = this.state;
    if (pS.contacts !== this.state.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  filterContact = value => {
    this.setState({
      filter: value,
    });
  };

  addContact = contact => {
    const find = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (find) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div style={{ padding: '0 10px' }}>
        <h2>Phonebook</h2>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onFilterContact={this.filterContact} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
