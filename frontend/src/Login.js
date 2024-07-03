import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom'; 
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { setauthuser } from './redux/userslice.js';

const Login = () => {

  const dispatch=useDispatch();

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    Password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.Password) newErrors.Password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      axios.post('http://localhost:8000/user/login', formData ,{ withCredentials: true })
        .then(res => {
          // console.log(res.data);
          dispatch(setauthuser(res.data))
          toast.success(res.data.message)
          navigate("/Home")  
        })
        .catch(err => {
          console.error(err); 
          toast.error(err.response.data.message)
        });

      setFormData({
        username: '',
        Password: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
          {errors.Password && <p className="error">{errors.Password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      </div>
    </div>
  );
};

export default Login;
