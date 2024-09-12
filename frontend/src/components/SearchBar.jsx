/* eslint-disable react/prop-types */
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-40 sm:w-60 md:w-80 flex  items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <span
          className="text-slate-500 cursor-pointer hover:text-black mr-1 mb-1"
          onClick={onClearSearch}
        >
          x
        </span>
      )}
      <FaMagnifyingGlass
        className="text-slate-500  cursor-pointer hover:text-black mr-3"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
