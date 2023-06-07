import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    setFormState({ email: '', password: '' });
  };

  // toggle show/hide password
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Container>
      <Row>
        <Col md={8} className="d-none d-md-block">
          {/* Left Column */}
          <div className="left-column">
            {/* Add your image or content here */}
          </div>
        </Col>
        <Col md={4}>
          {/* Right Column */}
          <div className="right-column d-flex flex-column justify-content-center align-items-center">
            <form className="border border-black p-3">
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />

              {/* password input */}
              <div className="password-input">
                <input
                  className="form-input"
                  placeholder="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="toggle-password"
                  onClick={toggleShowPassword}
                  type="button"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* submit button */}
              <button
                className="btn btn-block btn-primary mt-3"
                style={{ cursor: 'pointer' }}
                type="submit"
                onClick={handleFormSubmit}
              >
                Login
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;