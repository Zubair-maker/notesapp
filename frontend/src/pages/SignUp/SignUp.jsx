import { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/constant";
import ErrorMessage from "../../components/ErrorMessage";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) setError("Invalid email");
      if (!validateName(name))
        setName(
          "Name between 2 and 30 characters and contain only letters and spaces"
        );
      if (!validatePassword(password))
        setPassword("Password at least one letter and one number");

      const resp = await axios.post(
        `http://localhost:8083/api/auth/signup`,
        {
          username: name,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (resp.data.success === false) {
        console.log("error on signup");
        setError(resp.data.message);
        return;
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="bg-white px-7 py-5 w-96">
        <form onSubmit={handleSignUp}>
          <h4 className="texr-2xl mb-6">SignUp</h4>
          <input
            type="text"
            placeholder="name"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <ErrorMessage message={error} />
          <button type="submit" className="btn-primary mt-3">
            SignUp
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?
            <Link
              className="font-medium text-[#2B85FF] underline"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
