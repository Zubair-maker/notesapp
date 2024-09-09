import { getNameTwoWords } from "../utils/constant";

const ProfileInfo = ({onLogout}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-10  flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getNameTwoWords("Zubair Khan")}
      </div>
      <div>
        <p className="text-sm font-medium">Zubair</p>
      </div>
      <button
       className="text-sm bg-red-600 p-1 rounded-md text-white "
       onClick={onLogout}
       >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
