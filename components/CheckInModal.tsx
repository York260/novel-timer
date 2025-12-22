import React, { useEffect, useState } from 'react';

interface CheckInModalProps {
  onClaim: () => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ onClaim }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 延迟显示以触发动画
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClaim = () => {
    setShow(false);
    setTimeout(onClaim, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-500 ${
          show ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* 装饰性背景 */}
        <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>

          <div className="relative text-center">
            <div className="text-6xl mb-4 animate-bounce">🎁</div>
            <h2 className="text-3xl font-black mb-2">每日簽到獎勵</h2>
            <p className="text-indigo-100 text-sm font-medium">恭喜你！今天的第一次登入</p>
          </div>
        </div>

        {/* 内容区 */}
        <div className="p-8 text-center">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
            <p className="text-sm text-amber-800 font-semibold mb-2">簽到獎勵</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-black text-amber-600">+10</span>
              <span className="text-xl font-bold text-amber-700">分鐘</span>
            </div>
            <p className="text-xs text-amber-700 mt-2">小說閱讀時間</p>
          </div>

          <button
            onClick={handleClaim}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            ✨ 領取獎勵
          </button>

          <p className="text-xs text-gray-500 mt-4">
            每天第一次登入即可獲得獎勵，明天再來簽到吧！
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
