import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "@/pages/Home";
import MainLayout from "./pages/MainLayout";
import Profile from "./pages/Profile";
import EditProfile from "./components/EditProfile";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlic";
import { setOnlineUsers } from "./redux/chatSlice";
import ChatPage from "./components/ChatPage";
import { setLikeNotification } from "./redux/RTNSlice";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io(`http://localhost:8000`, {
        query: {
          userId: user?.id,
        },
        transports: ["websocket"],
      });

      dispatch(setSocket(socketio));

      // Listen to socket events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute> <MainLayout /></ProtectedRoute> } >
          <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="account/edit" element={<EditProfile />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>

        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Redirect and 404 */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
