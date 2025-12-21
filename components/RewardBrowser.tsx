
import React, { useState, useEffect, useRef } from 'react';

interface RewardBrowserProps {
  initialMinutes: number;
  onFinish: () => void;
  onExit: (remainingSeconds: number) => void;
}

const RewardBrowser: React.FC<RewardBrowserProps> = ({ initialMinutes, onFinish, onExit }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);
  const [url, setUrl] = useState('https://www.google.com/search?q=網路小說');
  const [inputUrl, setInputUrl] = useState('https://www.google.com/search?q=網路小說');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onFinish, isPaused]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    let formattedUrl = inputUrl;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    setUrl(formattedUrl);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      setIsHeaderVisible(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col overflow-hidden">
      {/* Retractable Top Bar */}
      <header 
        className={`bg-white border-b border-gray-200 p-2 flex items-center gap-4 transition-transform duration-300 ease-in-out z-30 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <button 
          onClick={() => onExit(secondsRemaining)}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 shrink-0"
          title="回主頁"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <form onSubmit={handleGo} className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-1.5 gap-2 border border-gray-200">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.61 0 3.116.377 4.453 1.045m1.13 1.13c.668 1.337 1.045 2.843 1.045 4.453 0 1.61-.377 3.116-1.045 4.453m-1.13 1.13A10.003 10.003 0 0112 21c-1.61 0-3.116-.377-4.453-1.045m-1.13-1.13a10.003 10.003 0 01-1.045-4.453c0-1.61.377-3.116 1.045-4.453m1.13-1.13A10.003 10.003 0 0112 3" />
          </svg>
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            disabled={isPaused}
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700 disabled:opacity-50"
            placeholder="輸入網址..."
          />
        </form>

        <button 
          onClick={togglePause}
          title={isPaused ? "恢復計時" : "暫停計時"}
          className={`px-4 py-1.5 rounded-full font-mono font-bold text-lg min-w-[100px] text-center shadow-inner shrink-0 transition-all active:scale-95 ${
            isPaused 
              ? 'bg-gray-200 text-gray-500 ring-4 ring-gray-100' 
              : secondsRemaining < 60 
                ? 'bg-rose-100 text-rose-600 animate-pulse' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {formatTime(secondsRemaining)}
        </button>

        <button 
          onClick={() => setIsHeaderVisible(false)}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 shrink-0"
          title="收起工具列"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </header>

      {/* Floating Toggle Button (visible when header is hidden) */}
      {!isHeaderVisible && (
        <button 
          onClick={() => setIsHeaderVisible(true)}
          className="fixed top-0 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur border border-t-0 border-gray-200 px-4 py-1 rounded-b-xl shadow-md text-gray-400 hover:text-indigo-600 transition-all z-40"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Browser View */}
      <div className={`flex-1 relative bg-white transition-all duration-300 ${isHeaderVisible ? 'mt-0' : '-mt-[57px]'}`}>
        <iframe 
          src={url} 
          className={`w-full h-full border-none transition-opacity duration-500 ${isPaused ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
          title="browser-reward"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
        
        {/* Pause Overlay Screen */}
        {isPaused && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-md z-20 animate-in fade-in duration-300">
            <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-xs w-full mx-4 transform animate-in slide-in-from-bottom-8 duration-500">
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">已暫停計時</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">休息一下吧！點擊下方按鈕或計時器即可恢復閱讀。</p>
              <button 
                onClick={togglePause}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
              >
                繼續閱讀
              </button>
            </div>
          </div>
        )}

        {/* Closable Warning Overlay */}
        {showWarning && !isPaused && (
          <div className="absolute top-4 right-4 max-w-xs bg-white/95 backdrop-blur p-4 rounded-xl border border-gray-200 shadow-2xl z-20 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800 text-sm">頁面未顯示？</h3>
              <button 
                onClick={() => setShowWarning(false)}
                className="text-gray-400 hover:text-rose-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">
              部分網站（如 Google 首頁）因安全設定禁止在框架中顯示。若看到「拒絕連線」，請嘗試在搜尋欄輸入特定小說網站網址。
            </p>
          </div>
        )}
      </div>
      
      <footer className={`bg-gray-100 text-[10px] text-gray-400 px-4 py-1 text-center transition-opacity duration-300 ${isHeaderVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {isPaused ? '計時已暫停 - 系統鎖定中' : '獎勵時間專屬閱讀空間 - 系統已鎖定外部存取，請在時間內享受閱讀。'}
      </footer>
    </div>
  );
};

export default RewardBrowser;
