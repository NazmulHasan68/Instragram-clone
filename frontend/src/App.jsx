import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "@/pages/Home";
import MainLayout from "./pages/MainLayout";
import Profile from "./pages/Profile";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes wrapped with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> 
          <Route path="/profile/:id" element={<Profile/>} /> 
          <Route path="/account/edit" element={<EditProfile/>} /> 
          <Route path="/chat" element={<ChatPage/>} /> 
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Redirect and 404 */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
