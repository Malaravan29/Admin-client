import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
 
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
         <h1>SpotlessAI</h1>
          <div style={styles.socialIcons}>
            <button style={styles.icon} aria-label="Facebook"><FaFacebook /></button>
            <button style={styles.icon} aria-label="Twitter"><FaTwitter /></button>
            <button style={styles.icon} aria-label="Instagram"><FaInstagram /></button>
          </div>
        </div>
        <div style={styles.column}>
          <h4 style={styles.heading}>Menu</h4>
          <ul style={styles.list}>
            <li><button style={styles.link}>Home</button></li>
            <li><button style={styles.link}>About Us</button></li>
            <li><button style={styles.link}>Segments</button></li>
            <li><button style={styles.link}>Investor Relations</button></li>
          </ul>
        </div>
        <div style={styles.column}>
          <h4 style={styles.heading}>Segments</h4>
          <ul style={styles.list}>
            <li><button style={styles.link}>Healthcare</button></li>
            <li><button style={styles.link}>Laboratories</button></li>
            <li><button style={styles.link}>Warehouse/Factories</button></li>
            <li><button style={styles.link}>Educational Institutions</button></li>
            <li><button style={styles.link}>Public Transport</button></li>
          </ul>
        </div>
        <div style={styles.column}>
          <h4 style={styles.heading}>Contact us</h4>
          <p style={styles.contactInfo}>
            <FaEnvelope /> support@spotless.ai
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#f8f9fa',
    padding: '2rem 0',
    position: 'relative',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  column: {
    flex: '1',
    minWidth: '200px',
    margin: '1rem 0',
  },
  logo: {
    height: '50px',
    marginBottom: '1rem',
  },
  description: {
    color: '#777',
    lineHeight: '1.5',
  },
  socialIcons: {
    marginTop: '1rem',
    display: 'flex',
    gap: '1.5rem',
  },
  icon: {
    color: '#555',
    fontSize: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  heading: {
    color: '#333',
    marginBottom: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#555',
    textDecoration: 'none',
    display: 'block',
    margin: '0.5rem 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
  },
  contactInfo: {
    color: '#555',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  }
};

export default Footer;


// don't delete this code 


// import React from 'react';
// import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

// const Footer = () => {
 
//   return (
//     <footer style={styles.footer}>
//       <div style={styles.container}>
//         <div style={styles.column}>
//          <h1>SpotlessAI</h1>
//           <div style={styles.socialIcons}>
//             <a href="#" style={styles.icon}><FaFacebook /></a>
//             <a href="#" style={styles.icon}><FaTwitter /></a>
//             <a href="#" style={styles.icon}><FaInstagram /></a>
//           </div>
//         </div>
//         <div style={styles.column}>
//           <h4 style={styles.heading}>Menu</h4>
//           <ul style={styles.list}>
//             <li><a href="#" style={styles.link}>Home</a></li>
//             <li><a href="#" style={styles.link}>About Us</a></li>
//             <li><a href="#" style={styles.link}>Segments</a></li>
//             <li><a href="#" style={styles.link}>Investor Relations</a></li>
//           </ul>
//         </div>
//         <div style={styles.column}>
//           <h4 style={styles.heading}>Segments</h4>
//           <ul style={styles.list}>
//             <li><a href="#" style={styles.link}>Healthcare</a></li>
//             <li><a href="#" style={styles.link}>Laboratories</a></li>
//             <li><a href="#" style={styles.link}>Warehouse/Factories</a></li>
//             <li><a href="#" style={styles.link}>Educational Institutions</a></li>
//             <li><a href="#" style={styles.link}>Public Transport</a></li>
//           </ul>
//         </div>
//         <div style={styles.column}>
//           <h4 style={styles.heading}>Contact us</h4>
//           <p style={styles.contactInfo}>
//             <FaEnvelope /> support@spotless.ai
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// const styles = {
//   footer: {
//     backgroundColor: '#f8f9fa',
//     padding: '2rem 0',
//     position: 'relative',
//   },
//   container: {
//     display: 'flex',
//     justifyContent: 'space-around',
//     alignItems: 'flex-start',
//     flexWrap: 'wrap',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '0 1rem',
//   },
//   column: {
//     flex: '1',
//     minWidth: '200px',
//     margin: '1rem 0',
//   },
//   logo: {
//     height: '50px',
//     marginBottom: '1rem',
//   },
//   description: {
//     color: '#777',
//     lineHeight: '1.5',
//   },
//   socialIcons: {
//     marginTop: '1rem',
//     display: 'flex',
//     gap: '1.5rem',
//   },
//   icon: {
//     color: '#555',
//     fontSize: '1.5rem',
//     textDecoration: 'none',
//   },
//   heading: {
//     color: '#333',
//     marginBottom: '1rem',
//   },
//   list: {
//     listStyle: 'none',
//     padding: 0,
//   },
//   link: {
//     color: '#555',
//     textDecoration: 'none',
//     display: 'block',
//     margin: '0.5rem 0',
//   },
//   contactInfo: {
//     color: '#555',
//     marginBottom: '0.5rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//   }
// };

// export default Footer;
