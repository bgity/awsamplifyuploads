import React, { Component } from 'react';
import { Button, Row, Container } from 'react-bootstrap';
import { Storage } from 'aws-amplify';
const newarray = [];
class MyAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketAssetsArray: [],
    };
  }

  componentDidMount() {
    Storage.list('videoImages/', {
      customPrefix: {
        public: '',
      },
    }).then(
      (result) => {
        console.log(result);
        this.setState({
          bucketAssetsArray: result,
        });
      },
      (error) => {
        this.setState({
          error,
        });
      }
    );
  }

  backToDashboard = () => {
    this.props.history.push('/');
  };
  getArrayValue = (arratval) => {
    this.setState(() => ({
      resultValue: arratval,
    }));
  };
  render() {
    return (
      <div>
        <Container>
          {/*  {this.getArrayValue} */}
          <Row className='justify-content-center'>
            <h1>COMMING SOON</h1>
          </Row>
          <Row className='justify-content-center'>
            <Button variant='warning' onClick={this.backToDashboard}>
              Back
            </Button>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MyAssets;
