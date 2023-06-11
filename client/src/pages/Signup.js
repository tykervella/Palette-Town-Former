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
    <Container className='mb-5'>
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
        <Col md={5} className='bg-[#0B3C49]  rounded-3xl shadow-xl'>
          <h1 className='text-white pt-10 text-center'>Palette Town</h1>
          <h2 className='text-white pt-20 text-center'>Where Hexcodes Choose YOU!</h2>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>

          ) : (

            <div className='d-flex justify-content-center align-items-center justify-content-center'>
              <form onSubmit={handleFormSubmit}>
                <div className='mb-3 pt-20'>
                  <p className='text-white  text-xs'>New Username</p>
                  <input
                    className="form-input bg-transparent border-b-2 border-[#376D5B] w-full text-white focus:outline-none resize-none"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>

                <div className='mb-3'>
                  <p className='text-white text-xs'>User Email</p>
                  <input
                    className="form-input bg-transparent border-b-2 border-[#376D5B] w-full text-white focus:outline-none resize-none"
                    placeholder="example@example.com"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className='mb-3'>
                  <p className='text-white text-xs'>Password</p>
                  <input
                    className="form-input bg-transparent border-b-2 border-[#376D5B] w-80 text-white focus:outline-none resize-none"
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
                  <label htmlFor="showPassword" className="ml-2 icon-label text-xl text-white " style={{ cursor: 'pointer' }}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </label>
                </div>

                <div className='flex justify-center'>
                  <button
                    className="mb-4 btn-block bg-[#FFEC99] hover:bg-[#4B957E] font-bold py-2 px-4 rounded-lg"
                    style={{ cursor: 'pointer' }}
                    type="submit">
                    Sign Up
                  </button>
                </div>

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