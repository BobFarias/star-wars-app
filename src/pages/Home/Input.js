import React from 'react';

import {Form} from 'react-bootstrap';

import './Home.css';

export default function Input({className, inputRef, ...props}) {
  let classes = `input-primmary input-search ${className || ''}`;

  return <Form.Control className={classes} ref={inputRef} {...props} />;
}
