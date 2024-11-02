import React from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation.json';  // Download a Lottie file (e.g. from LottieFiles)

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div style={styles.loaderContainer}>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
};

export default Loader;
