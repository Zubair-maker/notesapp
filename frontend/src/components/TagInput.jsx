/* eslint-disable react/prop-types */
import React, { useState } from "react";

const TagInput = ({ tags = [], setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleRemoveTag = (index) => {
    const removeTag = tags?.filter((tag, ind) => ind !== index);
    setTags(removeTag);
    setInputValue("");
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm
               text-slate-900 bg-slate-300 px-3 py-1 rounded-full"
            >
              # {tag}
              <button onClick={() => handleRemoveTag(tag)}>x</button>
            </span>
          ))}
        </div>
      )}

      <div>
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-1 rounded
           outline-none w-28"
          value={inputValue}
          placeholder="Add Tags"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-1 px-2 bg-slate-300"
          onClick={() => {
            addNewTag();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TagInput;
