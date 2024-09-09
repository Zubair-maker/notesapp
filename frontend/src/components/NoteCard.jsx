import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import { FaTags } from "react-icons/fa6";

const NoteCard = ({ isPinned, onPinNote, content, onEdit, onDelete, tags,date}) => {
  return (
    <div className="border rounded bg-white hover:shadow-xl p-1">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">notes nkenfkef kdckd</h6>
          <span className="text-sm text-violet-500">12-12-2024</span>
        </div>
        <MdOutlinePushPin
          size={14}
          className={`${isPinned ? "text-[#2B85FF]" : "text-slate-100"} 
          text-[yellow] mb-5 cursor-pointer
          `}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2">
        tenetur dolore, odio soluta corporis cum molestias nulla numquam sint
        dignissimos nihil dolorum. Reprehenderit saepe non culpa, illum maiores
        consectetur unde libero. Laboriosam iste consequatur sed perferendis .
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">#tags</div>
        <div className="flex">
          <div className="flex items-center">
            <MdCreate className="mr-1" size={12} onClick={onEdit} />
          </div>
          <div className="flex items-center ">
            <MdDelete className="" size={12} onClick={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
