
import React, { useState, useEffect } from 'react';
import { ActivityEntry, RedemptionEntry, ActivityType } from './types';
import Dashboard from './components/Dashboard';
import ActivityForm from './components/ActivityForm';
import Logs from './components/Logs';
import RewardBrowser from './components/RewardBrowser';
import AntlionPet from './components/AntlionPet';
const STORAGE_KEY = 'novel_reward_system_data_v2';

const App: React.FC = () => {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [redemptions, setRedemptions] = useState<RedemptionEntry[]>([]);
  const [view, setView] = useState<'logging' | 'redemption' | 'browser'>('logging');
  const [activeRewardMinutes, setActiveRewardMinutes] = useState<number>(0);
  const [activeRedemptionId, setActiveRedemptionId] = useState<string | null>(null);

  // Load data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { activities: a, redemptions: r } = JSON.parse(saved);
        setActivities(a || []);
        setRedemptions(r || []);
      } catch (e) {
        console.error("Failed to parse storage", e);
      }
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activities, redemptions }));
  }, [activities, redemptions]);


  // Calculate total earned based on cumulative milestones
  const totalStudyMinutes = activities
    .filter(a => a.type === 'study')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const totalExerciseMinutes = activities
    .filter(a => a.type === 'exercise')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const totalRunningMeters = activities
    .filter(a => a.type === 'running')
    .reduce((acc, curr) => acc + curr.value, 0);

  const earnedFromStudy = Math.floor(totalStudyMinutes / 60) * 10;
  const earnedFromExercise = Math.floor(totalExerciseMinutes / 60) * 10;
  const earnedFromRunning = Math.floor(totalRunningMeters / 3000) * 10;

  const totalEarned = earnedFromStudy + earnedFromExercise + earnedFromRunning;
  const totalSpent = redemptions.reduce((acc, curr) => acc + curr.amount, 0);
  const availableMinutes = totalEarned - totalSpent;

  // Progress to next milestone
  const studyProgress = totalStudyMinutes % 60;
  const exerciseProgress = totalExerciseMinutes % 60;
  const runningProgress = totalRunningMeters % 3000;

  const handleAddActivity = (type: ActivityType, value: number) => {
    const newActivity: ActivityEntry = {
      id: crypto.randomUUID(),
      type,
      value,
      timestamp: new Date().toISOString(),
    };

    setActivities(prev => [newActivity, ...prev]);
  };

  const handleRedeem = (amount: number) => {
    if (amount > availableMinutes) return;

    const id = crypto.randomUUID();
    const newRedemption: RedemptionEntry = {
      id,
      amount,
      timestamp: new Date().toISOString(),
    };

    setRedemptions(prev => [newRedemption, ...prev]);
    setActiveRewardMinutes(amount);
    setActiveRedemptionId(id);
    setView('browser');
  };

  const finalizeReward = (remainingSeconds: number) => {
    if (!activeRedemptionId) return;

    const unusedMinutes = Math.floor(remainingSeconds / 60);
    
    setRedemptions(prev => prev.map(r => {
      if (r.id === activeRedemptionId) {
        return { ...r, amount: Math.max(0, r.amount - unusedMinutes) };
      }
      return r;
    }).filter(r => r.amount > 0)); // Remove entries where no time was actually spent

    setActiveRedemptionId(null);
    setActiveRewardMinutes(0);
  };

  const handleRewardEnded = () => {
    finalizeReward(0);
    setView('logging');
    alert('獎勵時間已結束！請繼續努力獲得更多時間。');
  };

  const handleExitReward = (remainingSeconds: number) => {
    finalizeReward(remainingSeconds);
    setView('redemption');
  };


  if (view === 'browser') {
    return (
      <RewardBrowser 
        initialMinutes={activeRewardMinutes} 
        onFinish={handleRewardEnded} 
        onExit={handleExitReward}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            📖 小說獎勵系統
          </h1>
          <div className="flex bg-indigo-700/50 rounded-lg p-1">
            <button 
              onClick={() => setView('logging')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'logging' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              數據登入
            </button>
            <button 
              onClick={() => setView('redemption')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'redemption' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              獎勵兌換
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="mb-8">
          <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full"></div>
            <p className="text-sm font-semibold text-indigo-100 uppercase tracking-widest mb-2">當前可用餘額</p>
            <p className="text-6xl font-black">{availableMinutes} <span className="text-2xl font-normal opacity-80">分鐘</span></p>
          </div>
        </div>

        {view === 'logging' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 蟻獅寵物區域 */}
            <AntlionPet
              totalMinutes={totalStudyMinutes + totalExerciseMinutes}
              totalKilometers={totalRunningMeters / 1000}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <ActivityForm onAdd={handleAddActivity} />
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">當前進度 (未滿額度)</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                        <span>📖 讀書累計</span>
                        <span>{studyProgress} / 60 分鐘</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(studyProgress / 60) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                        <span>💪 運動累計</span>
                        <span>{exerciseProgress} / 60 分鐘</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(exerciseProgress / 60) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                        <span>🏃 跑步累計</span>
                        <span>{runningProgress} / 3000 公尺</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-orange-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(runningProgress / 3000) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h2 className="text-sm font-semibold mb-3 text-gray-800 uppercase tracking-wider">獎勵規則</h2>
                    <ul className="space-y-2 text-xs text-gray-500">
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                        每累計滿 60 分鐘讀書/運動 → 10 分鐘獎勵
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                        每累計滿 3000 公尺跑步 → 10 分鐘獎勵
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <Logs activities={activities} redemptions={[]} showType="activities" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Dashboard 
              availableMinutes={availableMinutes} 
              onRedeem={handleRedeem}
            />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="font-bold text-gray-800">歷史兌換記錄</h2>
               </div>
               <Logs activities={[]} redemptions={redemptions} showType="redemptions" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
