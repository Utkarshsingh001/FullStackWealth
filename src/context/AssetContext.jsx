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

  const convertToCash = (index) => {
    setAssets(prevAssets => {
      const updated = [...prevAssets];
      const asset = updated[index];
      const currentValue = getAssetValue(asset);
      
      // Find bank account or create one if it doesn't exist
      let bankAccountIndex = updated.findIndex(a => a.type === 'Bank Account');
      if (bankAccountIndex === -1) {
        updated.push({
          ...defaultAsset,
          name: 'Primary Bank Account',
          type: 'Bank Account',
          value: '0'
        });
        bankAccountIndex = updated.length - 1;
      }

      // Update bank account value
      updated[bankAccountIndex] = {
        ...updated[bankAccountIndex],
        value: (Number(updated[bankAccountIndex].value) + currentValue).toString()
      };

      // Mark asset as liquidated
      updated[index] = {
        ...asset,
        isLiquidated: true,
        liquidatedValue: currentValue.toString(),
        liquidatedDate: new Date().toISOString()
      };

      return updated;
    });
  };
  
  const getAssetValue = (asset) => {
    switch (asset.type) {
      case 'Stocks':
        return Number(asset.units) * Number(asset.currentPrice) || 0;
      case 'Crypto':
        return Number(asset.cryptoUnits) * Number(asset.cryptoCurrentPrice) || 0;
      case 'Gold':
        return Number(asset.weight) * Number(asset.goldCurrentPrice) || 0;
      case 'Property':
        return Number(asset.marketValue) * (Number(asset.ownershipPercent) / 100) || 0;
      default:
        return Number(asset.value) || 0;
    }
  };
  
  const getTotalPortfolioValue = () => {
    return assets.reduce((total, asset) => {
      if (asset.isLiquidated) return total;
      return total + getAssetValue(asset);
    }, 0);
  };
  
  const getTotalInvested = () => {
    return assets.reduce((total, asset) => {
      if (asset.isLiquidated) return total;
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
        convertToCash,
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