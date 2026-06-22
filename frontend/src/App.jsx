
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import UserLogin from "./pages/Login";

import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

import "quill/dist/quill.snow.css";

function App() {
  const { token } = useAppContext();

  return (
    <div>
      <Toaster />

      <Routes>

        {/* USER LOGIN FIRST */}
        <Route path="/" element={<UserLogin />} />

        {/* HOME AFTER LOGIN */}
        <Route path="/home" element={<Home />} />

        {/* BLOG DETAILS */}
        <Route path="/blog/:id" element={<Blog />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={token ? <Layout /> : <Login />}
        >
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;