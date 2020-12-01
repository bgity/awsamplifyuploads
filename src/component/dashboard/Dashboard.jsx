import React, { Component } from 'react';
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
  clickHandler = () => {
    this.props.history.push('/vodupload');
  };
  render() {
    return (
      <div className='top-padding'>
        <Container>
          <Row>
            <Col sm={4} onClick={this.clickHandler}>
              <Card className='card-gardient'>
                <Card.Body>
                  <p className='text-white text-middle'>MY ASSETS</p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} onClick={this.clickHandler}>
              <Card className='card-gardient'>
                <Card.Body>
                  <p className='text-white text-middle'>VOD UPLOAD</p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} onClick={this.clickHandler}>
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
