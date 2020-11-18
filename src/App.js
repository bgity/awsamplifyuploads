import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
import DataForm from './component/uploaddata/DataForm';

function App() {
  return (
    <div className='App'>
      <DataForm />
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
