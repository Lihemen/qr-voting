import { useEffect, useRef, useState } from 'react';

function useAlert() {
  const [show, setShow] = useState(false);
  const visibilityRef = useRef(show);
  visibilityRef.current = show;

  const [alertType, setAlertType] = useState('');
  const [message, setMessage] = useState('');

  const changeStatus = (state) => {
    return setShow(state);
  };

  const changeType = (type) => {
    return setAlertType(type);
  };
  const changeMessage = (data) => {
    return setMessage(data);
  };

  useEffect(() => {
    changeStatus(true);
    setTimeout(() => {
      changeStatus(false);
    }, 500);
  }, []);

  const renderAlert = () => {
    return <div className={`alert alert__${alertType}`}>{message}</div>;
  };
  const isVisible = show;

  return { changeStatus, isVisible, changeMessage, changeType, renderAlert };
}

export { useAlert };
