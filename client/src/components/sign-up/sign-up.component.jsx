import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({signUpStart}) => {
  const [userCredentials, setCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword: '' })
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('password does not match!');
      return;
    }
    // console.log(this.state)
    signUpStart(displayName, email, password);

  }

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
    // console.log(this.state)
  }

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form action="" className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name='displayName'
          value={displayName}
          label='Display Name'
          onChange={handleChange}
          required
        ></FormInput>
        <FormInput
          type="email"
          name='email'
          value={email}
          label='Email'
          onChange={handleChange}
          required
        ></FormInput>
        <FormInput
          type="password"
          name='password'
          label='Password'
          value={password}
          onChange={handleChange}
          required
        ></FormInput>
        <FormInput
          type="password"
          name='confirmPassword'
          label='Confirm password'
          value={confirmPassword}
          onChange={handleChange}
          required
        ></FormInput>
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  signUpStart: (displayName, email, password) => dispatch(signUpStart({ displayName, email, password }))
})

export default connect(null, mapDispatchToProps)(SignUp);