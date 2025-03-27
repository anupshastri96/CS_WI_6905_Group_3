const awsConfig = {
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_4TftlWzgP',
    userPoolWebClientId: '7rfb69gglntu7klpdq77i9asau',
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    /*oauth: {
      domain: 'us-east-2_4tftlwzgp.auth.us-east-2.amazoncognito.com',
      scope: ['openid', 'email', 'profile'],
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/', 
      responseType: 'code'
    }*/
  }
};

export default awsConfig;
