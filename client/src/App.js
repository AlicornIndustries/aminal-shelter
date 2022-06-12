import React from "react";

import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                {/* At URL /edit/1234, render the Edit component for record 1234, and so on */}
                <Route exact path="/" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    );
};

export default App;