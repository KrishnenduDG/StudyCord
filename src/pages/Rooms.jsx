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
  }, [rooms]);

  // const handleJoinRequest = async () => {
  //   const 
  // }

  return (
    <>
      <div className="w-full px-3 py-3 ml-auto flex flex-row justify-end">
        <CreateCard />
      </div>

      {/* <div> */}
        {/* <form onSubmit={handleJoinRequest}>
          <input type="text" ref={codeRef} />
          <button type="submit">Join Room</button>
        </form>
      </div> */}
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
