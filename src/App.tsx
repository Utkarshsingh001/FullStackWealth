import React from 'react';
import Layout from './components/Layout';
import AssetDashboard from './components/AssetDashboard';
import { AssetProvider } from './context/AssetContext';

function App() {
  return (
    <AssetProvider>
      <Layout>
        <AssetDashboard />
      </Layout>
    </AssetProvider>
  );
}

export default App;