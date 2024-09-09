import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {};
  const onClearSearch = () => {
    setSearchQuery("");
  };

  const onLogout = () => {
    navigate("/login");
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
      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default NavBar;
