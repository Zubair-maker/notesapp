import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center bg-transparent border-[1.2px] rounded px-4">
      <input
        type={showPassword ? "text" : "password"}
        className="w-full text-sm bg-transparent py-3 mr-2 rounded outline-none"
        value={value}
        placeholder={placeholder || "Password"}
        onChange={onChange}
      />
      {showPassword ? (
        <FaRegEye
          size={22}
          className="text-[#2B85FB] cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-[#2B85FB] cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
