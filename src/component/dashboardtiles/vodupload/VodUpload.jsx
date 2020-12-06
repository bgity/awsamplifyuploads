import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import { Button, Col, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class VodUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publishAsset: 'inactive',
      title: '',
      language: '',
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
      validated: false,
      toster: false,
      //errors Var
      titleError: false,
      shortDescriptionError: false,
      longDescriptionError: false,
      categoryError: false,
      subCategoryError: false,
      videoNameError: false,
      imageUploadError: false,
      imageFiles: '',
      username1: '',
    };
  }
  /*  componentDidMount() {
    const getUserInformation = JSON.parse(
      localStorage.getItem(
        'CognitoIdentityServiceProvider.6475s2l40uo1i659uq0dbt6tf6.bp1.userData'
      )
    );
    console.log(getUserInformation.Username);
  } */
  //Handle onchange event
  handleChangeValue = (event) => {
    if (event.target.name === 'title') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          titleError: true,
        });
      } else {
        this.setState({
          titleError: false,
          title: event.target.value,
        });
      }
    }
    if (event.target.name === 'language') {
      this.setState({
        language: event.target.value,
      });
    }
    if (event.target.name === 'publishAsset') {
      let publishChecked = event.target.checked;
      if (publishChecked) {
        this.setState({
          publishAsset: 'active',
        });
      }
    }
    if (event.target.name === 'shortDescription') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          shortDescriptionError: true,
        });
      } else {
        this.setState({
          shortDescriptionError: false,
          shortDescription: event.target.value,
        });
      }
    }
    if (event.target.name === 'longDescription') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          longDescriptionError: true,
        });
      } else {
        this.setState({
          longDescriptionError: false,
          longDescription: event.target.value,
        });
      }
    }
    if (event.target.name === 'category') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          categoryError: true,
        });
      } else {
        this.setState({
          categoryError: false,
          category: event.target.value,
        });
      }
    }
    if (event.target.name === 'subCategory') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          subCategoryError: true,
        });
      } else {
        this.setState({
          subCategoryError: false,
          subCategory: event.target.value,
        });
      }
    }
    if (event.target.name === 'assetImgUpload') {
      if (event.target.files[0] === '' || event.target.files[0] === null) {
        this.setState({
          imageUploadError: true,
        });
      } else {
        this.setState({
          imageUploadError: false,
          imageFiles: event.target.files[0],
        });
      }
    }
  };
  //Handle Video Uplod File
  handleVideoChangeValue = (event) => {
    const fileValue = event.target.files[0];
    if (fileValue === '' || fileValue === null) {
      this.setState({
        videoNameError: true,
      });
    } else {
      this.setState({
        videoNameError: false,
        videoFile: fileValue,
        videoName: fileValue.name,
        videoType: fileValue.type,
      });
    }
  };
  backToDashboard = () => {
    this.props.history.push('/');
  };
  //Submit Form
  uploadAssetData = (e) => {
    //Get Current User Login Information
    /*  var data1 = localStorage.getItem(
      'CognitoIdentityServiceProvider.1gqmvf15e1ljdu60go2udsu492.bhagwan.userData'
    ); */
    const getUserInformation = JSON.parse(
      localStorage.getItem(
        'CognitoIdentityServiceProvider.6475s2l40uo1i659uq0dbt6tf6.bp1.userData'
      )
    );
    const {
      title,
      language,
      shortDescription,
      longDescription,
      category,
      subCategory,
      videoName,
      videoFile,
      videoType,
      imageFiles,
      publishAsset,
    } = this.state;

    if (title === '') {
      this.setState({ titleError: true });
    }
    if (shortDescription === '') {
      this.setState({ shortDescriptionError: true });
    }
    if (longDescription === '') {
      this.setState({ longDescriptionError: true });
    }
    if (category === '') {
      this.setState({ categoryError: true });
    }
    if (subCategory === '') {
      this.setState({ subCategoryError: true });
    }
    if (imageFiles === '') {
      this.setState({ imageUploadError: true });
    }
    if (videoName === '') {
      this.setState({ videoNameError: true });
      return false;
    } else {
      this.setState({
        videoNameError: false,
      });
    }
    if (
      title !== '' &&
      shortDescription !== '' &&
      longDescription !== '' &&
      category !== '' &&
      subCategory !== '' &&
      videoName !== '' &&
      imageFiles !== ''
    ) {
      //Create Json File
      let imageType = imageFiles.type;
      let imageName = imageFiles.name;
      let imageNameStr = imageName.split('.')[0];
      let imageNameType = imageName.split('.')[1];
      let videoNameStr = videoName.split('.')[0];
      let videoNameType = videoName.split('.')[1];
      //Update fileName with current DateTime
      const currentDatetime = moment().format('YYYY-MM-DDTHH:mm:ss');
      //updated Image name
      let imageCurrentDateTime =
        imageNameStr + currentDatetime + '.' + imageNameType;
      //updated Video name
      let videoCurrentDateTime =
        videoNameStr + currentDatetime + '.' + videoNameType;
      //Creating JSON file name
      var createFileName = 'jsonuploader/jsonFile-' + videoNameStr + '.json';
      //Creating JSON object
      let jsonData = JSON.stringify({
        title: title,
        language: language,
        shortDescription: shortDescription,
        longDescription: longDescription,
        category: category,
        subCategory: subCategory,
        videoName: videoName,
        imageName: imageName,
        updatedVideoName: videoCurrentDateTime,
        updatedImageName: imageCurrentDateTime,
        currentDateTime: currentDatetime,
        loginUserName: getUserInformation.Username,
        publishAsset: publishAsset,
      });

      //Json upload
      Storage.put(`${createFileName}`, `${jsonData}`, {
        customPrefix: {
          public: '',
        },
      })
        .then((result) => {
          //console.log('result: ', result);
        })
        .catch((err) => {
          this.setState({
            toster: true,
          });
          toast.error(`Cannot uploading file: ${err}`, {
            position: 'top-right',
            autoClose: 4000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });

      //Image Upload
      Storage.put(`${'videoImages/' + imageCurrentDateTime}`, imageFiles, {
        customPrefix: {
          public: '',
        },
        contentType: imageType,
      })
        .then((result) => {
          console.log('result: ', result);
        })
        .catch((err) => {
          this.setState({
            toster: true,
          });
          toast.error(`Cannot uploading Image file: ${err} please try again`, {
            position: 'top-right',
            autoClose: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });

      //Video Upload
      const videoVal = this;
      this.setState({ uploading: true });
      Storage.put(`${videoCurrentDateTime}`, videoFile, {
        customPrefix: {
          public: '',
        },
        progressCallback(progress) {
          let prog = parseInt((progress.loaded / progress.total) * 100);
          //console.log(prog + '%');
          videoVal.setState({ uploadProgress: prog + '%' });
        },
        contentType: videoType,
      })
        .then((result) => {
          this.setState({ uploading: false });
          this.setState({
            toster: true,
          });
          toast.success('File Uploaded Succesfully', {
            position: 'top-right',
            autoClose: 3000,
          });
          //document.getElementById('dataForm').reset();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((err) => {
          this.setState({
            toster: true,
          });
          toast.error(`Cannot uploading Video file: ${err} please try again`, {
            position: 'top-right',
            autoClose: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    }
  };

  render() {
    return (
      <div className='container'>
        <div className='outer'>
          <div className='inner'>
            <Button variant='primary' onClick={this.backToDashboard}>
              Back
            </Button>
            <h3>VOD UPLOAD</h3>
            <Form
              validated={this.state.validated}
              onSubmit={this.uploadAssetData}
              id='dataForm'
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Ttile</Form.Label>
                  <Form.Control
                    type='text'
                    name='title'
                    placeholder='Title'
                    onChange={this.handleChangeValue}
                    autoComplete='off'
                    required
                  />
                  {this.state.titleError ? (
                    <span style={{ color: 'red' }}>Please Enter Title</span>
                  ) : (
                    ''
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type='text'
                    name='language'
                    placeholder='language'
                    onChange={this.handleChangeValue}
                    autoComplete='off'
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>short Description</Form.Label>
                  <Form.Control
                    type='text'
                    name='shortDescription'
                    placeholder='Short Description'
                    onChange={this.handleChangeValue}
                    autoComplete='off'
                    required
                  />
                  {this.state.shortDescriptionError ? (
                    <span style={{ color: 'red' }}>
                      Please Enter short Description
                    </span>
                  ) : (
                    ''
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Long Description</Form.Label>
                  <Form.Control
                    type='text'
                    name='longDescription'
                    placeholder='Long Description'
                    onChange={this.handleChangeValue}
                    autoComplete='off'
                    required
                  />
                  {this.state.longDescriptionError ? (
                    <span style={{ color: 'red' }}>
                      Please Enter Long Description
                    </span>
                  ) : (
                    ''
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as='select'
                    name='category'
                    onChange={this.handleChangeValue}
                    required
                  >
                    <option value=''>Select</option>
                    <option value='CEO Video'>CEO Video</option>
                    <option value='Corporate Video'>Corporate Video</option>
                    <option value='Learning Video'>Learning Video</option>
                  </Form.Control>
                  {this.state.categoryError ? (
                    <span style={{ color: 'red' }}>Please Select Category</span>
                  ) : (
                    ''
                  )}
                </Form.Group>
                <Form.Group as={Col} controlId='formGridPassword'>
                  <Form.Label>Sub Category</Form.Label>
                  <Form.Control
                    as='select'
                    name='subCategory'
                    onChange={this.handleChangeValue}
                    required
                  >
                    <option value=''>Select</option>
                    <option value='ILP Video'>ILP Video</option>
                    <option value='CLP Video'>CLP Video</option>
                    <option value='LDP Video'>LDP Video</option>
                  </Form.Control>
                  {this.state.subCategoryError ? (
                    <span style={{ color: 'red' }}>
                      Please Select SubCategory
                    </span>
                  ) : (
                    ''
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Thumbnail Image</Form.Label>
                  <Form.File
                    name='assetImgUpload'
                    type='file'
                    accept='image/*'
                    onChange={this.handleChangeValue}
                    required
                  />
                  {this.state.imageUploadError ? (
                    <span style={{ color: 'red' }}>
                      Please Choose Image File For Upload
                    </span>
                  ) : (
                    ''
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Video</Form.Label>
                  {this.state.uploading && (
                    <div className='progress' style={{ marginBottom: '10px' }}>
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
                  )}
                  <Form.File
                    name='assetUpload'
                    type='file'
                    accept='video/*'
                    onChange={this.handleVideoChangeValue}
                    required
                  />
                  {this.state.videoNameError ? (
                    <span style={{ color: 'red' }}>
                      Please Choose Video File For Upload
                    </span>
                  ) : (
                    ''
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Check
                    type='checkbox'
                    name='publishAsset'
                    label='Publish Asset'
                    onChange={this.handleChangeValue}
                  />
                </Form.Group>
              </Form.Row>
              {this.state.toster && (
                <ToastContainer
                  position='top-right'
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              )}

              {/*  {this.state.toster && <Toster />} */}
              <Button variant='primary' onClick={this.uploadAssetData}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(VodUpload);
