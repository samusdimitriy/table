import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AccountsTable from './AccountsTable';
import ProfilesTable from './ProfilesTable';
import CampaignsTable from './CampaignsTable';
import { TailSpin } from 'react-loader-spinner';

function App() {
  return (
    <Router>
      <Suspense fallback={<TailSpin color="#00BFFF" height={80} width={80} />}>
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
