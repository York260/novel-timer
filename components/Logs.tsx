
import React from 'react';
import { ActivityEntry, RedemptionEntry } from '../types';

interface LogsProps {
  activities: ActivityEntry[];
  redemptions: RedemptionEntry[];
  showType: 'activities' | 'redemptions';
}

const Logs: React.FC<LogsProps> = ({ activities, redemptions, showType }) => {
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="max-h-[600px] overflow-y-auto">
        {showType === 'activities' ? (
          activities.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 sticky top-0 text-gray-400 uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-bold">登入時間</th>
                  <th className="px-6 py-4 font-bold">活動類型</th>
                  <th className="px-6 py-4 font-bold text-right">數值</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activities.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{formatDate(item.timestamp)}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-700">
                        {item.type === 'study' ? '📖 讀書' : item.type === 'exercise' ? '💪 運動' : '🏃 跑步'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        {item.value} {item.type === 'running' ? 'm' : 'min'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center">
              <div className="text-4xl mb-4 opacity-20">✍️</div>
              <p className="text-gray-400">尚無活動記錄，開始累積進度吧！</p>
            </div>
          )
        ) : (
          redemptions.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 sticky top-0 text-gray-400 uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-bold">兌換時間</th>
                  <th className="px-6 py-4 font-bold text-right">消耗獎勵</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {redemptions.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400">{formatDate(item.timestamp)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                        -{item.amount} 分鐘
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center">
              <div className="text-4xl mb-4 opacity-20">🎟️</div>
              <p className="text-gray-400">目前沒有兌換記錄。</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Logs;
