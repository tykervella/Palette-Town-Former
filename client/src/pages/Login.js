import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [showPassword, setShowPassword] = useState(false);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Container>
      <Row>

        {/* left column */}
        <Col md={8} className="d-none d-md-block">
          <div className='loginLogo rounded-3xl shadow-xl'>
            <div className='d-flex flex-column align-items-center text-center'>
              <h1 className='pt-10'>No account?</h1>
              <h2 className='pt-20'>Go here to Sign Up!</h2>
              <p className='mr-10 ml-10 pt-10'>Marley, please save me. I am coding, suffering. Send help and maybe some Hawaiian Punch my way. This is my plea for help</p>
              <button className='btn-block bg-gray-800 text-white py-2 px-4 rounded-lg'>
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          </div>
        </Col>

        {/* right column */}
        <Col md={4} className='bg-white rounded-3xl shadow-xl'>
          <h1 className='pt-10 text-center'>Palette Town</h1>
          <h2 className='pt-10 text-center text-gray-400'>Where Hexcodes Choose YOU!</h2>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>

          ) : (

            <div className="d-flex justify-content-center align-items-center justify-content-center">
              <form onSubmit={handleFormSubmit}>
                <div className='mb-3 pt-10'>
                  <p className='text-gray-400 text-xs'>User Email</p>
                  <input
                    className="form-input bg-transparent border-b-2 w-80"
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className='mb-3'>
                  <p className='text-gray-400 text-xs'>Password</p>
                  <div className="input-icon">
                    <input
                      className="form-input bg-transparent border-b-2 w-80"
                      placeholder="******"
                      name="password"
                      type={showPassword ? 'text' : 'password'} // Dynamically set the input type based on showPassword state
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={toggleShowPassword}
                      className="hidden"
                    />
                    <label htmlFor="showPassword" className="icon-label text-xl" style={{ cursor: 'pointer' }}>
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </label>
                  </div>
                </div>

                <button
                  className="btn-block bg-gray-800 text-white py-2 px-4 rounded-lg"
                  style={{ cursor: 'pointer' }}
                  type="submit">
                  Login
                </button>

              </form>
            </div>

          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white rounded-xl text-center">
              {error.message}
            </div>

          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
