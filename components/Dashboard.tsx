
import React, { useState } from 'react';

interface DashboardProps {
  availableMinutes: number;
  onRedeem: (amount: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  availableMinutes, 
  onRedeem 
}) => {
  const [redeemAmount, setRedeemAmount] = useState<number>(10);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 bg-gray-50">
        <div className="max-w-md mx-auto space-y-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">兌換獎勵時間</h2>
          <p className="text-sm text-gray-500">輸入您想要兌換的時間，系統將直接扣除並記錄。</p>

          <div className="relative mt-4">
            <input
              type="number"
              min="1"
              max={availableMinutes}
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(Number(e.target.value))}
              className="w-full px-6 py-4 text-2xl font-bold text-center rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">分鐘</div>
          </div>

          <button
            onClick={() => onRedeem(redeemAmount)}
            disabled={availableMinutes <= 0 || redeemAmount <= 0 || redeemAmount > availableMinutes}
            className="w-full py-4 bg-indigo-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 disabled:bg-gray-400 disabled:shadow-none disabled:scale-100 transition-all mt-4"
          >
            兌換獎勵時間
          </button>

          {availableMinutes < redeemAmount && availableMinutes > 0 && (
            <p className="text-rose-500 text-xs font-medium">可用餘額不足，請輸入更少的時間。</p>
          )}
          {availableMinutes <= 0 && (
            <p className="text-amber-600 text-xs font-medium">目前沒有餘額，快去學習或運動吧！</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
