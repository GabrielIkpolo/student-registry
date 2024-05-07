import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ErrorPage from './pages/ErrorPage';
import HeadNav from './components/HeadNav.jsx';
import Footer from './components/Footer.jsx';


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
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  );
}



const guide = createBrowserRouter([
  {
    path: '/', element: <HeadAndFooter />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/admin', element: <AdminDashboard /> },

      { path: '*', element: <ErrorPage /> }
    ]
  },



]);

function App() {

  return (
    <>
      <RouterProvider router={guide} />
    </>
  )
}

export default App
