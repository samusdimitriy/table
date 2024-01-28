import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AccountsTable from './components/AccountsTable';
import ProfilesTable from './components/ProfilesTable';
import CampaignsTable from './components/CampaignsTable';
import { Spinner } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner animation="border" variant="secondary" />}>
        <Routes>
          <Route path="/campaigns/:profileId" element={<CampaignsTable />} />
          <Route path="/profiles/:accountId" element={<ProfilesTable />} />
          <Route path="/" element={<AccountsTable />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
