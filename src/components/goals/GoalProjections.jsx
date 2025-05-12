import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { useGoals } from "../../context/GoalsContext";
import { useAssets } from "../../context/AssetContext";
import { useLiabilities } from "../../context/LiabilityContext";
import { useGlobalRules } from "../../context/GlobalRulesContext";

const GoalProjections = () => {
  const { goals, calculateProgress } = useGoals();
  const { getTotalPortfolioValue, getTotalInvested } = useAssets();
  const { getTotalLiabilities } = useLiabilities();
  const { getInflationRate, getSalaryGrowthRate, getMarketReturnRate, salary } =
    useGlobalRules();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate projections for the next 30 years
  const calculateProjections = () => {
    const years = Array.from(
      { length: 31 },
      (_, i) => new Date().getFullYear() + i
    );
    const inflationRate = getInflationRate() / 100;
    const salaryGrowthRate = getSalaryGrowthRate() / 100;
    const marketReturnRate = getMarketReturnRate() / 100;

    let currentAssets = getTotalPortfolioValue();
    let currentLiabilities = getTotalLiabilities();
    let monthlySalary = salary;
    let annualSavings = salary * 12 * 0.3; // Assuming 30% savings rate

    const projections = years.map((year) => {
      // Calculate goals due this year
      const yearlyGoals = goals
        .filter((goal) => new Date(goal.targetDate).getFullYear() === year)
        .reduce((sum, goal) => sum + goal.targetAmount, 0);

      // Apply inflation to goals
      const inflatedGoals =
        yearlyGoals *
        Math.pow(1 + inflationRate, year - new Date().getFullYear());

      // Grow assets with market returns and savings
      currentAssets = (currentAssets + annualSavings) * (1 + marketReturnRate);

      // Reduce liabilities (assuming steady paydown)
      currentLiabilities *= 0.9; // 10% reduction per year

      // Increase salary and savings
      monthlySalary *= 1 + salaryGrowthRate;
      annualSavings = monthlySalary * 12 * 0.3;

      return {
        year,
        assets: currentAssets,
        liabilities: currentLiabilities,
        goals: inflatedGoals,
        netWorth: currentAssets - currentLiabilities,
      };
    });

    return projections;
  };

  const projections = calculateProjections();

  const lineChartData = {
    labels: projections.map((p) => p.year),
    datasets: [
      {
        label: "Assets",
        data: projections.map((p) => p.assets),
        borderColor: "rgba(16, 185, 129, 1)", // Emerald
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
      },
      {
        label: "Liabilities",
        data: projections.map((p) => p.liabilities),
        borderColor: "rgba(239, 68, 68, 1)", // Red
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
      },
      {
        label: "Net Worth",
        data: projections.map((p) => p.netWorth),
        borderColor: "rgba(59, 130, 246, 1)", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: projections.map((p) => p.year),
    datasets: [
      {
        label: "Yearly Goals",
        data: projections.map((p) => p.goals),
        backgroundColor: "rgba(99, 102, 241, 0.8)", // Indigo
      },
      {
        label: "Projected Net Worth",
        data: projections.map((p) => p.netWorth),
        backgroundColor: "rgba(16, 185, 129, 0.8)", // Emerald
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgb(148, 163, 184)",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += formatCurrency(context.parsed.y);
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          callback: function (value) {
            return formatCurrency(value);
          },
        },
      },
      x: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
        },
      },
    },
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "text-blue-600 dark:text-blue-400",
      emerald: "text-emerald-600 dark:text-emerald-400",
      indigo: "text-indigo-600 dark:text-indigo-400",
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">
          30-Year Wealth Projection
        </h3>
        <div className="h-96">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">
          Goals vs Projected Net Worth
        </h3>
        <div className="h-96">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Current Net Worth",
            value: getTotalPortfolioValue() - getTotalLiabilities(),
            color: "blue",
          },
          {
            label: "Projected Net Worth (10Y)",
            value: projections[10].netWorth,
            color: "emerald",
          },
          {
            label: "Total Goals Value",
            value: goals.reduce((sum, goal) => sum + goal.targetAmount, 0),
            color: "indigo",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p
              className={`mt-2 text-2xl font-semibold ${getColorClasses(
                stat.color
              )}`}
            >
              {formatCurrency(stat.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalProjections;
