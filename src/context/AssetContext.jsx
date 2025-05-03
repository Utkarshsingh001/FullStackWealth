import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultAsset } from '../types';

const AssetContext = createContext(undefined);

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  
  useEffect(() => {
    const savedAssets = localStorage.getItem('wealthTrackerAssets');
    if (savedAssets) {
      try {
        setAssets(JSON.parse(savedAssets));
      } catch (e) {
        console.error('Failed to parse saved assets', e);
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('wealthTrackerAssets', JSON.stringify(assets));
  }, [assets]);

  const addAsset = () => {
    setAssets(prevAssets => [...prevAssets, { ...defaultAsset }]);
  };

  const updateAsset = (index, field, value) => {
    setAssets(prevAssets => {
      const updated = [...prevAssets];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeAsset = (index) => {
    setAssets(prevAssets => prevAssets.filter((_, i) => i !== index));
  };

  const updateLocalRule = (index, field, value) => {
    setAssets(prevAssets => {
      const updated = [...prevAssets];
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
  
  const getTotalPortfolioValue = () => {
    return assets.reduce((total, asset) => {
      let value = 0;
      
      switch (asset.type) {
        case 'Stocks':
          value = Number(asset.units) * Number(asset.currentPrice) || 0;
          break;
        case 'Crypto':
          value = Number(asset.cryptoUnits) * Number(asset.cryptoCurrentPrice) || 0;
          break;
        case 'Gold':
          value = Number(asset.weight) * Number(asset.goldCurrentPrice) || 0;
          break;
        case 'Property':
          value = Number(asset.marketValue) * (Number(asset.ownershipPercent) / 100) || 0;
          break;
        default:
          value = Number(asset.value) || 0;
      }
      
      return total + value;
    }, 0);
  };
  
  const getTotalInvested = () => {
    return assets.reduce((total, asset) => {
      let invested = 0;
      
      switch (asset.type) {
        case 'Stocks':
          invested = Number(asset.units) * Number(asset.buyPrice) || 0;
          break;
        case 'Crypto':
          invested = Number(asset.cryptoUnits) * Number(asset.cryptoBuyPrice) || 0;
          break;
        case 'Gold':
          invested = Number(asset.weight) * Number(asset.goldBuyPrice) || 0;
          break;
        case 'Property':
          invested = Number(asset.purchasePrice) * (Number(asset.ownershipPercent) / 100) || 0;
          break;
        case 'Mutual Fund':
          invested = Number(asset.totalInvested) || 0;
          break;
        default:
          invested = Number(asset.value) || 0;
      }
      
      return total + invested;
    }, 0);
  };
  
  const getGainLoss = () => {
    return getTotalPortfolioValue() - getTotalInvested();
  };

  return (
    <AssetContext.Provider
      value={{
        assets,
        addAsset,
        updateAsset,
        removeAsset,
        updateLocalRule,
        getTotalPortfolioValue,
        getTotalInvested,
        getGainLoss
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};