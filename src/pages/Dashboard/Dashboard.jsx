import React from "react";
import { useAssets } from "../../context/AssetContext";
import { useLiabilities } from "../../context/LiabilityContext";
import AssetCard from "../../components/assets/AssetCard";
import LiabilityCard from "../../components/LiabilityCard";
import PerformanceCharts from "../../components/PerformanceCharts";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  const { assets, getTotalPortfolioValue, getTotalInvested, getGainLoss } =
    useAssets();

  const { liabilities, getTotalLiabilities, getTotalEMI, getUpcomingPayments } =
    useLiabilities();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getNetWorth = () => {
    return getTotalPortfolioValue() - getTotalLiabilities();
  };

  const getAssetAllocation = () => {
    const allocation = {};
    assets.forEach((asset) => {
      if (!allocation[asset.type]) {
        allocation[asset.type] = 0;
      }
      allocation[asset.type] += Number(asset.value) || 0;
    });
    return allocation;
  };

  const getLiabilityBreakdown = () => {
    const breakdown = {};
    liabilities.forEach((liability) => {
      if (!breakdown[liability.type]) {
        breakdown[liability.type] = 0;
      }
      breakdown[liability.type] += Number(liability.outstandingAmount) || 0;
    });
    return breakdown;
  };

  const getDebtToIncomeRatio = () => {
    const monthlyEMI = getTotalEMI();
    const estimatedMonthlyIncome = getTotalInvested() / 12;
    return (monthlyEMI / estimatedMonthlyIncome) * 100;
  };

  const generateMonthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const baseAssetValue = getTotalPortfolioValue() * 0.9;
    const baseLiabilityValue = getTotalLiabilities() * 1.1;

    return months.map((month, index) => ({
      month,
      assets: baseAssetValue * (1 + index * 0.05),
      liabilities: baseLiabilityValue * (1 - index * 0.02),
    }));
  };

  const netWorth = getNetWorth();
  const assetAllocation = getAssetAllocation();
  const liabilityBreakdown = getLiabilityBreakdown();
  const debtToIncomeRatio = getDebtToIncomeRatio();
  const monthlyData = generateMonthlyData();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Dashboard
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Your financial overview and insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Net Worth
              </p>
              <h3
                className={`mt-1 text-xl font-semibold ${
                  netWorth >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {formatCurrency(netWorth)}
              </h3>
            </div>
            <div
              className={`p-3 rounded-full ${
                netWorth >= 0
                  ? "bg-emerald-50 dark:bg-emerald-900/30"
                  : "bg-red-50 dark:bg-red-900/30"
              }`}
            >
              {netWorth >= 0 ? (
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total Assets
              </p>
              <p className="text-sm font-medium text-slate-800 dark:text-white">
                {formatCurrency(getTotalPortfolioValue())}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total Liabilities
              </p>
              <p className="text-sm font-medium text-slate-800 dark:text-white">
                {formatCurrency(getTotalLiabilities())}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Monthly Cash Flow
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">
                {formatCurrency(getTotalEMI())}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Debt-to-Income Ratio
              </p>
              <p
                className={`text-sm font-medium ${
                  debtToIncomeRatio <= 40
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {debtToIncomeRatio.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Portfolio Performance
              </p>
              <h3
                className={`mt-1 text-xl font-semibold ${
                  getGainLoss() >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {formatCurrency(getGainLoss())}
              </h3>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
              <PieChart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Return on Investment
              </p>
              <p
                className={`text-sm font-medium ${
                  getGainLoss() >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {((getGainLoss() / getTotalInvested()) * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <PerformanceCharts
        assetAllocation={assetAllocation}
        liabilityBreakdown={liabilityBreakdown}
        monthlyData={monthlyData}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">
            Asset Allocation
          </h3>
          <div className="space-y-3">
            {Object.entries(assetAllocation).map(([type, value]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      type === "FD"
                        ? "bg-blue-500"
                        : type === "Mutual Fund"
                        ? "bg-purple-500"
                        : type === "Stocks"
                        ? "bg-emerald-500"
                        : type === "Gold"
                        ? "bg-amber-500"
                        : type === "Property"
                        ? "bg-indigo-500"
                        : type === "Crypto"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-800 dark:text-white">
                    {formatCurrency(value)}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    ({((value / getTotalPortfolioValue()) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">
            Liability Breakdown
          </h3>
          <div className="space-y-3">
            {Object.entries(liabilityBreakdown).map(([type, value]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      type === "Credit Card"
                        ? "bg-purple-500"
                        : type === "Personal Loan"
                        ? "bg-blue-500"
                        : type === "Home Loan"
                        ? "bg-emerald-500"
                        : type === "Auto Loan"
                        ? "bg-orange-500"
                        : type === "Student Loan"
                        ? "bg-indigo-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-800 dark:text-white">
                    {formatCurrency(value)}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    ({((value / getTotalLiabilities()) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="p-5 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">
            Recent Assets
          </h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-slate-700">
          {assets.slice(0, 3).map((asset, index) => (
            <div key={index} className="p-5">
              <AssetCard
                asset={asset}
                index={index}
                compact={true}
                isExpanded={false}
                onExpand={() => {}}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="p-5 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">
            Recent Liabilities
          </h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-slate-700">
          {liabilities.slice(0, 3).map((liability, index) => (
            <div key={index} className="p-5">
              <LiabilityCard
                liability={liability}
                onUpdate={() => {}}
                onDelete={() => {}}
                compact={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
