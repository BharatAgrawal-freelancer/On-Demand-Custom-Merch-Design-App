import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Products from "./pages/Products.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import Editor from "./pages/Editor.jsx"
import Community from "./pages/Community.jsx"
import PostDetail from "./pages/PostDetail.jsx"
import Profile from "./pages/Profile.jsx"
import Trending from "./pages/Trending.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Search from "./pages/Search.jsx"
import Cart from "./pages/Cart.jsx"
import NotFound from "./pages/NotFound.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import DesignViewer from "./pages/DesignViewer.jsx"
import LandingPage from "./pages/LandingPage.jsx"
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
 <Route path="/view" element={<DesignViewer />} />
          <Route
            path="/editor/:designId"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />

          <Route path="/community" element={<Community />} />
          <Route path="/community/:postId" element={<PostDetail />} />
          <Route path="/user/:userId" element={<Profile />} />
          <Route path="/trending" element={<Trending />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
