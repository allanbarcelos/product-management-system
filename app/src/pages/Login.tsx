import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import AuthFormContainer from '@components/AuthFormContainer';
import { useDispatch } from 'react-redux';
import { setBackgroundColor } from '@features/background/backgroundSlice';
import { toastr } from '@utils/toastr';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      toastr('error', `Login failed: ${error}`);
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
      className="col-lg-5"
      footer={
        <div className="small">
          <a href="/register">Need an account? Sign up!</a>
        </div>
      }>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input className="form-control" id="inputEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
          <label htmlFor="inputEmail">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" id="inputPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <label htmlFor="inputPassword">Password</label>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
          <a className="small" href="/forgot-password">Forgot Password?</a>
          <button className="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
    </AuthFormContainer >


  );
};

export default Login;