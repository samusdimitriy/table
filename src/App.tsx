import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AccountsTable from './AccountsTable';
import ProfilesTable from './ProfilesTable';
import CampaignsTable from './CampaignsTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/campaigns/:profileId" element={<CampaignsTable />} />
        <Route path="/profiles/:accountId" element={<ProfilesTable />} />
        <Route path="/" element={<AccountsTable />} />
      </Routes>
    </Router>
  );
}

export default App;
