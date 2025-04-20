import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Adjust the import path as needed
import Home from './components/Home';
import PostForm from './components/PostForm';
import SearchAndUpdateForm from './components/SearchAndUpdateForm';
import Study from './components/Study';
import Increment from './components/IncrementForm';
import Leave from './components/LeaveForm';
import Staff from './components/staff';
import ClassDetail from './components/ClassDetail'
import StudentUpdate from './components/Student'
import ClassData from './components/ClassData'
import PDFPreviewPage from './components/PDFPreviewPage';
import Memo from './components/MarksMemo';
import SurrenderLeave from './components/Surrender';
import TenthClassDetail from './components/TenthNr';
import TenthPDF from './components/TenPDFPreviewPage';
import './App.css'; // Import your global styles if any

const App = () => {
    return (
        <Router>
            <div>
                <NavBar /> {/* Fixed Navbar at the top */}
                <div style={{ paddingTop: '64px' }}> {/* Add padding to prevent content from being hidden behind the navbar */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/post" element={<PostForm />} />
                        <Route path="/search" element={<SearchAndUpdateForm />} />
                        <Route path="/docs" element={<Study />} />
                        <Route path="/increment" element={<Increment/>} />
                        <Route path="/leave" element={<Leave/>} />
                        <Route path="/staff" element={<Staff/>} />
                        <Route path="/classes" element={<ClassData/>} />
                        <Route path="/class/:id" element={<ClassDetail />} /> 
                        <Route path="/student/:admNo" element={<StudentUpdate />} />
                        <Route path="/preview" element={<PDFPreviewPage />} />
                        <Route path="/memo" element={<Memo />} />
                        <Route path="/surrender" element={<SurrenderLeave />} />
                        <Route path="/tenth" element={<TenthClassDetail />} />
                        <Route path="/tenth/preview" element={<TenthPDF />} />  
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
