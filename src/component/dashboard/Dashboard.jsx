import React, { Component } from 'react';
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
  clickHandler = (tiles) => {
    if (tiles === 'myassets') {
      this.props.history.push('/myassets');
    } else if (tiles === 'vodupload') {
      this.props.history.push('/vodupload');
    } else {
      this.props.history.push('/liveeventupload');
    }
  };
  componentDidMount() {
    const getUserInformation = JSON.parse(
      localStorage.getItem(
        'CognitoIdentityServiceProvider.6475s2l40uo1i659uq0dbt6tf6.bp1.userData'
      )
    );
    console.log(getUserInformation.Username);
  }
  render() {
    return (
      <div className='top-padding'>
        <Container>
          <Row>
            <Col sm={4} onClick={() => this.clickHandler('myassets')}>
              <Card className='card-gardient'>
                <Card.Body>
                  <p className='text-white text-middle'>MY ASSETS</p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} onClick={() => this.clickHandler('vodupload')}>
              <Card className='card-gardient'>
                <Card.Body>
                  <p className='text-white text-middle'>VOD UPLOAD</p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} onClick={() => this.clickHandler('liveeventupload')}>
              <Card className='card-gardient'>
                <Card.Body>
                  <p className='text-white text-middle'> LIVE EVENT UPLOAD</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Dashboard);
