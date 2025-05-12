import React from "react";
// import { Asset } from "../types";


const AssetTypeFields = ({ asset, index, onChange }) => {
  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  return (
    <div className="pt-4 animate-fadeIn">
      {/* Mutual Fund Fields */}
      {asset.type === "Mutual Fund" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor={`investmentType-${index}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Investment Type
            </label>
            <select
              id={`investmentType-${index}`}
              value={asset.investmentType}
              onChange={(e) => onChange("investmentType", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
            >
              <option value="SIP">SIP</option>
              <option value="Lump Sum">Lump Sum</option>
            </select>
          </div>

          {asset.investmentType === "SIP" && (
            <div>
              <label
                htmlFor={`monthlySIP-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Monthly SIP (₹)
              </label>
              <input
                id={`monthlySIP-${index}`}
                type="number"
                value={asset.monthlySIP}
                onChange={(e) => onChange("monthlySIP", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 5000"
              />
            </div>
          )}

          <div>
            <label
              htmlFor={`totalInvested-${index}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Total Invested Till Now (₹)
            </label>
            <input
              id={`totalInvested-${index}`}
              type="number"
              value={asset.totalInvested}
              onChange={(e) => onChange("totalInvested", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
              placeholder="e.g., 100000"
            />
          </div>

          <div>
            <label
              htmlFor={`value-${index}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Current Value (₹)
            </label>
            <input
              id={`value-${index}`}
              type="number"
              value={asset.value}
              onChange={(e) => onChange("value", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
              placeholder="e.g., 120000"
            />
          </div>
        </div>
      )}

      {/* FD Fields */}
      {asset.type === "FD" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`bankName-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Bank/Institution Name
              </label>
              <input
                id={`bankName-${index}`}
                type="text"
                value={asset.bankName}
                onChange={(e) => onChange("bankName", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., HDFC Bank"
              />
            </div>

            <div>
              <label
                htmlFor={`compoundingFrequency-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Compounding Frequency
              </label>
              <select
                id={`compoundingFrequency-${index}`}
                value={asset.compoundingFrequency}
                onChange={(e) =>
                  onChange("compoundingFrequency", e.target.value)
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <input
                id={`autoRenewal-${index}`}
                type="checkbox"
                checked={asset.autoRenewal}
                onChange={(e) => onChange("autoRenewal", e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700"
              />
              <label
                htmlFor={`autoRenewal-${index}`}
                className="ml-2 text-sm text-slate-700 dark:text-slate-300"
              >
                Auto Renewal
              </label>
            </div>

            <div className="flex items-center">
              <input
                id={`isTaxSaver-${index}`}
                type="checkbox"
                checked={asset.isTaxSaver}
                onChange={(e) => onChange("isTaxSaver", e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700"
              />
              <label
                htmlFor={`isTaxSaver-${index}`}
                className="ml-2 text-sm text-slate-700 dark:text-slate-300"
              >
                Tax Saver FD
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor={`value-${index}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              FD Maturity Value (₹)
            </label>
            <input
              id={`value-${index}`}
              type="number"
              value={asset.value}
              onChange={(e) => onChange("value", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
              placeholder="e.g., 105000"
            />
          </div>
        </div>
      )}

      {/* Stocks Fields */}
      {asset.type === "Stocks" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor={`stockName-${index}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Stock Name / Symbol
            </label>
            <input
              id={`stockName-${index}`}
              type="text"
              value={asset.stockName}
              onChange={(e) => onChange("stockName", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
              placeholder="e.g., RELIANCE, INFY"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor={`units-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Units (No. of shares)
              </label>
              <input
                id={`units-${index}`}
                type="number"
                value={asset.units}
                onChange={(e) => onChange("units", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 10"
              />
            </div>

            <div>
              <label
                htmlFor={`buyPrice-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Buy Price per Share (₹)
              </label>
              <input
                id={`buyPrice-${index}`}
                type="number"
                value={asset.buyPrice}
                onChange={(e) => onChange("buyPrice", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 2500"
              />
            </div>

            <div>
              <label
                htmlFor={`currentPrice-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Current Market Price (₹)
              </label>
              <input
                id={`currentPrice-${index}`}
                type="number"
                value={asset.currentPrice}
                onChange={(e) => onChange("currentPrice", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 2750"
              />
            </div>
          </div>

          {asset.units && asset.buyPrice && asset.currentPrice && (
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Total Invested
                  </span>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    {formatCurrency(
                      String(Number(asset.units) * Number(asset.buyPrice))
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Current Value
                  </span>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    {formatCurrency(
                      String(Number(asset.units) * Number(asset.currentPrice))
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Gain/Loss
                  </span>
                  <p
                    className={`text-sm font-medium ${
                      Number(asset.currentPrice) >= Number(asset.buyPrice)
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatCurrency(
                      String(
                        Number(asset.units) *
                          (Number(asset.currentPrice) - Number(asset.buyPrice))
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Gold Fields */}
      {asset.type === "Gold" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor={`goldType-${index}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Gold Type
            </label>
            <select
              id={`goldType-${index}`}
              value={asset.goldType}
              onChange={(e) => onChange("goldType", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
            >
              <option value="">-- Select --</option>
              <option value="Physical">Physical</option>
              <option value="Digital">Digital</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor={`weight-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Weight (grams)
              </label>
              <input
                id={`weight-${index}`}
                type="number"
                value={asset.weight}
                onChange={(e) => onChange("weight", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 10"
              />
            </div>

            <div>
              <label
                htmlFor={`goldBuyPrice-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Buy Price per gram (₹)
              </label>
              <input
                id={`goldBuyPrice-${index}`}
                type="number"
                value={asset.goldBuyPrice}
                onChange={(e) => onChange("goldBuyPrice", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 5800"
              />
            </div>

            <div>
              <label
                htmlFor={`goldCurrentPrice-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Current Price per gram (₹)
              </label>
              <input
                id={`goldCurrentPrice-${index}`}
                type="number"
                value={asset.goldCurrentPrice}
                onChange={(e) => onChange("goldCurrentPrice", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 6200"
              />
            </div>
          </div>

          {asset.weight && asset.goldBuyPrice && asset.goldCurrentPrice && (
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Total Invested
                  </span>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    {formatCurrency(
                      String(Number(asset.weight) * Number(asset.goldBuyPrice))
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Current Value
                  </span>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    {formatCurrency(
                      String(
                        Number(asset.weight) * Number(asset.goldCurrentPrice)
                      )
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Gain/Loss
                  </span>
                  <p
                    className={`text-sm font-medium ${
                      Number(asset.goldCurrentPrice) >=
                      Number(asset.goldBuyPrice)
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatCurrency(
                      String(
                        Number(asset.weight) *
                          (Number(asset.goldCurrentPrice) -
                            Number(asset.goldBuyPrice))
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Property Fields */}
      {asset.type === "Property" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`propertyType-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Property Type
              </label>
              <select
                id={`propertyType-${index}`}
                value={asset.propertyType}
                onChange={(e) => onChange("propertyType", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
              >
                <option value="">-- Select --</option>
                <option value="Flat">Flat</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
                <option value="Villa">Villa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={`location-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Location
              </label>
              <input
                id={`location-${index}`}
                type="text"
                value={asset.location}
                onChange={(e) => onChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., Bangalore, Mumbai"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor={`purchasePrice-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Purchase Price (₹)
              </label>
              <input
                id={`purchasePrice-${index}`}
                type="number"
                value={asset.purchasePrice}
                onChange={(e) => onChange("purchasePrice", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 5000000"
              />
            </div>

            <div>
              <label
                htmlFor={`marketValue-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Current Market Value (₹)
              </label>
              <input
                id={`marketValue-${index}`}
                type="number"
                value={asset.marketValue}
                onChange={(e) => onChange("marketValue", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 7500000"
              />
            </div>

            <div>
              <label
                htmlFor={`ownershipPercent-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Ownership Percentage (%)
              </label>
              <input
                id={`ownershipPercent-${index}`}
                type="number"
                value={asset.ownershipPercent}
                onChange={(e) => onChange("ownershipPercent", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`rentalIncome-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Rental Income (₹/month)
              </label>
              <input
                id={`rentalIncome-${index}`}
                type="number"
                value={asset.rentalIncome}
                onChange={(e) => onChange("rentalIncome", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 25000"
              />
            </div>

            <div className="flex items-center mt-6">
              <input
                id={`hasLoan-${index}`}
                type="checkbox"
                checked={asset.hasLoan}
                onChange={(e) => onChange("hasLoan", e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700"
              />
              <label
                htmlFor={`hasLoan-${index}`}
                className="ml-2 text-sm text-slate-700 dark:text-slate-300"
              >
                Has outstanding loan
              </label>
            </div>
          </div>

          {asset.marketValue && asset.ownershipPercent && (
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Owned Value
                  </span>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    {formatCurrency(
                      String(
                        (Number(asset.marketValue) *
                          Number(asset.ownershipPercent)) /
                          100
                      )
                    )}
                  </p>
                </div>
                {asset.rentalIncome && (
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Annual Rental Income
                    </span>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {formatCurrency(String(Number(asset.rentalIncome) * 12))}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Crypto Fields */}
      {asset.type === "Crypto" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor={`cryptoName-${index}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Crypto Name
            </label>
            <input
              id={`cryptoName-${index}`}
              type="text"
              value={asset.cryptoName}
              onChange={(e) => onChange("cryptoName", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
              placeholder="e.g., Bitcoin, Ethereum"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor={`cryptoUnits-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Quantity (Units)
              </label>
              <input
                id={`cryptoUnits-${index}`}
                type="number"
                value={asset.cryptoUnits}
                onChange={(e) => onChange("cryptoUnits", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 0.5"
              />
            </div>

            <div>
              <label
                htmlFor={`cryptoBuyPrice-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Buy Price per Unit (₹)
              </label>
              <input
                id={`cryptoBuyPrice-${index}`}
                type="number"
                value={asset.cryptoBuyPrice}
                onChange={(e) => onChange("cryptoBuyPrice", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 3500000"
              />
            </div>

            <div>
              <label
                htmlFor={`cryptoCurrentPrice-${index}`}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Current Price per Unit (₹)
              </label>
              <input
                id={`cryptoCurrentPrice-${index}`}
                type="number"
                value={asset.cryptoCurrentPrice}
                onChange={(e) => onChange("cryptoCurrentPrice", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., 4000000"
              />
            </div>
          </div>

          {asset.cryptoUnits &&
            asset.cryptoBuyPrice &&
            asset.cryptoCurrentPrice && (
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Total Invested
                    </span>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {formatCurrency(
                        String(
                          Number(asset.cryptoUnits) *
                            Number(asset.cryptoBuyPrice)
                        )
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Current Value
                    </span>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {formatCurrency(
                        String(
                          Number(asset.cryptoUnits) *
                            Number(asset.cryptoCurrentPrice)
                        )
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Gain/Loss
                    </span>
                    <p
                      className={`text-sm font-medium ${
                        Number(asset.cryptoCurrentPrice) >=
                        Number(asset.cryptoBuyPrice)
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatCurrency(
                        String(
                          Number(asset.cryptoUnits) *
                            (Number(asset.cryptoCurrentPrice) -
                              Number(asset.cryptoBuyPrice))
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}

      {/* Other Asset Fields */}
      {asset.type === "Other" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor={`otherDescription-${index}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Description
            </label>
            <input
              id={`otherDescription-${index}`}
              type="text"
              value={asset.otherDescription}
              onChange={(e) => onChange("otherDescription", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
              placeholder="Describe this asset"
            />
          </div>

          <div>
            <label
              htmlFor={`value-${index}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Current Value (₹)
            </label>
            <input
              id={`value-${index}`}
              type="number"
              value={asset.value}
              onChange={(e) => onChange("value", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
              placeholder="e.g., 50000"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetTypeFields;
