import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './HomePage/Header';
import Footer from './HomePage/Fooder';
import BeforeLoginRoutes from './Routes/BeforeLoginRoutes ';
import AfterLoginRoutes from './Routes/AfterLoginRoutes ';
// import NotificationComponent from './NotificationComponent';


const App = () => {
  return (
    <Router>
      <div style={styles.app}>
        <Header />
        <div style={styles.content}>
           <BeforeLoginRoutes />
           <AfterLoginRoutes />
           {/* < NotificationComponent/> */}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    paddingBottom: '60px',  // Ensure space for footer
    position: 'relative',
  },
};

export default App;
