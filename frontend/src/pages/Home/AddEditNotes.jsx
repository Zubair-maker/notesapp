/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TagInput from "../../components/TagInput";
import axios from "axios";
import { toast } from "react-toastify";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title || "");
      setContent(noteData.content || "");
      setTags(noteData.tags || []);
      setNoteId(noteData._id || null);
      // console.log("Note ID set:", noteData._id);
    }
  }, [noteData]);
  const editNote = async () => {
    // let noteId = noteData?._id;
    if (!noteId) {
      console.log("Note id is not available");
      return;
    }
    // console.log("Note ID:", noteId);
    try {
      const resp = await axios.post(
        `http://localhost:8083/api/note/edit/${noteId}`,
        { title, tags, content },
        { withCredentials: true }
      );
      if (!resp.data.success) {
        console.log("edit", resp.data.message);
        return;
      }
      toast.success(resp.data.message)
      getAllNotes();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const addNewNote = async () => {
    try {
      const resp = await axios.post(
        `http://localhost:8083/api/note/add`,
        { title, tags, content },
        { withCredentials: true }
      );
      if (!resp.data.success) {
        console.log("anote", resp.data.message);
        return;
      }
      toast.success(resp.data.message)
      getAllNotes();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddNote = () => {
    console.log("riunning");
    if (!title) {
      alert("please enter title");
      return;
    }
    if (!content) {
      alert("please enter content");
      return;
    }
    if (type === "edit") {
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
        <TagInput tags={tags || []} setTags={setTags} />
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
