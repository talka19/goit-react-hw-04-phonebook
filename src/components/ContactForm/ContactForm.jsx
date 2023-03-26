import {useState} from "react";
import css from "./ContactForm.module.css"
import shortid from 'shortid';

export function ContactForm ({onSubmit}) {
   const [name, setName] = useState('');
   const [number, setNumber] = useState('');
  
    const handleChange = e => {
        const {name, value} = e.currentTarget;

       switch (name) {
        case 'name':
            setName(value); 
            break;
        case 'number':
            setNumber(value);
            break; 
        default:
            return;
       }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const newContact = {
                id: shortid.generate(),
                name: name,
                number: number,
              };
        onSubmit(newContact);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setNumber('');
    };

        return (
            <form className={css.form} onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                      className={css.inputName}
                      value={name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                      required
                    />
                </label>
                <label>
                    Number
                    <input
                      className={css.inputNumber}
                      value={number}
                      onChange={handleChange}
                      type="tel"
                      name="number"
                      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                      required
                    />
                </label>
                <button type="submit" className={css.buttonEditor}>
                    Add contact
                </button>
            </form>
        )
    }