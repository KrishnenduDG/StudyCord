import { Routes, Route,Navigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import MainLayout from "./Layouts/MainLayout";
import RoomLayout from "./Layouts/RoomLayout";

// Pages Import
import HomePage from "./pages/HomePage";
import Rooms from "./pages/Rooms";
import RoomChatPage from "./pages/RoomChatPage";


function App() {
  const {isLoading} = useAuth0();

  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/" element={<MainLayout />}>

        {/* These will later be wrapped inside a Protected Route */}
        <Route path="rooms" element={<Rooms />} />


        <Route path="rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<div className="overflow-hidden"><RoomLayout /></div>}>
          <Route index element={<RoomChatPage />} />
        </Route>
      </Route>


      {/* Error Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
