import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultLiability } from '../types';

const LiabilityContext = createContext(undefined);

export const LiabilityProvider = ({ children }) => {
  const [liabilities, setLiabilities] = useState([]);
  
  useEffect(() => {
    const savedLiabilities = localStorage.getItem('wealthTrackerLiabilities');
    if (savedLiabilities) {
      try {
        setLiabilities(JSON.parse(savedLiabilities));
      } catch (e) {
        console.error('Failed to parse saved liabilities', e);
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('wealthTrackerLiabilities', JSON.stringify(liabilities));
  }, [liabilities]);

  const addLiability = () => {
    setLiabilities(prev => [...prev, { ...defaultLiability }]);
  };

  const updateLiability = (index, field, value) => {
    setLiabilities(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeLiability = (index) => {
    setLiabilities(prev => prev.filter((_, i) => i !== index));
  };

  const updateLocalRule = (index, field, value) => {
    setLiabilities(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        localRule: {
          ...updated[index].localRule,
          [field]: value
        }
      };
      return updated;
    });
  };
  
  const getTotalLiabilities = () => {
    return liabilities.reduce((total, liability) => total + Number(liability.outstandingAmount), 0);
  };
  
  const getTotalEMI = () => {
    return liabilities.reduce((total, liability) => total + Number(liability.monthlyInstallment), 0);
  };
  
  const getUpcomingPayments = () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return liabilities.filter(liability => {
      const nextPayment = new Date(liability.nextPaymentDate);
      return nextPayment >= today && nextPayment <= thirtyDaysFromNow;
    });
  };

  return (
    <LiabilityContext.Provider
      value={{
        liabilities,
        addLiability,
        updateLiability,
        removeLiability,
        updateLocalRule,
        getTotalLiabilities,
        getTotalEMI,
        getUpcomingPayments
      }}
    >
      {children}
    </LiabilityContext.Provider>
  );
};

export const useLiabilities = () => {
  const context = useContext(LiabilityContext);
  if (context === undefined) {
    throw new Error('useLiabilities must be used within a LiabilityProvider');
  }
  return context;
};