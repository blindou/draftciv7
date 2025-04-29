import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateDraft from './pages/CreateDraft';
import Draft from './pages/Draft';
import JoinDraft from './pages/JoinDraft';
import DraftBoard from './components/DraftBoard/DraftBoard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<CreateDraft />} />
          <Route path="/draft/:draftId" element={<Draft />} />
          <Route path="/join/:draftId" element={<JoinDraft />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;