import { Link } from "react-router-dom";

//icons
import { ShieldAlert, Users } from "lucide-react";

//Local component import
import Badges from "./Badges";

function RoomCard({ id, name, img, tags, members, owner_id, owner_name }) {
  return (
    <div className="w-64 rounded-md bg-zinc-800 p-4 py-3">
      <Link to={`/room/${id}`}>
        <img src={img} className="rounded-md w-full object-cover h-24" />
        <div className="flex flex-row justify-between items-center">
          <p className="mt-3 text-white text-lg "> {name}</p>
        </div>

        <p className="mt-2 text-sm text-neutral-400 flex flex-row gap-2 items-center ">
          <Users size={16} /> Members : {members.length}
        </p>
        <div className="flex flex-wrap mt-2 px-3">
          {tags.map((tag) => (
            <Badges tag={tag} key={tag} />
          ))}
        </div>

        <p className="mt-4 text-neutral-400 flex flrex-row gap-1 items-center ">
          <ShieldAlert size={18} />
          Created by {owner_name}
        </p>
      </Link>

    </div>
  );
}

export default RoomCard;
