import {useState, useEffect, Suspense, lazy} from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx"; 
import Footer from "./Components/Footer.jsx"; 
import { DonorProvider } from "./context/DonorContext"; 

const Home     = lazy(() => import('./Components/HomeComponent/Home.jsx'));
const Aboutus  = lazy(() => import('./Components/AboutusComponent/Aboutus.jsx'));
const DonateRegisterPage  = lazy(() => import('./Components/DonateRegisterComponent/DonateRegisterPage.jsx'));
const ErrorPage  = lazy(() => import('./Components/errorpage/404.jsx'));
const DonorList  = lazy(() => import('./Components/DonorsLists/DonorList.jsx'));


const LazyLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
};

function App() {  

  return (
    <DonorProvider> 
      <Router>
        <div className="App">
          <Navbar/> 
          <PageLoader>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<DonateRegisterPage />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/Lists" element={<DonorList />} />
              <Route path="*" element={<ErrorPage/> } />
            </Routes>
          </PageLoader>
          <Footer/>
        </div>
      </Router>
    </DonorProvider>
  )
}

function PageLoader({ children }) {
  // console.warn(children)
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // console.warn(location)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loading ? <LazyLoader /> : children;
}


export default App;
