import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { calculateEMI, calculateAmortizationSchedule, formatCurrency } from '../../utils/finance';

const LoanCalculator = ({ principal, rate, tenure, onCalculate }) => {
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (principal && rate && tenure) {
      const monthlyEmi = calculateEMI(principal, rate, tenure);
      const amortizationSchedule = calculateAmortizationSchedule(principal, rate, tenure);
      const totalInt = (monthlyEmi * tenure) - principal;

      setEmi(monthlyEmi);
      setSchedule(amortizationSchedule);
      setTotalInterest(totalInt);

      onCalculate?.({
        emi: monthlyEmi,
        totalInterest: totalInt,
        schedule: amortizationSchedule
      });
    }
  }, [principal, rate, tenure, onCalculate]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly EMI</p>
          <p className="text-lg font-semibold text-slate-800 dark:text-white mt-1">
            {formatCurrency(emi)}
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Interest</p>
          <p className="text-lg font-semibold text-slate-800 dark:text-white mt-1">
            {formatCurrency(totalInterest)}
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Payment</p>
          <p className="text-lg font-semibold text-slate-800 dark:text-white mt-1">
            {formatCurrency(emi * tenure)}
          </p>
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {showSchedule ? 'Hide Amortization Schedule' : 'Show Amortization Schedule'}
        </button>

        {showSchedule && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    EMI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Principal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {schedule.map((row) => (
                  <tr key={row.month}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {row.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {formatCurrency(row.emi)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {formatCurrency(row.principal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {formatCurrency(row.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

LoanCalculator.propTypes = {
  principal: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  tenure: PropTypes.number.isRequired,
  onCalculate: PropTypes.func
};

export default LoanCalculator;