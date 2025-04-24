// src/pages/TestBackend.js
import React, { useEffect } from 'react';
import axios from 'axios';

const TestBackend = () => {
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 text-lg font-semibold">
      Check console for backend response 👀
    </div>
  );
};

export default TestBackend;
