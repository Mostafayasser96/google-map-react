import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Form,
  Button
} from 'react-bootstrap';
import './login-styles.css';

const Login = () => {
  return (
    <Form className='form'>
      <Form.Group controlId='formBasicUsername' className='form-group1'>
        <Form.Label className='form-lbl'>UserName</Form.Label>
        <Form.Control type='username' placeholder='Enter Username' />
      </Form.Group>
      <Form.Group controlId='formBasicPassword' className='form-group2'>
        <Form.Label className='form-lbl'>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter Password' />
      </Form.Group>
      <Button variant='primary' type='submit' className='submit'>
          Submit
      </Button>
    </Form>
  )
}
export default Login;