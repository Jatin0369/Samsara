// CustomLoadingSpinner.js
import React from 'react';
import { BarLoader } from 'react-spinners';

const CustomLoading = () => {
  return (
    <div style={styles.spinnerContainer}>
      <BarLoader
        color="#3498db"  // Customize the color
        height={4}
        width={100}
        loading={true}
      />
      <p style={styles.text}>Loading, please wait...</p>
    </div>
  );
};

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  },
  text: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#3498db',
  }
};

export default CustomLoading;
