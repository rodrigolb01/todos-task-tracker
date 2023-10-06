import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { resetPassword, reset } from "../features/auth/authSlice";

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { id, token } = useParams();
    const { isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            alert("password reseted. You can now log in")
            navigate('/signin')
        }

        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);


    const submit = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword || password !== confirmPassword) {
            alert("make sure the passwords match");
            return;
        }

        const userData =
        {
            id,
            token,
            password
        }

        dispatch(resetPassword(userData));
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser>Reset Password</FaUser>
                </h1>
                <h4>Enter your new password</h4>
            </section>
            <section>
                <form onSubmit={submit}>
                    <div className="form-group" >
                        <label>New password</label>
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
                        <label>Confirm new password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword" name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm your new password"
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Reset Password</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default ResetPassword