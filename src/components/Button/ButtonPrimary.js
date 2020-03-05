import React from 'react';

import './Button.css';

import Button from './Button';

export default ({className, children, ...props}) => {

  let classes = `button-primary`;

  return(
    <Button {...props} className={classes}>
      {children}
    </Button>
  )
};
