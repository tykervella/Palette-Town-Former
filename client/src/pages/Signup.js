import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

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
        <Col md={7} className='d-none d-md-block'>
          <div className='loginLogo rounded-3xl shadow-xl'>
            <div className='d-flex flex-column align-items-center text-center pt-60'>
              <h1></h1>
            </div>
          </div>
        </Col>

        {/* right column */}
        <Col md={5} className='bg-white rounded-3xl shadow-xl'>
          <h1 className='pt-10 text-center'>Palette Town</h1>
          <h2 className='pt-20 text-center text-gray-400'>Where Hexcodes Choose YOU!</h2>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>

          ) : (

            <div className='d-flex justify-content-center align-items-center justify-content-center'>
              <form onSubmit={handleFormSubmit}>
                <div className='mb-3 pt-20'>
                  <p className='text-gray-400 text-xs'>New Username</p>
                  <input
                    className="form-input bg-transparent border-b-2 w-80"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>

                <div className='mb-3'>
                  <p className='text-gray-400 text-xs'>User Email</p>
                  <input
                    className="form-input bg-transparent border-b-2 w-80"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className='mb-3'>
                  <p className='text-gray-400 text-xs'>Password</p>
                  <input
                    className="form-input bg-transparent border-b-2 w-80"
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
                    className="hidden"
                  />
                  <label htmlFor="showPassword" className="icon-label text-xl" style={{ cursor: 'pointer' }}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </label>
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