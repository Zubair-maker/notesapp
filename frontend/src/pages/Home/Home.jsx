import { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser, errorDispatch, loading } = useSelector(
    (state) => state.user
  );
  const navivage = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const [modelOpen, setModelOpen] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navivage("/");
    } else {
      setUserInfo(currentUser?.user);
    }
  }, []);
  return (
    <>
      <NavBar userInfo={userInfo} />
      <div className="container mx-auto">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 
       max-md:m-5 mb-3
       "
        >
          <NoteCard
            title={"title"}
            date={"12-5-2024"}
            content={"sbndjsdsndknwkdnwkndknw wkdnwkndkwdkwndknwkd"}
            tags={"meeting aekefke"}
            isPinned={true}
            onEdit={() => {}}
            onPinNote={() => {}}
            onDelete={() => {}}
          />
          <NoteCard
            title={"title"}
            date={"12-5-2024"}
            content={"sbndjsdsndknwkdnwkndknw wkdnwkndkwdkwndknwkd"}
            tags={"meeting aekefke"}
            isPinned={true}
            onEdit={() => {}}
            onPinNote={() => {}}
            onDelete={() => {}}
          />
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
        />
      </Modal>
    </>
  );
};

export default Home;
