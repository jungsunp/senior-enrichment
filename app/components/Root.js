import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

/* -----------------  Component  ------------------ */
const Root = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Root;
