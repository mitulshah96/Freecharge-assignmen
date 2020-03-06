const environments = {
  development: {
    BASE_URL: " http://www.splashbase.co/api"
  },
  qa: {
    BASE_URL: ""
  },
  production: {
    BASE_URL: ""
  }
};
export default environments[process.env.REACT_APP_ENV] ||
  environments[Object.keys(environments)[0]];
