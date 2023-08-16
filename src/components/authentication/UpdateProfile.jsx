import React, { useState, useRef } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuthContext  } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleUpdate(e) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setIsLoading(false);
            return setError("Passwords do not match");
        }

        const promises = [];
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            navigate('/');
        }).catch(() => {
            setError('Failed to update an account');
            setIsLoading(false);
        }).finally(() => {
            setIsLoading(false);
        })
    }

  return (
    <>
        <Card >
            <Card.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <h2 className='text-center mb-4'>Update Your Profile</h2>
                <Form onSubmit={handleUpdate}>
                    <Form.Group id="email" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' 
                        ref={emailRef} required 
                        defaultValue={currentUser.email}
                        />
                    </Form.Group>
                    <Form.Group id="password" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} />
                    </Form.Group>
                    <Form.Group id="password" className="mb-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' ref={confirmPasswordRef} />
                    </Form.Group>

                    <Button 
                        className='w-100' 
                        type="submit"
                        disabled = {isLoading}
                    >Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to='/'>Cancel</Link>
        </div>
    </>
  )
}

export default UpdateProfile