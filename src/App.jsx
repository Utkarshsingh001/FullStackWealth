import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AssetDashboard from './components/AssetDashboard';
import LiabilityDashboard from './components/LiabilityDashboard';
import GoalsDashboard from './components/GoalsDashboard';
import GlobalRules from './components/GlobalRules';
import { AssetProvider } from './context/AssetContext';
import { LiabilityProvider } from './context/LiabilityContext';
import { GlobalRulesProvider } from './context/GlobalRulesContext';
import { GoalsProvider } from './context/GoalsContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLogin = () => {
    console.log('Logging in...');
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    console.log('Registering...');
    setIsRegistered(true);
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <GlobalRulesProvider>
          <GoalsProvider>
            <AssetProvider>
              <LiabilityProvider>
                <Routes>
                  <Route 
                    path="/" 
                    element={<Navigate to="/dashboard" replace />} 
                  />

                  <Route 
                    path="/login" 
                    element={
                      isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                      ) : (
                        <Login onLogin={handleLogin} />
                      )
                    } 
                  />
                  
                  <Route 
                    path="/register" 
                    element={
                      isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                      ) : (
                        <Register onRegister={handleRegister} />
                      )
                    } 
                  />

                  <Route
                    path="/dashboard"
                    element={
                      isAuthenticated ? (
                        <Layout>
                          <Dashboard />
                        </Layout>
                      ) : (
                        <Navigate to={isRegistered ? "/login" : "/register"} replace />
                      )
                    }
                  />

                  <Route
                    path="/assets"
                    element={
                      isAuthenticated ? (
                        <Layout>
                          <AssetDashboard />
                        </Layout>
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />

                  <Route
                    path="/liabilities"
                    element={
                      isAuthenticated ? (
                        <Layout>
                          <LiabilityDashboard />
                        </Layout>
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />

                  <Route
                    path="/goals"
                    element={
                      isAuthenticated ? (
                        <Layout>
                          <GoalsDashboard />
                        </Layout>
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />

                  <Route
                    path="/rules"
                    element={
                      isAuthenticated ? (
                        <Layout>
                          <GlobalRules />
                        </Layout>
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />

                  {/* Placeholder routes for other sections */}
                  {['/beneficiary', '/transfer'].map(path => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        isAuthenticated ? (
                          <Layout>
                            <div className="text-center py-12">
                              <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
                                Coming Soon
                              </h2>
                              <p className="mt-2 text-slate-600 dark:text-slate-400">
                                This feature is under development
                              </p>
                            </div>
                          </Layout>
                        ) : (
                          <Navigate to="/login" replace />
                        )
                      }
                    />
                  ))}
                </Routes>
              </LiabilityProvider>
            </AssetProvider>
          </GoalsProvider>
        </GlobalRulesProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;