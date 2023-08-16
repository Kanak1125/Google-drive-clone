import React, { useState, useRef } from 'react'
import { Card, Alert, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthContext  } from '../../contexts/AuthContext';
import CenteredContainer from './CenteredContainer';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        // if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        //     return setError("Passwords do not match");
        // }

        try {
            setMessage('');
            setError('');
            setIsLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for your password reset code");
        } catch (err) {
            setError("Failed to reset password");
        }
        setIsLoading(false);
    }
  return (
    <CenteredContainer>
        <Card >
            <Card.Body>
                {message && <Alert variant='success'>{message}</Alert>}
                {error && <Alert variant='danger'>{error}</Alert>}
                <h2 className='text-center mb-4'>Password Reset</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>

                    <Button 
                        className='w-100' 
                        type="submit"
                        disabled = {isLoading}
                    >Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to={'/login'}>Login</Link>
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

export default ForgotPassword