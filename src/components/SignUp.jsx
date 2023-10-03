import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isError, isSuccess, isLoading, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(isError)
    {
      toast.error(message);
    }

    if(isSuccess || user)
    {
      navigate('/')
    }

    dispatch(reset());
  },[user, isError, isSuccess, message, navigate, dispatch]);

  const submit = (e) => {
    e.preventDefault();
    
    if(password !== confirmPassword)
    {
      toast.error('Passwords do not match');
    }
    else
    {
      const userData = {
        email,
        password
      }

      dispatch(register(userData));
    }
  }

  if(isLoading)
  {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser>Sign up</FaUser>
        </h1>
      </section>
      <section>
        <form onSubmit={submit}>
          <div className="form-group" >
            <label>Email</label>
            <input 
            type="text" 
            className="form-control" 
            id="email" name="email" 
            value={email} 
            placeholder="Enter your email" 
            onChange={(e) => setEmail(e.target.value)}>
            </input>
          </div>
          <div className="form-group" >
            <label>Password</label>
            <input 
            type="password" 
            className="form-control" 
            id="password" name="password" 
            value={password} 
            placeholder="Enter your password" 
            onChange={(e) => setPassword(e.target.value)}>
            </input>
          </div>
          <div className="form-group" >
            <label>Confirm Password</label>
            <br />
            <input 
            type="password" 
            className="form-control" 
            id="confirmPassword" name="confirmPassword" 
            value={confirmPassword} 
            placeholder="Enter your password" 
            onChange={(e) => setConfirmPassword(e.target.value)}>
            </input>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Create Account</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default SignUp