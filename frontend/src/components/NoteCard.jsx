/* eslint-disable react/prop-types */
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  isPinned,
  onPinNote,
  content,
  onEdit,
  onDelete,
  tags,
  date,
  title,
}) => {
  return (
    <div className="border rounded bg-white hover:shadow-xl p-1">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-sm text-violet-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          size={14}
          className={`${isPinned ? "text-[#35c97f]" : "text-[#3572c9]"} 
          mb-5 cursor-pointer
          `}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2">{content}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags?.map((tag) => `#${tag} `)}
        </div>
        <div className="flex">
          <div className="flex items-center">
            <MdCreate
              className="mr-1 text-blue-500 cursor-pointer"
              size={12}
              onClick={onEdit}
            />
          </div>
          <div className="flex items-center">
            <MdDelete
              className="text-red-500 cursor-pointer"
              size={12}
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
