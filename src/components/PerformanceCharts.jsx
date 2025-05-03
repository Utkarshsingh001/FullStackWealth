import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PerformanceCharts = ({ assetAllocation = {}, liabilityBreakdown = {}, monthlyData = [] }) => {
  const hasAssetData = Object.keys(assetAllocation).length > 0;
  const hasLiabilityData = Object.keys(liabilityBreakdown).length > 0;
  const hasMonthlyData = monthlyData.length > 0;

  // Default data for empty states
  const defaultAssetAllocation = {
    'Mutual Fund': 40,
    'Stocks': 30,
    'FD': 20,
    'Gold': 10
  };

  const defaultLiabilityBreakdown = {
    'Home Loan': 60,
    'Personal Loan': 25,
    'Credit Card': 15
  };

  const defaultMonthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Assets',
        data: [1000000, 1050000, 1100000, 1150000, 1200000, 1250000],
        borderColor: 'rgba(16, 185, 129, 0.3)',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        fill: true,
      },
      {
        label: 'Liabilities',
        data: [500000, 490000, 480000, 470000, 460000, 450000],
        borderColor: 'rgba(239, 68, 68, 0.3)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        fill: true,
      }
    ]
  };

  // Asset Allocation Chart Data
  const assetAllocationData = {
    labels: hasAssetData ? Object.keys(assetAllocation) : Object.keys(defaultAssetAllocation),
    datasets: [
      {
        data: hasAssetData ? Object.values(assetAllocation) : Object.values(defaultAssetAllocation),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // blue
          'rgba(168, 85, 247, 0.8)',  // purple
          'rgba(16, 185, 129, 0.8)',  // emerald
          'rgba(245, 158, 11, 0.8)',  // amber
          'rgba(99, 102, 241, 0.8)',  // indigo
          'rgba(249, 115, 22, 0.8)',  // orange
          'rgba(107, 114, 128, 0.8)', // gray
        ],
        borderWidth: 1,
      },
    ],
  };

  // Liability Breakdown Chart Data
  const liabilityBreakdownData = {
    labels: hasLiabilityData ? Object.keys(liabilityBreakdown) : Object.keys(defaultLiabilityBreakdown),
    datasets: [
      {
        data: hasLiabilityData ? Object.values(liabilityBreakdown) : Object.values(defaultLiabilityBreakdown),
        backgroundColor: [
          'rgba(168, 85, 247, 0.8)',  // purple
          'rgba(59, 130, 246, 0.8)',  // blue
          'rgba(16, 185, 129, 0.8)',  // emerald
          'rgba(249, 115, 22, 0.8)',  // orange
          'rgba(99, 102, 241, 0.8)',  // indigo
          'rgba(107, 114, 128, 0.8)', // gray
        ],
        borderWidth: 1,
      },
    ],
  };

  // Monthly Performance Chart Data
  const monthlyPerformanceData = hasMonthlyData ? {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Assets',
        data: monthlyData.map(d => d.assets),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
      {
        label: 'Liabilities',
        data: monthlyData.map(d => d.liabilities),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
    ],
  } : defaultMonthlyData;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgb(148, 163, 184)',
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
        },
      },
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
        },
      },
    },
  };

  const EmptyOverlay = ({ message }) => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 dark:bg-slate-900/30 backdrop-blur-[1px] rounded-lg">
      <p className="text-sm text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-4 py-2 rounded-full">
        {message}
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700 relative">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">Asset Allocation</h3>
        <div className="h-64">
          <Doughnut data={assetAllocationData} options={chartOptions} />
        </div>
        {!hasAssetData && <EmptyOverlay message="Add assets to see allocation" />}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700 relative">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">Liability Breakdown</h3>
        <div className="h-64">
          <Doughnut data={liabilityBreakdownData} options={chartOptions} />
        </div>
        {!hasLiabilityData && <EmptyOverlay message="Add liabilities to see breakdown" />}
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700 relative">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">Monthly Performance</h3>
        <div className="h-64">
          <Line data={monthlyPerformanceData} options={chartOptions} />
        </div>
        {!hasMonthlyData && <EmptyOverlay message="Add transactions to see performance" />}
      </div>
    </div>
  );
};

export default PerformanceCharts;