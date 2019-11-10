import React, { Fragment, useEffect } from 'react';

import './ErrorModal.css';

const ErrorModal = React.memo(props => {
  const handleUserKeyPress = e => {
    const { keyCode } = e;
    if (keyCode === 27 || keyCode === 13) {
      props.onClose();
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  });
  return (
    <Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </Fragment>
  );
});

export default ErrorModal;
