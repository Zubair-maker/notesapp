import { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const { currentUser, errorDispatch, loading } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [note, setNote] = useState([]);
  const [modelOpen, setModelOpen] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [isSearch, setIsSearch] = useState(false);
  console.log("modelOpen", modelOpen);
  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.user);
      getAllNote();
    }
  }, []);
  useEffect(() => {});
  // useEffect(() => {
  //   getAllNote();
  // }, []);
  const getAllNote = async () => {
    try {
      const resp = await axios.get(`http://localhost:8083/api/note/all`, {
        withCredentials: true,
      });
      if (resp.data.statusCode === 401) {
        navigate("/login");
        return;
      }
      if (resp.data.success === false) {
        console.log("allnotes", resp?.data);
        return;
      }
      setNote(resp.data?.notes);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  const handleEdit = (noteData) => {
    console.log("handleedit", noteData);
    setModelOpen({ isShown: true, data: noteData, type: "edit" });
  };
  const handleDelete = async (noteId) => {
    console.log("deleteId", noteId);
    try {
      const resp = await axios.delete(
        `http://localhost:8083/api/note/delete/${noteId}`,
        { withCredentials: true }
      );
      if (!resp.data.success) {
        toast.error(resp.data.message);
        return;
      }
      toast.success(resp.data.message);
      getAllNote();
    } catch (error) {
      console.log("delid", error);
    }
  };
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNote();
  };
  const onSearchNote = async (query) => {
    try {
      const resp = await axios.get(`http://localhost:8083/api/note/search/`, {
        params: { query },
        withCredentials: true,
      });
      if (!resp.data.success) {
        toast.error(resp.data.message);
        return;
      }
      setNote(resp.data.notes);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  const updateIsPinned = async ({ isPinned, _id }) => {
    console.log("isp", isPinned, _id);

    try {
      const resp = await axios.put(
        `http://localhost:8083/api/note/update-note-pinned/${_id}`,
        { isPinned: !isPinned },
        { withCredentials: true }
      );
      if (!resp.data.success) {
        toast.error(resp.data.message);
        return;
      }
      toast.success(resp.data.message);
      getAllNote();
    } catch (error) {
      toast.error(error);
      if (error.response?.status === 403) {
        window.location.href = "/login";
      } else {
        // Handle other errors
        toast.error(
          "An error occurred: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };
  return (
    <>
      <NavBar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 
       max-md:m-5 mb-3
       "
        >
          {note?.length > 0
            ? note?.map((n) => (
                <>
                  <NoteCard
                    key={n?._id}
                    title={n?.title}
                    date={n?.createdAt}
                    content={n?.content}
                    tags={n?.tags || []}
                    isPinned={n?.isPinned}
                    onEdit={() => {
                      handleEdit(n);
                    }}
                    onPinNote={() => {
                      updateIsPinned(n);
                    }}
                    onDelete={() => {
                      handleDelete(n?._id);
                    }}
                  />
                </>
              ))
            : "no notes available"}
        </div>
      </div>
      <button
        className="w-14 flex items-center justify-center rounded-2xl
       bg-blue-800 absolute right-10 bottom-8 text-white"
        onClick={() => {
          setModelOpen({ isShown: true, type: "add", data: null });
        }}
      >
        Add+
      </button>

      <Modal
        isOpen={modelOpen.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel=""
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white
       rounded-md mx-auto mt-11 p-3 overflow-scroll 
       "
      >
        <AddEditNotes
          onClose={() =>
            setModelOpen({ isShown: false, type: "add", data: null })
          }
          noteData={modelOpen.data}
          type={modelOpen.type}
          getAllNotes={getAllNote}
        />
      </Modal>
    </>
  );
};

export default Home;
