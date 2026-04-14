import { useState, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { LazyMotion, domAnimation } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  return (
<LazyMotion features={domAnimation} strict={false}>
      <>
        {user ? (
          <Chat user={user} />
        ) : isLogin ? (
          <Login setUser={setUser} setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
        <Toaster position="top-right" />
      </>
    </LazyMotion>
  );
}

export default App;
