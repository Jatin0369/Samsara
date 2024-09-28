// DelayedFallback.js
import React, { useState, useEffect } from 'react';

const DelayedFallback = ({ delay = 300, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? children : null;
};

export default DelayedFallback;
