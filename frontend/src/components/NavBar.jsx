/* eslint-disable react/prop-types */
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signOutFailure,
  signOutp,
} from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      dispatch(signOutp());
      const resp = await axios.get(`http://localhost:8083/api/auth/signout`, {
        withCredentails: true,
      });
      if (!resp.data.success) {
        dispatch(signOutFailure(resp.data.message));
        toast.error(resp.data.message)
        return;
      }
      dispatch(signInSuccess());
      toast.success(resp.data.message)
      navigate("/login");
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };
  return (
    <div className="bg-white flex justify-between items-center px-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        <span className="text-slate-600">Good</span>
        <span className="text-slate-900">Notes</span>
      </h2>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default NavBar;
