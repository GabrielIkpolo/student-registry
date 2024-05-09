import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ErrorPage from './pages/ErrorPage';
import HeadNav from './components/HeadNav.jsx';
import Footer from './components/Footer.jsx';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';


const Wrapper = ({ children }) => {
  return (
    <div className="wrapper">
      {children}
    </div>
  );
}

const HeadAndFooter = () => {
  return (
    <>
      <HeadNav />
      <Wrapper>
        <Toaster />
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  );
}

const clearance = [0, 1, 3];
const clearanceTwo = [2];

const guide = createBrowserRouter([
  {
    path: '/', element: <HeadAndFooter />,
    children: [
      { path: '/', element: <Home /> },

      {
        path: '/admin', element: (
          <ProtectedRoute role={clearanceTwo} >
            <AdminDashboard />
          </ProtectedRoute>
        )
      },

      {
        path: "/manager", element: <Login />
      },

      { path: '*', element: <ErrorPage /> }
    ]
  },



]);

function App() {

  return (
    <>
      <AuthProvider >
        <RouterProvider router={guide} />
      </AuthProvider>
    </>
  )
}

export default App
