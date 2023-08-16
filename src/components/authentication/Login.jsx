import React, { useState, useRef } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuthContext  } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        // if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        //     return setError("Passwords do not match");
        // }

        try {
            setError('');
            setIsLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (err) {
            setError("Failed to sign in");
        }
        setIsLoading(false);
    }

  return (
    <CenteredContainer>
        <Card >
            <Card.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <h2 className='text-center mb-4'>Log In</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Button 
                        className='w-100' 
                        type="submit"
                        disabled = {isLoading}
                    >Log In</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to={'/forgot-password'}>Forgot Password ?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Don't have an account?  
            <Link to='/signup' >
                Sign Up
            </Link>
        </div>
    </CenteredContainer>
  )
}

export default Login