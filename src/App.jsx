import { Routes, Route,Navigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import MainLayout from "./Layouts/MainLayout";
import RoomLayout from "./Layouts/RoomLayout";

// Pages Import
import HomePage from "./pages/HomePage";
import Rooms from "./pages/Rooms";


function App() {
  const {isLoading} = useAuth0();

  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/" element={<MainLayout />}>
<<<<<<< HEAD
=======
        {/* These will later be wrapped inside a Protected Route */}
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/create" element={<h1>Create a Room Page</h1>} />
>>>>>>> 6e28b3aab82dc21daa70c97302d1180d47ef836d

        <Route path="rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<RoomLayout />}>
          <Route index element={<h1>Hello</h1>} />
        </Route>
      </Route>


      {/* Error Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
