import React from 'react';
import PropTypes from 'prop-types';
import { Wallet, CreditCard, AlertTriangle } from 'lucide-react';

const LiabilitySummary = ({ totalLiabilities, monthlyEMI, upcomingPayments }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700 
        transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Outstanding</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">
              {formatCurrency(totalLiabilities)}
            </h3>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-full">
            <Wallet className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700 
        transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Monthly EMI</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">
              {formatCurrency(monthlyEMI)}
            </h3>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
            <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700 
        transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming Payments</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">
              {upcomingPayments.length}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-full">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

LiabilitySummary.propTypes = {
  totalLiabilities: PropTypes.number.isRequired,
  monthlyEMI: PropTypes.number.isRequired,
  upcomingPayments: PropTypes.array.isRequired
};

export default LiabilitySummary;