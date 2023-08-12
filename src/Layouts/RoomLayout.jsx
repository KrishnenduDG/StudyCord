import { Outlet } from 'react-router-dom';
import Sidebar from "../components/Sidebar/Sidebar";

const RoomLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}

export default RoomLayout