import './page_css/form.css';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:5000/register', formData);
      alert(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="form-container d-flex align-items-center justify-content-center py-5">
      <div className="card form-card shadow-lg">
        <div className="card-body">
          <h2 className="text-center mb-4">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="form-control" placeholder="Your Name" required />
            </div>
            <div className="mb-3">
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="form-control" placeholder="Your Email ID" required />
            </div>
            <div className="mb-3">
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                className="form-control" placeholder="Your Phone Number" required />
            </div>
            <div className="mb-3">
              <input type="password" name="password" value={formData.password} onChange={handleChange}
                className="form-control" placeholder="Password" required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
