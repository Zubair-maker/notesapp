import React, { useState } from "react";
import TagInput from "../../components/TagInput";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(["tags1","tags2"]);

  const editNote = async () => {};
  const addNewNote = async () => {};
  const handleAddNote = async () => {
    if (!title) {
      alert("please enter title");
      return;
    }
    if (!content) {
      alert("please enter content");
      return;
    }
    if (tags === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sm ">Add Notes</p>
        <button className="" onClick={onClose}>
          x
        </button>
      </div>

      <div className="">
        <label className="text-xs text-slate-400 font-medium ">Title</label>
        <input
          type="text"
          className="input-box py-0 mb-1 bg-slate-50 "
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="">
        <label
          className="text-xs 
         text-slate-400 font-medium "
          placeholder="Wake up at 6 a.m."
        >
          Content
        </label>
        <textarea
          type="text"
          rows={2}
          value={content}
          placeholder="Content..."
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded 
          w-full"
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div>
        <label className="text-xs text-red-300 uppercase">tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <div>
        <button
          className="btn-primary font-medium mt-2 p-0 mb-0"
          onClick={handleAddNote}
        >
          {type === "edit" ? "UPDATE" : "ADD"}
        </button>
      </div>
    </>
  );
};

export default AddEditNotes;
