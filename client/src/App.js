import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import NavTabs from './components/NavTabs';


function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'About') {
      return <About />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
  }
  const handlePageChange = (page) => setCurrentPage(page);
  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      <Header />
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
      <Footer/>
    </div>
  );
}
export default App;
