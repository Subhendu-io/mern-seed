const initiateServiceParameters = () => {
  if (process.env.NODE_ENV === 'LOCAL') {
    process.env.BASE_URL = 'http://localhost:3000'
  } else {
    process.env.BASE_URL = 'http://subhendu.io'
  }
};

initiateServiceParameters();