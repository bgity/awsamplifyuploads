import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify, { Auth, Storage } from 'aws-amplify';
//import config from './aws-exports';
//Amplify.configure(config);
Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:0af360ec-7681-4477-ac7c-51e329e7ec17', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_sMZx57ev4', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '6475s2l40uo1i659uq0dbt6tf6', //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: 'tcs-video', //REQUIRED -  Amazon S3 bucket name
      region: 'us-east-1', //OPTIONAL -  Amazon service region
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
