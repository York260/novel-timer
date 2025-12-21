
import React, { useState } from 'react';
import { ActivityType } from '../types';

interface ActivityFormProps {
  onAdd: (type: ActivityType, value: number) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onAdd }) => {
  const [type, setType] = useState<ActivityType>('study');
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      onAdd(type, numValue);
      setValue('');
    }
  };

  const getUnit = () => {
    if (type === 'running') return '公尺 (m)';
    return '分鐘 (mins)';
  };

  const getPlaceholder = () => {
    if (type === 'running') return '例如: 1500';
    return '例如: 45';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">登入活動數據</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wide">選擇類型</label>
          <div className="grid grid-cols-3 gap-2">
            {(['study', 'exercise', 'running'] as ActivityType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`py-2 px-3 rounded-xl text-sm font-semibold border transition-all ${
                  type === t 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300'
                }`}
              >
                {t === 'study' ? '讀書' : t === 'exercise' ? '運動' : '跑步'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wide">
            輸入數值 ({getUnit()})
          </label>
          <div className="relative">
            <input 
              type="number" 
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-500 outline-none transition-all text-gray-700 font-medium"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">{getUnit()}</div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-sm"
        >
          儲存並更新進度
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;
