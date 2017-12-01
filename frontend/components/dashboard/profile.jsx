import React from 'react';

// https://target.scene7.com/is/image/Target/14778465?wid=520&hei=520&fmt=pjpeg
// https://upload.wikimedia.org/wikipedia/en/b/b8/Professor_Charles_Xavier.png
// http://nerdist.com/wp-content/uploads/2016/11/tumblr_n2y7ief66K1rom810o1_1280.jpg

const errorFields = [
  ["Fnamee", "Fname can't be blank"], 
  ["Lnamee", "Lname can't be blank"]];

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      imageUrl: this.props.currentUser.img_url, 
      imageFile: null, 
      httpImageUrl: '',
      fname: this.props.currentUser.fname,
      lname: this.props.currentUser.lname
    };
    this.reader = new FileReader();
    this.resetForm = this.resetForm.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  componentDidMount() {
    this.props.requestCurrentUser();
  }

  resetForm() {
    this.clearErrors();
    this.setState({imageFile: null, httpImageUrl: ''});
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  setHttpImage(e) {
    // document.getElementById('file-input').value = null;
    // $('#image-error').addClass("hidden");
    // if (this.state.httpImageUrl) {// only set image if response is 200 OK
    //   $.ajax({url: this.state.httpImageUrl})
    //     .then(() => this.setState({ 
    //       imageUrl: this.state.httpImageUrl, 
    //       imageFile: null, 
    //       httpImageUrl: ''
    //     }), () => $('#image-error').removeClass("hidden"));
    // }

    if (this.state.httpImageUrl)
      this.setState({ 
        imageUrl: this.state.httpImageUrl, 
        imageFile: null, 
        httpImageUrl: ''
      });
  }

  handleImage(e) {
    const file = e.currentTarget.files[0];
    this.reader.onloadend = () =>
      this.setState({ 
        imageUrl: this.reader.result, 
        imageFile: file, 
        httpImageUrl: ''});
    
    if (file) {
      this.reader.readAsDataURL(file);
    } else {
      this.resetForm();
    }
  }

  handleSubmit() {
    const file = this.state.imageFile;
    const formData = new FormData();
    if (file) {
      formData.append("user[image]", file);
    }
    formData.append("user[img_url]", this.state.imageUrl);
    formData.append("user[fname]", this.state.fname);
    formData.append("user[lname]", this.state.lname);

    // for (let value of formData.values()) {
    //   console.log(value);
    // }
    this.props.updateUser(formData, this.props.currentUser.id)
      .then(this.resetForm, this.handleErrors);
  }

  clearErrors() {
    errorFields.forEach(([field, regex]) => {
      $(`#${field}`).addClass("hidden");
      $(`#${field.slice(0, -1)}`).removeClass("error-border");
      if (field === "Birthdaye")
        $(`.${field.slice(0, -1)}`).removeClass("error-border");
    });
  }

  handleErrors() {
    // First clear all errors
    this.clearErrors();

    // Next add errors if they exist (to prevent removing recent error)
    errorFields.forEach(([field, regex]) => {
      if (RegExp(regex).test(this.props.errors)) {
        $(`#${field}`).removeClass("hidden");
        $(`#${field.slice(0, -1)}`).addClass("error-border");
        if (field === "Birthdaye")
          $(`.${field.slice(0, -1)}`).addClass("error-border");
      }
    });
  }

  render() {
    const { currentUser } = this.props;
    
    return (
      <div className='profile-container'>
        <header>
          <h2>My Personal Profile</h2>
          <a className='button orange-btn' 
            onClick={this.handleSubmit.bind(this)}
          >Save</a>
        </header>

        <h4>Profile Picture</h4>
        <div className='profile-picture'>
          <div className='thumbnail-container'>
            <img src={this.state.imageUrl} className='profile' alt="User image"/>
          </div>
          <div className='picture-inputs'>
            <input type="file" id='file-input'
              onChange={this.handleImage.bind(this)}
            />
            <div className='picture-html'>
              <span id="image-error" className="error-msg hidden">
                Invalid image address. Try again.
              </span>
              <input type="text" placeholder='Or enter the address of your photo'
                onChange={this.update('httpImageUrl')}
                value={this.state.httpImageUrl}
              />
              <a className='button' 
                onClick={this.setHttpImage.bind(this)}
              >Set</a>
            </div>
          </div>
        </div>

        <div className='profile-data'>
          <div className='profile-field-col'>
            <label htmlFor='Fname'>First Name</label>
            <input type="text" id='Fname'
              onChange={this.update("fname")}
              value={this.state.fname}
            />
            <span id="Fnamee" className="error-msg hidden">
              First name is required.
            </span>
          </div>
          <div className='profile-field-col'>
            <label htmlFor='Lname'>Last Name</label>
            <input type="text" id='Lname'
              onChange={this.update("lname")}
              value={this.state.lname}
            />
            <span id="Lnamee" className="error-msg hidden">
              Last name is required.
            </span>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Profile;