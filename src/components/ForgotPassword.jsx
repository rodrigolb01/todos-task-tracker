import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { forgotPassword, reset } from "../features/auth/authSlice";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            navigate('/signin')
        }

        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);


    const submit = (e) => {
        e.preventDefault();

        const userData =
        {
            email
        }

        dispatch(forgotPassword(userData));
    }

    if (isLoading) {
        return <Spinner />
    }

    if (isSuccess) {
        alert("We have sent a reset password link to " + email + ". Check your email.");
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser>Reset Password</FaUser>
                </h1>
                <h4>We will send you a link to reset your password</h4>
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
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Send reset password link</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default ForgotPassword