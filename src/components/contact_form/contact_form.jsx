import css from './contact_form.module.css';
import { nanoid } from 'nanoid';
import { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onChange = e => {
    const { name, value } = e.target;

    let pattern;
    if (name === 'name') {
      pattern = new RegExp(
        "^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ]?[a-zA-Zа-яА-Я]*)*$"
      );
    } else if (name === 'number') {
      pattern =
        '\\+?\\d{1,4}?([-\\.\\s]?\\(?\\d{1,3}\\)?[-\\.\\s]?\\d{1,4}[-\\.\\s]?\\d{1,4}[-\\.\\s]?\\d{1,9})?';
    }

    if (!value || !pattern || value.match(pattern)) {
      this.setState({
        [name]: value,
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: nanoid(),
      name: name.trim(),
      number: number,
    };
    this.props.fillContacts(contact);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.onSubmit}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.onChange}
          />
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.onChange}
          />
        </label>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
