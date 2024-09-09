import { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="bg-white px-7 py-5 w-96">
        <form>
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
