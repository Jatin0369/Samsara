import React from 'react'
import { Suspense, lazy } from 'react';
import ProtectedComponent from "../src/AdminPanel/ProtectedComponent";

import CustomLoading from './CustomLoading'; // Import the custom spinner
import DelayedFallback from './DelayedFallback'; // Import the delay wrapper

import {Route, Routes} from 'react-router-dom';
// import TourDetails from './Tour/TourDetails';
const TourDetails = lazy(() => import('./Tour/TourDetails'))
// import AboutUs from './AboutUs/AboutUs';
const AboutUs = lazy(() => import('./AboutUs/AboutUs'))
import Home from './Home/Home'
// import Contact from './Contact/Contact';
const Contact = lazy(() => import('./Contact/Contact'))
// import Tour from './Tour/Tour'
const Tour = lazy(() => import('./Tour/Tour'))
// import Blogpage from './BlogPage/Blogpage';
const Blogpage = lazy(() => import('./BlogPage/Blogpage'))
// import Admin from './AdminPanel/Admin';
const Admin = lazy(() => import('./AdminPanel/Admin'))
// import NewTour from './AdminPanel/NewTour';
const NewTour = lazy(() => import('./AdminPanel/NewTour'))
// import BlogDetails from './BlogPage/BlogDetails';
const BlogDetails = lazy(() => import('./BlogPage/BlogDetails'))
// import NewBlog from './AdminPanel/NewBlog';
const NewBlog = lazy(() => import('./AdminPanel/NewBlog'))
import ScrollToTop from './ScrollToTop';
// import Login from './AdminPanel/Login';
const ModifyTour = lazy(() => import('./AdminPanel/ModifyTour'))
const ModifyBlog = lazy(() => import('./AdminPanel/ModifyBlog'))
const Login = lazy(() => import('./AdminPanel/Login'))
// import ModifyBlog from './AdminPanel/ModifyBlog';

function RouteName() {
  return (
    <>
    <ScrollToTop />
    <Suspense fallback={<DelayedFallback delay={300}>
      <CustomLoading />
    </DelayedFallback>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/tour' element={<Tour />} />
          <Route path='/tourdetails/:id' element={<TourDetails />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/blog' element={<Blogpage />} />
          <Route path='/admin' element={<ProtectedComponent element={<Admin />} />} />
          <Route path='/newtour' element={<ProtectedComponent element={<NewTour />} />} />
          <Route path='/blogdetail/:id' element={<BlogDetails />} />
          <Route path='/newblog' element={<ProtectedComponent element={<NewBlog />} />} />
          <Route path='/modifyblog' element={<ProtectedComponent element={<ModifyBlog />} />} />
          <Route path='/modifytour' element={<ProtectedComponent element={<ModifyTour />} />} />
          <Route path='/loginforadminacess' element={<Login />} />
        </Routes>
      </Suspense>
</>
  )
}

export default RouteName