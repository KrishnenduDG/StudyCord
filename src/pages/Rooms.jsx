import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import { RoomsServiceInstance } from "../services";
import { useAuth0 } from "@auth0/auth0-react";

// Local imports
import RoomCard from "../components/Rooms/RoomCard";
import CreateCard from "../components/Rooms/RoomCreate";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) return <Navigate to="/" />;

    RoomsServiceInstance.getRoomsByUser(user.sub).then((rooms) => {
      setRooms(rooms.map((room) => room.data));
    });
  }, []);

  return (
    <>
      <div className="w-full px-3 py-3 ml-auto flex flex-row justify-end">
        <CreateCard />
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
