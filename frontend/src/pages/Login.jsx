import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, autoClose} from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

const [errorValue, setErrorValue] = useState('')


  const { pathname } = useLocation();

  const { email, password } = FormData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setErrorValue(message) 
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and set some goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
        {errorValue && (<p style={{ backgroundColor: 'red', opacity: '0.5', border: '2px brown solid', borderRadius: '10px', width: 'auto', color: 'white' }}>{errorValue}</p>)}
      </section>
    </>
  );
}

export default Login;

//
// {"_id":"622ee38d0593382284bb8876","name":"Taavish","email":"tavish@a.com","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmVlMzhkMDU5MzM4MjI4NGJiODg3NiIsImlhdCI6MTY0NzI0MDA3OCwiZXhwIjoxNjQ5ODMyMDc4fQ.wrsdotJXkPvscaM-3_UGF2NbB-oBaYCHuliPnfrp5LI"}
