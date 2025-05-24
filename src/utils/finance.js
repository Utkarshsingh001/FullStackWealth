// Utility functions for financial calculations

/**
 * Calculate EMI using reducing balance method
 * @param {number} principal - Principal amount
 * @param {number} rate - Annual interest rate (in percentage)
 * @param {number} tenure - Loan tenure in months
 * @returns {number} Monthly EMI amount
 */
export const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = (rate / 12) / 100;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
  return Math.round(emi * 100) / 100;
};

/**
 * Calculate amortization schedule
 * @param {number} principal - Principal amount
 * @param {number} rate - Annual interest rate (in percentage)
 * @param {number} tenure - Loan tenure in months
 * @returns {Array<{
 *   month: number,
 *   emi: number,
 *   principal: number,
 *   interest: number,
 *   balance: number
 * }>} Amortization schedule
 */
export const calculateAmortizationSchedule = (principal, rate, tenure) => {
  const monthlyRate = (rate / 12) / 100;
  const emi = calculateEMI(principal, rate, tenure);
  const schedule = [];
  let balance = principal;

  for (let month = 1; month <= tenure; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    balance = balance - principalPaid;

    schedule.push({
      month,
      emi,
      principal: principalPaid,
      interest,
      balance: Math.max(0, balance)
    });
  }

  return schedule;
};

/**
 * Calculate outstanding loan amount
 * @param {number} principal - Principal amount
 * @param {number} rate - Annual interest rate (in percentage)
 * @param {number} tenure - Original loan tenure in months
 * @param {number} paidMonths - Number of EMIs paid
 * @returns {number} Outstanding loan amount
 */
export const calculateOutstandingAmount = (principal, rate, tenure, paidMonths) => {
  if (paidMonths >= tenure) return 0;
  const schedule = calculateAmortizationSchedule(principal, rate, tenure);
  return schedule[paidMonths]?.balance || 0;
};

/**
 * Calculate months between two dates
 * @param {string} startDate - Start date in ISO format
 * @param {string} endDate - End date in ISO format
 * @returns {number} Number of months between dates
 */
export const calculateMonthsBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
};

/**
 * Format currency in Indian format
 * @param {number} amount - Amount to format
 * @returns {string} Formatted amount
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};