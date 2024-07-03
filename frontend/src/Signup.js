import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios'
import { Link , useNavigate} from 'react-router-dom'; 
import toast from 'react-hot-toast'

const Signup = () => {

  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    FullName: '',
    username: '',
    Password: '',
    confirmPassword: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.FullName) newErrors.fullName = 'Full Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.Password) newErrors.password = 'Password is required';
    if (formData.Password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(errors)
    } 
    else 
    {
      
      axios.post('http://localhost:8000/user/signup', formData ,{ withCredentials: true }).then(res => {
        toast.success(res.data.message)
        // console.log(res);
        navigate("/")

      }).catch((err)=>{
        console.log(err)
      })

      setFormData({
        FullName: '',
        username: '',
        Password: '',
        confirmPassword: '',
        gender: '',
      });
      setErrors({});
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="signup-link">
        <p>Already have an account? <Link to="/">Login In here</Link></p>
      </div>
      
    </div>
  );
};

export default Signup;
