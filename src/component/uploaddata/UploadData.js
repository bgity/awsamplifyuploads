import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
/* import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar'; */
import {
  ProgressBar,
  Button,
  Row,
  Col,
  Container,
  Spinner,
  Form,
} from 'react-bootstrap';

class UploadData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoName: '',
      videoFile: '',
      videoType: '',
      response: '',
      isLoading: false,
      shortDescription: '',
      longDescription: '',
      category: '',
      subCategory: '',
      videoNameVal: '',
      uploadProgress: 0,
      uploading: false,
    };
  }

  handleChangeValue = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  handleVideoChangeValue = (event) => {
    const fileValue = event.target.files[0];
    this.setState({
      videoFile: fileValue,
      videoName: fileValue.name,
      videoType: fileValue.type,
    });
  };
  uploadAssetData = (e) => {
    let videoStr = this.state.videoName;
    videoStr = videoStr.split('.')[0];
    this.setState({ uploading: true });
    var createFileName = 'jsonuploader/jsonFile-' + videoStr + '.json';
    let shortDescription = this.state.shortDescription;
    let longDescription = this.state.longDescription;
    let category = this.state.category;
    let subCategory = this.state.subCategory;
    //let videoNameVal = this.state.videoNameVal;
    let videoName = this.state.videoName;
    let videoFile = this.state.videoFile;
    let videoType = this.state.videoType;
    let jsonData = JSON.stringify({
      shortDescription: shortDescription,
      longDescription: longDescription,
      category: category,
      subCategory: subCategory,
      videoName: videoName,
    });
    //Json upload
    Storage.put(`${createFileName}`, `${jsonData}`)
      .then((result) => {
        console.log('result: ', result);
      })
      .catch((err) => console.log('error: ', err));

    //Video Upload
    const foo = this;
    Storage.put(`videouploader/${videoName}`, videoFile, {
      progressCallback(progress) {
        let prog = parseInt((progress.loaded / progress.total) * 100);
        console.log(prog + '%');
        foo.setState({ uploadProgress: prog + '%' });
      },
      contentType: videoType,
    })
      .then((result) => {
        this.setState({ uploading: false });
        window.location.reload();
        this.setState({ response: 'Success uploading file!' });
      })
      .catch((err) => {
        this.setState({ response: `Cannot uploading file: ${err}` });
      });
    console.log(videoFile);
  };
  render() {
    //const { uploadProgress } = this.state;
    return (
      <Container>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              <h6>Short Description</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type='text'
                name='shortDescription'
                placeholder='Short Description'
                onChange={this.handleChangeValue}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formHorizontalPassword'>
            <Form.Label column sm={2}>
              <h6>Long Description</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type='text'
                name='longDescription'
                placeholder='Long Description'
                onChange={this.handleChangeValue}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formHorizontalPassword'>
            <Form.Label column sm={2}>
              <h6>Category</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                as='select'
                name='category'
                onChange={this.handleChangeValue}
              >
                <option value=''>Select</option>
                <option value='CEO Video'>CEO Video</option>
                <option value='Corporate Video'>Corporate Video</option>
                <option value='Learning Video'>Learning Video</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formHorizontalPassword'>
            <Form.Label column sm={2}>
              <h6>Sub Category</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                as='select'
                name='subCategory'
                onChange={this.handleChangeValue}
              >
                <option value=''>Select</option>
                <option value='ILP Video'>ILP Video</option>
                <option value='CLP Video'>CLP Video</option>
                <option value='LDP Video'>LDP Video</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formHorizontalEmail'>
            <Form.Label column sm={2}>
              <h6>Video</h6>
            </Form.Label>
            <Col sm={4}>
              <Form.File
                type='file'
                accept='video/*'
                onChange={this.handleVideoChangeValue}
              />
            </Col>
          </Form.Group>
          {/*  {this.state.uploadProgress > 0 && (
            <ProgressBar
              now={this.state.uploadProgress}
              active='true'
              label={`${this.state.uploadProgress}`}
              style={{ width: this.state.uploadProgress + '%' }}
            />
          )} */}
          <div className='progress'>
            <div
              className='progress-bar'
              role='progressbar'
              style={{ width: this.state.uploadProgress }}
              aria-valuenow={this.state.uploadProgress}
              aria-valuemin='0'
              aria-valuemax='100'
            >
              {this.state.uploadProgress}
            </div>
          </div>
          <Form.Group as={Row}>
            <Col sm={{ span: 5, offset: 2 }}>
              <Button onClick={this.uploadAssetData}>Submit</Button>
            </Col>

            {/*  {!this.state.uploading && (
              <Col sm={{ span: 5, offset: 2 }}>
                <Button onClick={this.uploadAssetData}>Submit</Button>
              </Col>
            )}
            {this.state.uploading && (
              <Col sm={{ span: 5, offset: 2 }}>
                <Button variant='primary' disabled>
                  <Spinner
                    as='span'
                    animation='grow'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  Uploading Please Wait...
                </Button>
              </Col>
            )} */}
          </Form.Group>
        </Form>

        {/* {uploadProgress && (
          <div className='progress'>
            <div
              className='progress-bar progress-bar-info progress-bar-striped'
              role='progressbar'
              aria-valuenow={uploadProgress}
              aria-valuemin='0'
              aria-valuemax='100'
              style={{ width: uploadProgress + '%' }}
            >
              {uploadProgress}
            </div>
          </div>
        )} */}
      </Container>
    );
  }
}
export default UploadData;
