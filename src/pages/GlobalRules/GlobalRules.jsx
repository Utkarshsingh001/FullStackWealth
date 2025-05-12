import React, { useState } from "react";
import { useGlobalRules } from "../../context/GlobalRulesContext";
import { Settings, Plus, AlertCircle, Check, X, Edit } from "lucide-react";

const GlobalRules = () => {
  const {
    rules,
    addRule,
    updateRule,
    deleteRule,
    getInflationRate,
    getSalaryGrowthRate,
    getMarketReturnRate,
    updateSystemRule,
    salary,
    updateSalary,
  } = useGlobalRules();

  const [isAdding, setIsAdding] = useState(false);
  const [editingSalary, setEditingSalary] = useState(false);
  const [newSalary, setNewSalary] = useState(salary);
  const [editingRule, setEditingRule] = useState(null);
  const [newRule, setNewRule] = useState({
    name: "",
    type: "custom",
    value: "",
    frequency: "yearly",
    description: "",
    isActive: true,
  });

  const handleAddRule = () => {
    addRule(newRule);
    setIsAdding(false);
    setNewRule({
      name: "",
      type: "custom",
      value: "",
      frequency: "yearly",
      description: "",
      isActive: true,
    });
  };

  const handleSaveSalary = () => {
    updateSalary(newSalary);
    setEditingSalary(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Global Rules
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage global financial rules and assumptions
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-3 py-2 text-sm font-medium text-white 
            bg-blue-600 dark:bg-blue-700 rounded-md 
            hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Rule
        </button>
      </div>

      {/* Salary Information */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">
              Monthly Salary
            </h3>
          </div>
          {!editingSalary && (
            <button
              onClick={() => {
                setNewSalary(salary);
                setEditingSalary(true);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 
                hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
        </div>

        {editingSalary ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Monthly Salary
              </label>
              <input
                type="number"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your monthly salary"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingSalary(false)}
                className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300
                  bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md
                  hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSalary}
                className="px-3 py-1.5 text-sm font-medium text-white
                  bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-2xl font-semibold text-slate-800 dark:text-white">
            {formatCurrency(salary)}
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
              per month
            </span>
          </div>
        )}
      </div>

      {/* System Rules */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">
            System Rules
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: "inflation",
              name: "Inflation Rate",
              value: getInflationRate(),
            },
            {
              id: "salary",
              name: "Salary Growth",
              value: getSalaryGrowthRate(),
            },
            {
              id: "market",
              name: "Market Returns",
              value: getMarketReturnRate(),
            },
          ].map((rule) => (
            <div
              key={rule.id}
              className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {rule.name}
                </span>
                {editingRule === rule.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingRule(null)}
                      className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 
                        dark:bg-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        updateSystemRule(rule.id, parseFloat(rule.value));
                        setEditingRule(null);
                      }}
                      className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 
                        dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingRule(rule.id)}
                    className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 
                      dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="flex items-end justify-between">
                {editingRule === rule.id ? (
                  <input
                    type="number"
                    value={rule.value}
                    onChange={(e) => {
                      const newRules = rules.map((r) =>
                        r.id === rule.id
                          ? { ...r, value: parseFloat(e.target.value) }
                          : r
                      );
                      updateSystemRule(rule.id, parseFloat(e.target.value));
                    }}
                    className="w-24 px-2 py-1 text-2xl font-semibold border border-slate-300 dark:border-slate-600 
                      rounded bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-slate-800 dark:text-white">
                    {rule.value}%
                  </span>
                )}
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  per year
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Rules */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">
            Custom Rules
          </h3>
        </div>

        {isAdding && (
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 animate-slideDown">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    value={newRule.name}
                    onChange={(e) =>
                      setNewRule((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                      bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Property Appreciation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Value (%)
                  </label>
                  <input
                    type="number"
                    value={newRule.value}
                    onChange={(e) =>
                      setNewRule((prev) => ({ ...prev, value: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                      bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 8"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newRule.description}
                  onChange={(e) =>
                    setNewRule((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                    bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the rule"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300
                    bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md
                    hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRule}
                  className="px-4 py-2 text-sm font-medium text-white
                    bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Rule
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {rules
            .filter((rule) => rule.type === "custom")
            .map((rule) => (
              <div key={rule.id} className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-800 dark:text-white">
                      {rule.name}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {rule.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-slate-800 dark:text-white">
                      {rule.value}%
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateRule(rule.id, { isActive: !rule.isActive })
                        }
                        className={`p-1.5 rounded-full transition-colors ${
                          rule.isActive
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteRule(rule.id)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-red-600 dark:hover:text-red-400
                        hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {rules.filter((rule) => rule.type === "custom").length === 0 &&
            !isAdding && (
              <div className="p-8 text-center">
                <AlertCircle className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400">
                  No custom rules found. Add your first rule to get started.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GlobalRules;
