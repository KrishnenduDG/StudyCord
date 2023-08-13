import { useEffect, useState,useRef } from "react";
import { Navigate } from "react-router";

import { RoomsServiceInstance } from "../services";
import { useAuth0 } from "@auth0/auth0-react";

// Local imports
import RoomCard from "../components/Rooms/RoomCard";
import CreateCard from "../components/Rooms/RoomCreate";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  const codeRef = useRef();

  useEffect(() => {
    if (!isAuthenticated) return <Navigate to="/" />;

    RoomsServiceInstance.getRoomsByUser(user.sub).then((rooms) => {
      setRooms(rooms.map((room) => room.data));
    });
  }, []);

  const handleJoinRequest = async (e) => {
    e.preventDefault();

    const room = await RoomsServiceInstance.getRoomById(codeRef.current.value);

    console.log(room.room.data.members);

    if(room.status){
      if (room.room.data.members.indexOf(user.sub) !== -1)
        alert("You are already in the team!");
      else
        RoomsServiceInstance.addMemberToRoom(codeRef.current.value, user.sub);

      return <Navigate to={`/room/${codeRef.current.value}`} />
    }else{
      alert("Something went wrong");
    }
  }

  return (
    <>
      <div className="w-full px-3 py-3 ml-auto flex flex-row justify-end">
        <CreateCard />
      </div>

      <div>
        <form onSubmit={handleJoinRequest}>
          <input type="text" ref={codeRef} />
          <button type="submit" className="bg-green-800">Join Room</button>
        </form>
      </div>
      <div className="flex flex-wrap justify-center gap-3 p-7">
        {rooms.length === 0 ? (
          <>No Rooms Available!</>
        ) : (
          <>
            {rooms.map((room) => (
              <RoomCard
                id={room.room_id}
                name={room.name}
                img={room.img}
                tags={room.tags}
                members={room.members}
                owner_id={room.owner_id}
                owner_name={room.owner_name}
                key={room.room_id}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Rooms;
