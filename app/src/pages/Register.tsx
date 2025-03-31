import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormContainer from '@components/AuthFormContainer';
import { useDispatch } from 'react-redux';
import { setBackgroundColor } from '@features/background/backgroundSlice';
import axios from 'axios';
import { toastr } from '@utils/toastr';

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { email, password });
      navigate('/login');
    } catch (error) {
      toastr('error', `${error}`);
    }

  };

  // --
  useEffect(() => {
    dispatch(setBackgroundColor('bg-primary'));
    return () => {
      dispatch(setBackgroundColor('bg-white'));
    };
  }, [dispatch]);

  return (
    <AuthFormContainer
      title="Create Account"
      className="col-lg-7"
      footer={
        <div className="small">
          <a href="/login">Have an account? Go to login</a>
        </div>
      }>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-floating mb-3 mb-md-0">
              <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />
              <label htmlFor="inputFirstName">First name</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
              <label htmlFor="inputLastName">Last name</label>
            </div>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" id="inputEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
          <label htmlFor="inputEmail">Email address</label>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-floating mb-3 mb-md-0">
              <input className="form-control" id="inputPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
              <label htmlFor="inputPassword">Password</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3 mb-md-0">
              <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
              <label htmlFor="inputPasswordConfirm">Confirm Password</label>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-0">
          <div className="d-grid">
            <button className="btn btn-primary btn-block" type="submit">Create Account</button></div>
        </div>
      </form>
    </AuthFormContainer >
  );
};

export default Register;