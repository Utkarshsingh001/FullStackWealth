import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, Check } from 'lucide-react';

const liabilityTypes = [
  "Credit Card",
  "Personal Loan",
  "Home Loan",
  "Auto Loan",
  "Student Loan",
  "Other"
];

const defaultLiability = {
  name: "",
  type: "Credit Card",
  principal: "",
  interestRate: "",
  tenure: "",
  monthlyInstallment: "",
  outstandingAmount: "",
  lender: "",
  nextPaymentDate: "",
  dueDate: "",
  isActive: true,
  notes: "",
  sanctionDate: "",
  disbursementDate: "",
  emiStartDate: "",
  loanMaturityDate: "",
  localRule: {
    type: "no_rule",
    changeRate: "",
    frequency: "monthly",
  },
};

const LiabilityForm = ({ initialData, onSave, onCancel }) => {
  const [liability, setLiability] = useState(initialData || defaultLiability);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (field, value) => {
    setLiability(prev => ({ ...prev, [field]: value }));
  };

  const handleRuleChange = (field, value) => {
    setLiability(prev => ({
      ...prev,
      localRule: { ...prev.localRule, [field]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(liability);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white">
          {initialData ? 'Edit Liability' : 'Add New Liability'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 
              transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Liability Name
          </label>
          <input
            type="text"
            value={liability.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., Home Loan HDFC"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Type
          </label>
          <select
            value={liability.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
          >
            {liabilityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Principal Amount
          </label>
          <input
            type="number"
            value={liability.principal}
            onChange={(e) => handleChange('principal', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., 1000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Interest Rate (% p.a.)
          </label>
          <input
            type="number"
            step="0.01"
            value={liability.interestRate}
            onChange={(e) => handleChange('interestRate', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., 8.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Tenure
          </label>
          <input
            type="text"
            value={liability.tenure}
            onChange={(e) => handleChange('tenure', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., 20 years"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Monthly Installment
          </label>
          <input
            type="number"
            value={liability.monthlyInstallment}
            onChange={(e) => handleChange('monthlyInstallment', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., 15000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Outstanding Amount
          </label>
          <input
            type="number"
            value={liability.outstandingAmount}
            onChange={(e) => handleChange('outstandingAmount', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., 950000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Lender Name
          </label>
          <input
            type="text"
            value={liability.lender}
            onChange={(e) => handleChange('lender', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., HDFC Bank"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Next Payment Date
          </label>
          <input
            type="date"
            value={liability.nextPaymentDate}
            onChange={(e) => handleChange('nextPaymentDate', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {isExpanded ? 'Hide additional fields' : 'Show additional fields'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4 animate-fadeIn">
          {liability.type === 'Home Loan' && (
            <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Home Loan Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Sanction Date
                  </label>
                  <input
                    type="date"
                    value={liability.sanctionDate}
                    onChange={(e) => handleChange('sanctionDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                      bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Disbursement Date
                  </label>
                  <input
                    type="date"
                    value={liability.disbursementDate}
                    onChange={(e) => handleChange('disbursementDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                      bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                    EMI Start Date
                  </label>
                  <input
                    type="date"
                    value={liability.emiStartDate}
                    onChange={(e) => handleChange('emiStartDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                      bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Loan Maturity Date
                  </label>
                  <input
                    type="date"
                    value={liability.loanMaturityDate}
                    onChange={(e) => handleChange('loanMaturityDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                      bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Notes
            </label>
            <textarea
              value={liability.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition duration-200"
              placeholder="Any additional notes about this liability..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={liability.isActive}
              onChange={(e) => handleChange('isActive', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded 
                border-slate-300 dark:border-slate-600 dark:bg-slate-700"
            />
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Liability is currently active
            </label>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Growth Rule</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Rule Type
                </label>
                <select
                  value={liability.localRule.type}
                  onChange={(e) => handleRuleChange('type', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                    bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition duration-200"
                >
                  <option value="no_rule">No Rule</option>
                  <option value="make_rule">Custom Growth</option>
                </select>
              </div>

              {liability.localRule.type === 'make_rule' && (
                <>
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Change Rate (%)
                    </label>
                    <input
                      type="number"
                      value={liability.localRule.changeRate}
                      onChange={(e) => handleRuleChange('changeRate', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                        bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition duration-200"
                      placeholder="e.g., 5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Frequency
                    </label>
                    <select
                      value={liability.localRule.frequency}
                      onChange={(e) => handleRuleChange('frequency', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                        bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition duration-200"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium 
              text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 
              hover:bg-slate-50 dark:hover:bg-slate-600 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium 
            text-white bg-blue-600 hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
            transition-colors"
        >
          <Check className="h-4 w-4 mr-2" />
          Save Liability
        </button>
      </div>
    </form>
  );
};

LiabilityForm.propTypes = {
  initialData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};

export default LiabilityForm;