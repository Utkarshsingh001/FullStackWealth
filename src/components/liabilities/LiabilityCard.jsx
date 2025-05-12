import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CreditCard,
  Wallet,
  Home,
  Car,
  GraduationCap,
  FileText,
  Calendar,
  Trash2,
  Edit,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import LiabilityForm from "./LiabilityForm";

const LiabilityCard = ({ liability, onUpdate, onDelete, compact = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getIcon = (type) => {
    switch (type) {
      case "Credit Card":
        return <CreditCard className="h-5 w-5" />;
      case "Personal Loan":
        return <Wallet className="h-5 w-5" />;
      case "Home Loan":
        return <Home className="h-5 w-5" />;
      case "Auto Loan":
        return <Car className="h-5 w-5" />;
      case "Student Loan":
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getColor = (type) => {
    const colors = {
      "Credit Card": {
        bg: "bg-purple-50",
        text: "text-purple-700",
        darkBg: "dark:bg-purple-900/30",
        darkText: "dark:text-purple-300",
      },
      "Personal Loan": {
        bg: "bg-blue-50",
        text: "text-blue-700",
        darkBg: "dark:bg-blue-900/30",
        darkText: "dark:text-blue-300",
      },
      "Home Loan": {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        darkBg: "dark:bg-emerald-900/30",
        darkText: "dark:text-emerald-300",
      },
      "Auto Loan": {
        bg: "bg-orange-50",
        text: "text-orange-700",
        darkBg: "dark:bg-orange-900/30",
        darkText: "dark:text-orange-300",
      },
      "Student Loan": {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        darkBg: "dark:bg-indigo-900/30",
        darkText: "dark:text-indigo-300",
      },
      Other: {
        bg: "bg-gray-50",
        text: "text-gray-700",
        darkBg: "dark:bg-gray-900/30",
        darkText: "dark:text-gray-300",
      },
    };
    return colors[type] || colors["Other"];
  };

  const getDaysUntilPayment = () => {
    const today = new Date();
    const nextPayment = new Date(liability.nextPaymentDate);
    const diffTime = nextPayment.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const color = getColor(liability.type);
  const daysUntilPayment = getDaysUntilPayment();

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 animate-fadeIn">
        <LiabilityForm
          initialData={liability}
          onSave={(updatedLiability) => {
            onUpdate(updatedLiability);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 
      overflow-hidden transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md
      ${!liability.isActive ? "opacity-70" : ""}`}
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`p-2 rounded-lg ${color.bg} ${color.darkBg} ${color.text} ${color.darkText} mr-3`}
            >
              {getIcon(liability.type)}
            </div>
            <div>
              <h3 className="font-medium text-slate-800 dark:text-white">
                {liability.name}
              </h3>
              <span
                className={`text-xs ${color.bg} ${color.darkBg} ${color.text} ${color.darkText} px-2 py-0.5 rounded-full`}
              >
                {liability.type}
              </span>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Outstanding Amount
            </span>
            <span className="font-semibold text-slate-800 dark:text-white">
              {formatCurrency(liability.outstandingAmount)}
            </span>
          </div>

          {!compact && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Monthly Payment
              </span>
              <span className="font-semibold text-slate-800 dark:text-white">
                {formatCurrency(liability.monthlyInstallment)}
              </span>
            </div>
          )}
        </div>

        {!compact && (
          <>
            <div className="mt-3 flex items-center text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                Next Payment:{" "}
                {new Date(liability.nextPaymentDate).toLocaleDateString()}
              </span>
            </div>

            {daysUntilPayment <= 7 && (
              <div className="mt-2 flex items-center text-xs text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Payment due in {daysUntilPayment} days</span>
              </div>
            )}
          </>
        )}
      </div>

      {!compact && (
        <>
          <div
            className="px-5 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 
              flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              {isExpanded ? "Hide details" : "Show details"}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            )}
          </div>

          {isExpanded && (
            <div className="p-5 border-t border-gray-200 dark:border-slate-700 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Lender
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {liability.lender}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Interest Rate
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {liability.interestRate}% p.a.
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Principal Amount
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {formatCurrency(liability.principal)}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Tenure
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {liability.tenure}
                  </p>
                </div>
              </div>

              {liability.type === "Home Loan" && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Home Loan Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Sanction Date
                      </span>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        {new Date(liability.sanctionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Disbursement Date
                      </span>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        {new Date(
                          liability.disbursementDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        EMI Start Date
                      </span>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        {new Date(liability.emiStartDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Maturity Date
                      </span>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        {new Date(
                          liability.loanMaturityDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {liability.notes && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                  <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    Notes
                  </h4>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                    {liability.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

LiabilityCard.propTypes = {
  liability: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  compact: PropTypes.bool,
};

export default LiabilityCard;
