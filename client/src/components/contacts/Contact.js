import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import ContactItem from './ContactItem'
import ContactFilter from './ContactFilter'
import ContactForm from './ContactForm'
import { getContacts } from '../../actions/contact'


const Contact = () => {
  const contact = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  const { contacts, loading, filter } = contact;

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch])

  return (
    <Fragment>
      <div className="grid-2">
        <div>
          <ContactForm />
        </div>

        <div>
          <ContactFilter />

          <Fragment>
            {loading ? "oops" : (
              filter ?
                (<Fragment>
                  {filter.map(contact => (
                    <ContactItem key={contact._id} contact={contact} />
                  ))}
                </Fragment>) :
                (
                  <Fragment>
                    {contacts.map(contact => (
                      <ContactItem key={contact._id} contact={contact} />
                    ))}
                  </Fragment>
                )
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}


export default Contact
