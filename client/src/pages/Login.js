import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [showPassword, setShowPassword] = useState(false); // New state variable

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
          <div className='border border-black'>
            <h1>Login</h1>
            <h2>No account? Go here to Sign Up!</h2>
            <Link to="/signup" className='main-button'>Sign Up</Link>
          </div>
        </Col>


        {/* right column */}
        <Col md={4} className='border border-black'>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>

          ) : (

            <div className="d-flex justify-content-center">
              <form onSubmit={handleFormSubmit}>
                <div className='mb-3'>
                  <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className='mb-3'>
                  <input
                    className="form-input"
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
                  />
                  <label htmlFor="showPassword">Show</label>
                </div>

                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit">
                  Login
                </button>

              </form>
            </div>

          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>

          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;