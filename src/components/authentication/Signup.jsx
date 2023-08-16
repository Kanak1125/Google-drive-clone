import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuthContext  } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setIsLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (err) {
            setError("Failed to create an account");
        }
        setIsLoading(false);
    }
  return (
    <CenteredContainer>
        <Card >
            <Card.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <h2 className='text-center mb-4'>Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="confirm_password" className="mb-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' ref={confirmPasswordRef} required />
                    </Form.Group>
                    <Button 
                        className='w-100' 
                        type="submit"
                        disabled = {isLoading}
                    >Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? 
            <Link to='/login' >
                Log In
            </Link>
        </div>
    </CenteredContainer>
  )
}

export default Signup