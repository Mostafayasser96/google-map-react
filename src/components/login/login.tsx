import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Form,
  Button,
  Modal
} from 'react-bootstrap';
import './login-styles.css';
import { Inputs } from './login-types';
import {
  useForm,
  SubmitHandler
} from 'react-hook-form';
import { useNavigate } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../consts';


const Login = () => {
  const navigate = useNavigate();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset({
      username: '',
      password: ''
    })
    getToken(data);
  }
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(show);
  const handleShow = () => setShow(!show);
  const setCookie = (response: AxiosResponse<any, any>) => {
    document.cookie = `token=${response.data['token']}`;
  }
  const getToken = async (data: Inputs) => {
    try{
      const response = await axios.post(baseUrl + '/login', data);
      console.log('token is: ', response.data['token']);
      console.log(response.request);
      console.log(response.headers);
      console.log(response.data);
       setCookie(response);
       navigate('/map');
    } catch (error){
      console.log('there is an error', error);
    }
  }


  return (
    <div className='main'>
     <Form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='formBasicUsername' className='form-group1'>
          <Form.Label className='form-lbl'>UserName</Form.Label>
          <Form.Control type='username'
            placeholder='Enter Username'
            {...register('username', { required: true })}
          />
          {errors.username && <span className='error' onClick={handleShow}>username isn't correct!</span>}
        </Form.Group>
        <Form.Group controlId='formBasicPassword' className='form-group2'>
          <Form.Label className='form-lbl'>Password</Form.Label>
          <Form.Control type='password'
            placeholder='Enter Password'
            className='margin-10'
            {...register('password', { required: true })}
          />
          {errors.password && <span className='error' onClick={handleShow}>pasword isn't correct!</span>}
        </Form.Group>
        <Button variant='primary' type='submit' className='submit'>
          Submit
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          There is an error!
        </Modal.Header>
        <Button variant='primary' onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </div>
  )
}
export default Login;