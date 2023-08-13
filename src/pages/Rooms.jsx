import { CornerDownRight, Info } from "lucide-react";

import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router";

import { RoomsServiceInstance } from "../services";
import { useAuth0 } from "@auth0/auth0-react";

// Local imports
import RoomCard from "../components/Rooms/RoomCard";
import CreateCard from "../components/Rooms/RoomCreate";

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const { isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();

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

        if (room.status) {
            if (room.room.data.members.indexOf(user.sub) !== -1)
                alert("You are already in the team!");
            else
                RoomsServiceInstance.addMemberToRoom(codeRef.current.value, user.sub);

            return navigate(`/room/${codeRef.current.value}`)
        } else {
            alert("Something went wrong");
        }
    }

    return (
        <>
            <div className="w-full px-3 py-3 ml-auto flex flex-row justify-between">
                <form onSubmit={handleJoinRequest} className="flex flex-row justify-center items-center">
                    <input type="text" ref={codeRef}
                        placeholder="Paste Link Here.."
                        className=" bg-transparent w-96 p-1 px-4 text-neutral-400 rounded-l-full border-[1px] border-neutral-400 focus:outline-white focus:border-zinc-500"
                    />
                    <button type="submit" className="bg-cyan-600 rounded-r-full px-3 flex flex-row justify-center py-[3px] items-center text-lg  text-white"><CornerDownRight size={16} /> Join Room</button>

                    <div className="relative">
                        <Info className="peer ml-2 w-5 text-neutral-600 hover:text-neutral-400" />
                        <div className="absolute hidden peer-hover:flex hover:flex  flex-col bg-zinc-800 drop-shadow-lg p-3 border-[0.5px] border-neutral-400
                         text-neutral-400 rounded-lg w-64 -top-5 -left-10
                        ">
                            Connect to Room Creator to get the Joining Code
                        </div>
                    </div>
                </form>
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
