import { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInP,
  signInSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogIn = async (e) => {
    e.preventDefault();

    //login api
    try {
      dispatch(signInP());
      const resp = await axios.post(
        `http://localhost:8083/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (resp.data.success === false) {
        console.log(resp.data);
        dispatch(signInFailure(resp.data.message));
      }
      dispatch(signInSuccess(resp.data));
      navigate("/");
    } catch (error) {
      console.log("signin", error);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex items-center justify-center mt-12">
      <div className="bg-white px-7 py-5 w-96">
        <form onSubmit={handleLogIn}>
          <h4 className="texr-2xl mb-6">LogIn</h4>
          <input
            type="email"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-primary mt-3">
            LogIn
          </button>

          <p className="text-sm text-center mt-4">
            Not register yet?
            <Link
              className="font-medium text-[#2B85FF] underline"
              to={"/signup"}
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
