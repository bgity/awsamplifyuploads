import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import { Button, Col, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DataForm extends Component {
  fileObj = [];
  fileArray = [];
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
      validated: false,
      toster: false,
      //error
      shortDescriptionError: false,
      longDescriptionError: false,
      categoryError: false,
      subCategoryError: false,
      videoNameError: false,
      files: [],
      imageFiles: [null],
    };
  }

  fileSelectedHandler = (e) => {
    this.setState({ imageFiles: [...this.state.files, ...e.target.files] });
  };

  handleChangeValue = (event) => {
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
  };
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
  async pushImgToS3(uri, filename) {
    if (uri === null) return;
    await Storage.put(filename, uri, {
      contentType: 'image/*',
    })
      .then((result) => console.log(result.key))
      .catch((err) => console.log(err));
  }
  uploadAssetData = async (e) => {
    const {
      shortDescription,
      longDescription,
      category,
      subCategory,
      videoName,
      videoFile,
      videoType,
      imageFiles,
    } = this.state;
    console.log(imageFiles);
    const filesLength = imageFiles.length;
    console.log(filesLength);
    // Loop through all selected files
    for (let i = 0; i < filesLength; i++) {
      const file = imageFiles[i];
      const filename = file.name;
      /* .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      const fileExtension = file.name.split('.').pop(); */
      // Define the image name
      //let mainImgName = filename . fileExtension;
      // Push the image to S3
      await this.pushImgToS3(file, filename);
    }
    return false;
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
    if (videoName === '') {
      this.setState({ videoNameError: true });
      return false;
    } else {
      this.setState({
        videoNameError: false,
      });
    }

    let videoNameStr = videoName.split('.')[0];
    var createFileName = 'jsonuploader/jsonFile-' + videoNameStr + '.json';
    let jsonData = JSON.stringify({
      shortDescription: shortDescription,
      longDescription: longDescription,
      category: category,
      subCategory: subCategory,
      videoName: videoName,
    });

    //Json upload
    Storage.put(`${createFileName}`, `${jsonData}`, {
      customPrefix: {
        public: '',
      },
      //bucket: 'asset-uploader-dev',
    })
      .then((result) => {
        console.log('result: ', result);
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
    //Video Upload
    const foo = this;
    this.setState({ uploading: true });
    Storage.put(`${videoName}`, videoFile, {
      customPrefix: {
        public: '',
      },
      progressCallback(progress) {
        let prog = parseInt((progress.loaded / progress.total) * 100);
        //console.log(prog + '%');
        foo.setState({ uploadProgress: prog + '%' });
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
        toast.error(`Cannot uploading file: ${err}`, {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    //}
  };
  render() {
    return (
      <div className='container'>
        <div className='outer'>
          <div className='inner'>
            <h3>TCS VIDEO CHANNEL</h3>
            <Form
              validated={this.state.validated}
              onSubmit={this.uploadAssetData}
              id='dataForm'
            >
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
              <Form.Group>
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
                    Please Choose File For Upload
                  </span>
                ) : (
                  ''
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.File
                  name='assetImgUpload'
                  type='file'
                  accept='image/*'
                  multiple={true}
                  onChange={this.fileSelectedHandler}
                />
              </Form.Group>
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
export default DataForm;
