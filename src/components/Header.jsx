import PropTypes from "prop-types";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) =>  state.auth)

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">Goal Setter</Link>
        </div>
        <ul>
          {user ?
            (
              <>
              <li>
                <button className="btn" onClick={onLogout}>
                  <FaSignOutAlt/>Sign out
                </button>
              </li>
              </>
            ) :
            (
              <>
                <li>
                  <Link to="/signin">
                    <FaSignInAlt /> Sign in
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <FaUser /> Sign up
                  </Link>
                </li>
              </>
            )}

        </ul>
      </header>
    </>
  )
};

export default Header;
