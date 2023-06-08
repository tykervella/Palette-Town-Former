import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '', });
  const [showPassword, setShowPassword] = useState(false); // New state variable

  const [addUser, { error, data }] = useMutation(ADD_USER);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Row>

        {/* left column */}
        <Col md={8} className='d-none d-md-block'>
          <div className='border border-black'>
            <h1>Sign Up</h1>
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

            <div className='d-flex justify-content-center'>
              <form onSubmit={handleFormSubmit}>
                <div className='mb-3'>
                  <input
                    className="form-input"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>

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
                    type={showPassword ? 'text' : 'password'}
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
                  Sign Up
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

export default Signup;