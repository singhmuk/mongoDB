import React, { Fragment, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterContact, clearFilter } from '../../actions/contact'

const ContactFilter = () => {
  const text = useRef('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterContact());
    dispatch(clearFilter());
  }, [dispatch]);

  const onChange = e => {
    if (text.current.value !== '') {
      filterContact(e.target.value)
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  }

  return (
    <Fragment>
      <form>
        <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
      </form>
    </Fragment>
  )
}

export default ContactFilter
