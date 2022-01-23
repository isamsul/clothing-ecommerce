import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    const { signUpStart } = this.props;

    if (password !== confirmPassword) {
      alert('password does not match!');
      return;
    }
    // console.log(this.state)
    signUpStart(displayName, email, password);

  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(this.state)
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form action="" className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name='displayName'
            value={displayName}
            label='Display Name'
            onChange={this.handleChange}
            required
          ></FormInput>
          <FormInput
            type="email"
            name='email'
            value={email}
            label='Email'
            onChange={this.handleChange}
            required
          ></FormInput>
          <FormInput
            type="password"
            name='password'
            label='Password'
            value={password}
            onChange={this.handleChange}
            required
          ></FormInput>
          <FormInput
            type="password"
            name='confirmPassword'
            label='Confirm password'
            value={confirmPassword}
            onChange={this.handleChange}
            required
          ></FormInput>
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUpStart: (displayName, email, password) => dispatch(signUpStart({ displayName, email, password }))
})

export default connect(null, mapDispatchToProps)(SignUp);