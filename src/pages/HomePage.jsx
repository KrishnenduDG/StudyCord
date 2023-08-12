import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { LogIn } from "lucide-react";

const HomePage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className="h-[100vh] flex justify-center flex-col items-center">
      {!isAuthenticated ? (
        <button
          className="rounded-full
                                hover:opacity-80
                                bg-grey-800
                                font-bold
                                text-neutral-200
                                bg-cyan-600
                                shadow-cyan-400
                                shadow-sm
                                p-1 px-4
                                border-3
                                border-white
                                flex flex-row gap-3 items-center"
          onClick={() => loginWithRedirect()}
        >
          <LogIn size={18} />
          Log In
        </button>
      ) : (
        <Navigate to="/rooms" />
      )}
    </div>
  );
};

export default HomePage;
