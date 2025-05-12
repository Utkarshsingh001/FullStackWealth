import React, { useState } from "react";
import { Plus, Filter, BarChart3, AlertCircle } from "lucide-react";
import { useLiabilities } from "../../context/LiabilityContext";
import LiabilityCard from "../../components/liabilities/LiabilityCard";
import LiabilityForm from "../../components/liabilities/LiabilityForm";
import LiabilitySummary from "../../components/liabilities/LiabilitySummary";

const LiabilityDashboard = () => {
  const {
    liabilities,
    addLiability,
    updateLiability,
    removeLiability,
    getTotalLiabilities,
    getTotalEMI,
    getUpcomingPayments,
  } = useLiabilities();
  const [isAdding, setIsAdding] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [viewMode, setViewMode] = useState("cards");

  const handleAddClick = () => {
    addLiability();
    setIsAdding(true);
  };

  const filteredLiabilities = activeFilter
    ? liabilities.filter((liability) => liability.type === activeFilter)
    : liabilities;

  // Get unique liability types that exist in the current liabilities
  const existingTypes = ["All", ...new Set(liabilities.map((l) => l.type))];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Liabilities
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track and manage your loans and financial obligations
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === "cards" ? "list" : "cards")}
            className="px-3 py-2 text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 
              rounded-md border border-slate-200 dark:border-slate-600 
              hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
          </button>
          {liabilities.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  !activeFilter
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                }`}
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          )}
          <button
            onClick={handleAddClick}
            className="flex items-center px-3 py-2 text-sm font-medium text-white 
              bg-blue-600 dark:bg-blue-700 rounded-md 
              hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Liability
          </button>
        </div>
      </div>

      <LiabilitySummary
        totalLiabilities={getTotalLiabilities()}
        monthlyEMI={getTotalEMI()}
        upcomingPayments={getUpcomingPayments()}
      />

      {getUpcomingPayments().length > 0 && (
        <div
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 
          rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Upcoming Payments
            </h3>
            <ul className="mt-2 text-sm text-amber-700 dark:text-amber-400 space-y-1">
              {getUpcomingPayments().map((liability, index) => (
                <li key={index}>
                  {liability.name} - ₹
                  {Number(liability.monthlyInstallment).toLocaleString()} due on{" "}
                  {new Date(liability.nextPaymentDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 animate-slideDown">
          <LiabilityForm
            onCancel={() => setIsAdding(false)}
            onSave={(liability) => {
              updateLiability(liabilities.length - 1, "name", liability.name);
              updateLiability(liabilities.length - 1, "type", liability.type);
              updateLiability(
                liabilities.length - 1,
                "principal",
                liability.principal
              );
              updateLiability(
                liabilities.length - 1,
                "interestRate",
                liability.interestRate
              );
              updateLiability(
                liabilities.length - 1,
                "tenure",
                liability.tenure
              );
              updateLiability(
                liabilities.length - 1,
                "monthlyInstallment",
                liability.monthlyInstallment
              );
              updateLiability(
                liabilities.length - 1,
                "outstandingAmount",
                liability.outstandingAmount
              );
              updateLiability(
                liabilities.length - 1,
                "lender",
                liability.lender
              );
              updateLiability(
                liabilities.length - 1,
                "nextPaymentDate",
                liability.nextPaymentDate
              );
              updateLiability(
                liabilities.length - 1,
                "dueDate",
                liability.dueDate
              );
              updateLiability(
                liabilities.length - 1,
                "isActive",
                liability.isActive
              );
              updateLiability(liabilities.length - 1, "notes", liability.notes);
              setIsAdding(false);
            }}
          />
        </div>
      )}

      {liabilities.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
          {existingTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type === "All" ? null : type)}
              className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
                (type === "All" && !activeFilter) || activeFilter === type
                  ? "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                  : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      <div
        className={
          viewMode === "cards"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredLiabilities.map((liability, index) => (
          <LiabilityCard
            key={index}
            liability={liability}
            onUpdate={(updatedLiability) => {
              Object.keys(updatedLiability).forEach((key) => {
                updateLiability(index, key, updatedLiability[key]);
              });
            }}
            onDelete={() => removeLiability(index)}
            compact={viewMode === "list"}
          />
        ))}

        {filteredLiabilities.length === 0 && (
          <div className="col-span-full bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              No liabilities found. Add your first liability to start tracking.
            </p>
            <button
              onClick={handleAddClick}
              className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 
                bg-blue-50 dark:text-blue-200 dark:bg-blue-900/30 rounded-md 
                hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Liability
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiabilityDashboard;
