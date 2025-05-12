// import React, { useState } from 'react';
// import {
//   Calendar, CreditCard, Percent, RefreshCw, Trash2, Edit, ChevronDown,
//   ChevronUp, DollarSign, ArrowUpRight, ArrowDownRight, Link, FileText
// } from 'lucide-react';
// import { useAssets } from '../context/AssetContext';
// import { Asset } from '../types';
// import AssetForm from './AssetForm';

// interface AssetCardProps {
//   asset: Asset;
//   index: number;
//   compact?: boolean;
// }

// const AssetCard: React.FC<AssetCardProps> = ({ asset, index, compact = false }) => {
//   const { removeAsset } = useAssets();
//   const [expanded, setExpanded] = useState(false);
//   const [editing, setEditing] = useState(false);

//   const formatCurrency = (value: string | number) => {
//     const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(numValue);
//   };

//   const getColor = (type: string) => {
//     const colors: Record<string, { bg: string, text: string, darkBg: string, darkText: string }> = {
//       'FD': { bg: 'bg-blue-50', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/30', darkText: 'dark:text-blue-300' },
//       'Mutual Fund': { bg: 'bg-purple-50', text: 'text-purple-700', darkBg: 'dark:bg-purple-900/30', darkText: 'dark:text-purple-300' },
//       'Stocks': { bg: 'bg-emerald-50', text: 'text-emerald-700', darkBg: 'dark:bg-emerald-900/30', darkText: 'dark:text-emerald-300' },
//       'Gold': { bg: 'bg-amber-50', text: 'text-amber-700', darkBg: 'dark:bg-amber-900/30', darkText: 'dark:text-amber-300' },
//       'Property': { bg: 'bg-indigo-50', text: 'text-indigo-700', darkBg: 'dark:bg-indigo-900/30', darkText: 'dark:text-indigo-300' },
//       'Crypto': { bg: 'bg-orange-50', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/30', darkText: 'dark:text-orange-300' },
//       'Other': { bg: 'bg-gray-50', text: 'text-gray-700', darkBg: 'dark:bg-gray-900/30', darkText: 'dark:text-gray-300' },
//     };

//     return colors[type] || colors['Other'];
//   };

//   const getAssetIcon = (type: string) => {
//     switch (type) {
//       case 'FD': return <CreditCard className="h-5 w-5" />;
//       case 'Mutual Fund': return <RefreshCw className="h-5 w-5" />;
//       case 'Stocks': return <ArrowUpRight className="h-5 w-5" />;
//       case 'Gold': return <DollarSign className="h-5 w-5" />;
//       case 'Property': return <FileText className="h-5 w-5" />;
//       case 'Crypto': return <ArrowUpRight className="h-5 w-5" />;
//       default: return <FileText className="h-5 w-5" />;
//     }
//   };

//   const getAssetValue = () => {
//     switch (asset.type) {
//       case 'Stocks':
//         return Number(asset.units) * Number(asset.currentPrice) || 0;
//       case 'Crypto':
//         return Number(asset.cryptoUnits) * Number(asset.cryptoCurrentPrice) || 0;
//       case 'Gold':
//         return Number(asset.weight) * Number(asset.goldCurrentPrice) || 0;
//       case 'Property':
//         return Number(asset.marketValue) * (Number(asset.ownershipPercent) / 100) || 0;
//       default:
//         return Number(asset.value) || 0;
//     }
//   };

//   const getAssetInvested = () => {
//     switch (asset.type) {
//       case 'Stocks':
//         return Number(asset.units) * Number(asset.buyPrice) || 0;
//       case 'Crypto':
//         return Number(asset.cryptoUnits) * Number(asset.cryptoBuyPrice) || 0;
//       case 'Gold':
//         return Number(asset.weight) * Number(asset.goldBuyPrice) || 0;
//       case 'Property':
//         return Number(asset.purchasePrice) * (Number(asset.ownershipPercent) / 100) || 0;
//       case 'Mutual Fund':
//         return Number(asset.totalInvested) || 0;
//       default:
//         return Number(asset.value) || 0;
//     }
//   };

//   const getGainLoss = () => {
//     return getAssetValue() - getAssetInvested();
//   };

//   const getGainLossPercentage = () => {
//     const invested = getAssetInvested();
//     if (invested <= 0) return 0;
//     return (getGainLoss() / invested) * 100;
//   };

//   const color = getColor(asset.type);
//   const assetValue = getAssetValue();
//   const gainLoss = getGainLoss();
//   const gainLossPercentage = getGainLossPercentage();

//   if (editing) {
//     return (
//       <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 animate-fadeIn">
//         <AssetForm
//           index={index}
//           onCancel={() => setEditing(false)}
//         />
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700
//         overflow-hidden transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-md
//         ${!asset.isActive ? 'opacity-70' : ''}`}
//     >
//       <div className="p-5">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className={`p-2 rounded-lg ${color.bg} ${color.darkBg} ${color.text} ${color.darkText} mr-3`}>
//               {getAssetIcon(asset.type)}
//             </div>
//             <div>
//               <h3 className="font-medium text-slate-800 dark:text-white">
//                 {asset.name || `Unnamed ${asset.type}`}
//               </h3>
//               <span className={`text-xs ${color.bg} ${color.darkBg} ${color.text} ${color.darkText} px-2 py-0.5 rounded-full`}>
//                 {asset.type}
//               </span>
//             </div>
//           </div>
//           <div className="flex">
//             <button
//               onClick={() => setEditing(true)}
//               className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
//             >
//               <Edit className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => removeAsset(index)}
//               className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         <div className="mt-4 space-y-2">
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-slate-500 dark:text-slate-400">Current Value</span>
//             <span className="font-semibold text-slate-800 dark:text-white">{formatCurrency(assetValue)}</span>
//           </div>

//           {!compact && (
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-slate-500 dark:text-slate-400">Gain/Loss</span>
//               <div className="flex items-center">
//                 <span className={`font-semibold ${gainLoss >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
//                   {formatCurrency(gainLoss)}
//                 </span>
//                 <span className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
//                   gainLoss >= 0
//                     ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
//                     : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
//                 }`}>
//                   {gainLoss >= 0 ? '+' : ''}{gainLossPercentage.toFixed(2)}%
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         {!compact && asset.expectedReturn && (
//           <div className="mt-3 flex items-center text-xs text-slate-500 dark:text-slate-400">
//             <Percent className="h-3 w-3 mr-1" />
//             <span>Expected: {asset.expectedReturn}% p.a.</span>
//           </div>
//         )}

//         {!compact && asset.linkedGoal && (
//           <div className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">
//             <Link className="h-3 w-3 mr-1" />
//             <span>Goal: {asset.linkedGoal}</span>
//           </div>
//         )}

//         {!compact && asset.purchaseDate && (
//           <div className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">
//             <Calendar className="h-3 w-3 mr-1" />
//             <span>Purchased: {new Date(asset.purchaseDate).toLocaleDateString()}</span>
//           </div>
//         )}
//       </div>

//       {!compact && (
//         <div
//           className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
//           onClick={() => setExpanded(!expanded)}
//         >
//           <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
//             {expanded ? 'Hide details' : 'Show details'}
//           </span>
//           {expanded ?
//             <ChevronUp className="h-4 w-4 text-slate-500 dark:text-slate-400" /> :
//             <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
//           }
//         </div>
//       )}

//       {expanded && !compact && (
//         <div className="p-5 border-t border-slate-100 dark:border-slate-700 animate-fadeIn">
//           {/* Asset type specific details */}
//           {asset.type === 'Mutual Fund' && (
//             <>
//               <div className="mb-3">
//                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Investment Type</span>
//                 <p className="text-sm text-slate-600 dark:text-slate-400">{asset.investmentType}</p>
//               </div>
//               {asset.investmentType === 'SIP' && (
//                 <div className="mb-3">
//                   <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Monthly SIP</span>
//                   <p className="text-sm text-slate-600 dark:text-slate-400">{formatCurrency(asset.monthlySIP)}</p>
//                 </div>
//               )}
//               <div className="mb-3">
//                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Invested</span>
//                 <p className="text-sm text-slate-600 dark:text-slate-400">{formatCurrency(asset.totalInvested)}</p>
//               </div>
//             </>
//           )}

//           {asset.type === 'FD' && (
//             <>
//               <div className="mb-3">
//                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Bank/Institution</span>
//                 <p className="text-sm text-slate-600 dark:text-slate-400">{asset.bankName || 'Not specified'}</p>
//               </div>
//               <div className="mb-3">
//                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Compounding Frequency</span>
//                 <p className="text-sm text-slate-600 dark:text-slate-400">{asset.compoundingFrequency}</p>
//               </div>
//               <div className="mb-3">
//                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Features</span>
//                 <div className="flex flex-wrap gap-2 mt-1">
//                   <span className={`text-xs px-2 py-0.5 rounded-full ${asset.autoRenewal ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
//                     {asset.autoRenewal ? 'Auto-Renewal: Yes' : 'Auto-Renewal: No'}
//                   </span>
//                   <span className={`text-xs px-2 py-0.5 rounded-full ${asset.isTaxSaver ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
//                     {asset.isTaxSaver ? 'Tax Saver: Yes' : 'Tax Saver: No'}
//                   </span>
//                 </div>
//               </div>
//             </>
//           )}

//           {asset.localRule.type === 'make_rule' && (
//             <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
//               <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Custom Growth Rule</h4>
//               <p className="text-xs text-slate-500 dark:text-slate-400">
//                 This asset grows at {asset.localRule.changeRate}% {asset.localRule.frequency}.
//               </p>
//             </div>
//           )}

//           {asset.notes && (
//             <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
//               <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Notes</h4>
//               <p className="text-xs text-amber-700 dark:text-amber-400">{asset.notes}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssetCard;
