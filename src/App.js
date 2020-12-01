import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
import DataForm from './component/uploaddata/DataForm';
import Dashboard from './component/dashboard/Dashboard';
import vodupload from './component/dashboardtiles/vodupload/VodUpload';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/vodupload' component={vodupload} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
