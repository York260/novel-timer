import React from 'react';

interface CatPetProps {
  totalMinutes: number;
  totalKilometers: number;
}

const CatPet: React.FC<CatPetProps> = ({ totalMinutes, totalKilometers }) => {
  // 計算寵物大小：基於總時間（分鐘）和總公里數
  const baseSize = 100;
  const sizeFromMinutes = Math.floor(totalMinutes / 60) * 5;
  const sizeFromKilometers = Math.floor(totalKilometers) * 3;
  const petSize = baseSize + sizeFromMinutes + sizeFromKilometers;

  // 計算成長等級
  const growthLevel = Math.floor(petSize / 50);

  // 根據等級決定演化階段和外觀
  const getEvolutionStage = (level: number) => {
    if (level <= 2) return { name: '可愛小貓咪', stage: 0 };
    if (level <= 5) return { name: '大貓咪', stage: 1 };
    if (level <= 8) return { name: '怪奇貓', stage: 2 };
    if (level <= 11) return { name: '三眼貓', stage: 3 };
    if (level <= 14) return { name: '詭異生物', stage: 4 };
    return { name: '？？？', stage: 5 };
  };

  const evolution = getEvolutionStage(growthLevel);

  // 根據演化階段獲取顏色配置
  const getColors = (stage: number) => {
    switch (stage) {
      case 0: // 可愛小貓
        return {
          bg: 'from-pink-50 to-orange-50',
          border: 'border-pink-200',
          bodyFrom: 'from-orange-400',
          bodyTo: 'to-orange-500',
          headFrom: 'from-orange-300',
          headTo: 'to-orange-400',
          headBorder: 'border-orange-200',
          eyeColor: 'bg-gray-800',
          accentColor: 'text-orange-600'
        };
      case 1: // 大貓
        return {
          bg: 'from-orange-50 to-red-50',
          border: 'border-orange-200',
          bodyFrom: 'from-orange-500',
          bodyTo: 'to-red-500',
          headFrom: 'from-orange-400',
          headTo: 'to-red-400',
          headBorder: 'border-orange-300',
          eyeColor: 'bg-gray-800',
          accentColor: 'text-red-600'
        };
      case 2: // 怪奇貓
        return {
          bg: 'from-purple-50 to-pink-50',
          border: 'border-purple-300',
          bodyFrom: 'from-purple-500',
          bodyTo: 'to-pink-500',
          headFrom: 'from-purple-400',
          headTo: 'to-pink-400',
          headBorder: 'border-purple-400',
          eyeColor: 'bg-red-600',
          accentColor: 'text-purple-600'
        };
      case 3: // 三眼貓
        return {
          bg: 'from-violet-50 to-fuchsia-50',
          border: 'border-violet-400',
          bodyFrom: 'from-violet-600',
          bodyTo: 'to-fuchsia-600',
          headFrom: 'from-violet-500',
          headTo: 'to-fuchsia-500',
          headBorder: 'border-violet-500',
          eyeColor: 'bg-yellow-400',
          accentColor: 'text-violet-600'
        };
      case 4: // 詭異生物
        return {
          bg: 'from-slate-900 to-purple-900',
          border: 'border-purple-500',
          bodyFrom: 'from-purple-900',
          bodyTo: 'to-slate-900',
          headFrom: 'from-purple-800',
          headTo: 'to-slate-800',
          headBorder: 'border-purple-600',
          eyeColor: 'bg-lime-400',
          accentColor: 'text-purple-400'
        };
      default: // 外星生物
        return {
          bg: 'from-black to-green-950',
          border: 'border-green-500',
          bodyFrom: 'from-green-900',
          bodyTo: 'to-black',
          headFrom: 'from-green-800',
          headTo: 'to-black',
          headBorder: 'border-green-500',
          eyeColor: 'bg-cyan-400',
          accentColor: 'text-green-400'
        };
    }
  };

  const colors = getColors(evolution.stage);
  const headSize = petSize * 0.6;
  const bodyHeight = petSize * 0.7;
  const earSize = headSize * 0.3;

  // 渲染眼睛（數量根據階段變化）
  const renderEyes = () => {
    const eyeCount = Math.min(evolution.stage + 2, 6); // 2-6隻眼睛
    const eyes = [];

    if (evolution.stage <= 1) {
      // 正常兩隻眼睛
      return (
        <>
          {/* 左眼 */}
          <div
            className="absolute bg-white rounded-full shadow-inner"
            style={{
              width: `${headSize * 0.25}px`,
              height: `${headSize * 0.3}px`,
              left: `${headSize * 0.2}px`,
              top: `${headSize * 0.35}px`,
            }}
          >
            <div
              className={`absolute ${colors.eyeColor} rounded-full`}
              style={{
                width: `${headSize * 0.12}px`,
                height: `${headSize * 0.15}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            ></div>
            <div
              className="absolute bg-white rounded-full"
              style={{
                width: `${headSize * 0.05}px`,
                height: `${headSize * 0.05}px`,
                left: '35%',
                top: '35%',
              }}
            ></div>
          </div>
          {/* 右眼 */}
          <div
            className="absolute bg-white rounded-full shadow-inner"
            style={{
              width: `${headSize * 0.25}px`,
              height: `${headSize * 0.3}px`,
              right: `${headSize * 0.2}px`,
              top: `${headSize * 0.35}px`,
            }}
          >
            <div
              className={`absolute ${colors.eyeColor} rounded-full`}
              style={{
                width: `${headSize * 0.12}px`,
                height: `${headSize * 0.15}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            ></div>
            <div
              className="absolute bg-white rounded-full"
              style={{
                width: `${headSize * 0.05}px`,
                height: `${headSize * 0.05}px`,
                left: '35%',
                top: '35%',
              }}
            ></div>
          </div>
        </>
      );
    }

    // 多眼怪物版本
    for (let i = 0; i < eyeCount; i++) {
      const angle = (i * 360) / eyeCount - 90; // 從頂部開始均勻分布
      const radius = headSize * 0.35;
      const x = Math.cos((angle * Math.PI) / 180) * radius + headSize / 2;
      const y = Math.sin((angle * Math.PI) / 180) * radius + headSize / 2;
      const eyeSize = evolution.stage >= 4 ? 0.2 : 0.22; // 後期眼睛稍小但更多

      eyes.push(
        <div
          key={i}
          className="absolute bg-white rounded-full shadow-lg"
          style={{
            width: `${headSize * eyeSize}px`,
            height: `${headSize * (eyeSize + 0.05)}px`,
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className={`absolute ${colors.eyeColor} rounded-full animate-pulse`}
            style={{
              width: `${headSize * (eyeSize * 0.5)}px`,
              height: `${headSize * (eyeSize * 0.6)}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          ></div>
        </div>
      );
    }

    return eyes;
  };

  // 渲染耳朵（後期會變成觸角）
  const renderEars = () => {
    if (evolution.stage >= 4) {
      // 變成詭異觸角
      return (
        <>
          {[...Array(evolution.stage >= 5 ? 4 : 2)].map((_, i) => {
            const isLeft = i % 2 === 0;
            const offset = Math.floor(i / 2) * 0.2;
            return (
              <div
                key={i}
                className={`absolute ${colors.bodyFrom} rounded-full shadow-lg animate-pulse`}
                style={{
                  width: `${earSize * 0.3}px`,
                  height: `${earSize * 2}px`,
                  [isLeft ? 'left' : 'right']: `${headSize * (0.1 + offset)}px`,
                  top: `-${earSize * 0.5}px`,
                  transform: `rotate(${isLeft ? -20 : 20}deg)`,
                  transformOrigin: 'bottom center',
                }}
              >
                <div
                  className={`absolute top-0 w-full ${colors.eyeColor} rounded-full`}
                  style={{ height: `${earSize * 0.3}px` }}
                ></div>
              </div>
            );
          })}
        </>
      );
    }

    // 正常貓耳朵
    return (
      <>
        {/* 左耳 */}
        <div
          className={`absolute bg-gradient-to-br ${colors.headFrom} ${colors.headTo} shadow-lg`}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${earSize / 2}px solid transparent`,
            borderRight: `${earSize / 2}px solid transparent`,
            borderBottom: `${earSize}px solid currentColor`,
            left: `${headSize * 0.15}px`,
            top: `-${earSize * 0.6}px`,
            transform: 'rotate(-15deg)',
          }}
        >
          <div
            className="absolute bg-pink-300"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${earSize * 0.25}px solid transparent`,
              borderRight: `${earSize * 0.25}px solid transparent`,
              borderBottom: `${earSize * 0.5}px solid currentColor`,
              left: '50%',
              top: '40%',
              transform: 'translateX(-50%)',
            }}
          ></div>
        </div>
        {/* 右耳 */}
        <div
          className={`absolute bg-gradient-to-br ${colors.headFrom} ${colors.headTo} shadow-lg`}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${earSize / 2}px solid transparent`,
            borderRight: `${earSize / 2}px solid transparent`,
            borderBottom: `${earSize}px solid currentColor`,
            right: `${headSize * 0.15}px`,
            top: `-${earSize * 0.6}px`,
            transform: 'rotate(15deg)',
          }}
        >
          <div
            className="absolute bg-pink-300"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${earSize * 0.25}px solid transparent`,
              borderRight: `${earSize * 0.25}px solid transparent`,
              borderBottom: `${earSize * 0.5}px solid currentColor`,
              left: '50%',
              top: '40%',
              transform: 'translateX(-50%)',
            }}
          ></div>
        </div>
      </>
    );
  };

  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-3xl shadow-lg border-2 ${colors.border} p-8`}>
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${evolution.stage >= 4 ? 'text-white' : 'text-gray-800'}`}>
          我的寵物：{evolution.name}
        </h2>
        <div className="flex justify-center gap-4 text-sm">
          <div className={`${evolution.stage >= 4 ? 'bg-black/40' : 'bg-white/80'} px-4 py-2 rounded-full border ${colors.border}`}>
            <span className={evolution.stage >= 4 ? 'text-gray-300' : 'text-gray-600'}>等級：</span>
            <span className={`font-bold ${colors.accentColor}`}>Lv.{growthLevel}</span>
          </div>
          <div className={`${evolution.stage >= 4 ? 'bg-black/40' : 'bg-white/80'} px-4 py-2 rounded-full border ${colors.border}`}>
            <span className={evolution.stage >= 4 ? 'text-gray-300' : 'text-gray-600'}>大小：</span>
            <span className={`font-bold ${colors.accentColor}`}>{petSize}px</span>
          </div>
        </div>
      </div>

      {/* 寵物顯示區域 */}
      <div
        className={`relative flex items-center justify-center bg-gradient-to-b ${
          evolution.stage >= 4 ? 'from-black/40 to-purple-900/40' : 'from-yellow-100/30 to-orange-200/30'
        } rounded-2xl overflow-hidden`}
        style={{
          minHeight: `${Math.max(petSize + 100, 300)}px`,
          padding: '40px'
        }}
      >
        {/* 詭異背景效果（高階段） */}
        {evolution.stage >= 3 && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-green-500/10 animate-pulse"></div>
        )}

        {/* 地面 */}
        <div className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t ${
          evolution.stage >= 4 ? 'from-purple-500/30' : 'from-orange-300/50'
        } to-transparent`}></div>

        {/* 貓咪本體 */}
        <div
          className="relative transition-all duration-500 ease-out"
          style={{
            width: `${petSize}px`,
            height: `${petSize}px`,
          }}
        >
          {/* 身體 */}
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-b ${colors.bodyFrom} ${colors.bodyTo} rounded-full shadow-lg ${
              evolution.stage >= 4 ? 'animate-pulse' : ''
            }`}
            style={{
              width: `${petSize * 0.65}px`,
              height: `${bodyHeight}px`,
            }}
          >
            {/* 身體紋路 */}
            {evolution.stage <= 2 && (
              <>
                <div className="absolute top-1/4 left-0 right-0 h-1 bg-black/10 rounded-full"></div>
                <div className="absolute top-2/4 left-0 right-0 h-1 bg-black/10 rounded-full"></div>
                <div className="absolute top-3/4 left-0 right-0 h-1 bg-black/10 rounded-full"></div>
              </>
            )}
          </div>

          {/* 頭部 */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-br ${colors.headFrom} ${colors.headTo} rounded-full shadow-xl border-4 ${colors.headBorder} ${
              evolution.stage >= 4 ? 'animate-pulse' : ''
            }`}
            style={{
              width: `${headSize}px`,
              height: `${headSize}px`,
              transform: `translateX(-50%) translateY(-${headSize * 0.2}px)`,
            }}
          >
            {/* 耳朵或觸角 */}
            {renderEars()}

            {/* 眼睛 */}
            {renderEyes()}

            {/* 嘴巴 - 逐漸變詭異 */}
            {evolution.stage <= 2 ? (
              <div
                className="absolute left-1/2 -translate-x-1/2 border-2 border-gray-700 rounded-full"
                style={{
                  width: `${headSize * 0.25}px`,
                  height: `${headSize * 0.12}px`,
                  bottom: `${headSize * 0.25}px`,
                  borderTop: 'none',
                }}
              ></div>
            ) : evolution.stage <= 4 ? (
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  width: `${headSize * 0.3}px`,
                  height: `${headSize * 0.05}px`,
                  bottom: `${headSize * 0.22}px`,
                  background: 'linear-gradient(to right, transparent, currentColor, transparent)',
                  borderRadius: '50%',
                }}
              ></div>
            ) : (
              // 詭異裂口
              <div className="absolute left-1/2 -translate-x-1/2 flex gap-1" style={{ bottom: `${headSize * 0.2}px` }}>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-black w-1 animate-pulse"
                    style={{
                      height: `${headSize * (0.1 + Math.random() * 0.1)}px`,
                    }}
                  ></div>
                ))}
              </div>
            )}

            {/* 鼻子 */}
            {evolution.stage <= 3 && (
              <div
                className={`absolute left-1/2 -translate-x-1/2 ${
                  evolution.stage <= 1 ? 'bg-pink-400' : colors.eyeColor
                } rounded-full`}
                style={{
                  width: `${headSize * 0.08}px`,
                  height: `${headSize * 0.06}px`,
                  bottom: `${headSize * 0.35}px`,
                }}
              ></div>
            )}
          </div>

          {/* 尾巴 */}
          <div
            className={`absolute bg-gradient-to-r ${colors.bodyFrom} ${colors.bodyTo} rounded-full shadow ${
              evolution.stage >= 4 ? 'animate-pulse' : ''
            }`}
            style={{
              width: `${petSize * 0.15}px`,
              height: `${petSize * 0.5}px`,
              right: `-${petSize * 0.1}px`,
              bottom: `${bodyHeight * 0.3}px`,
              transform: 'rotate(45deg)',
              transformOrigin: 'top center',
            }}
          ></div>
        </div>

        {/* 演化提示 */}
        {evolution.stage >= 2 && (
          <div className={`absolute top-4 right-4 ${
            evolution.stage >= 4 ? 'bg-purple-900/90 border-purple-500' : 'bg-white/90 border-purple-300'
          } backdrop-blur-sm px-4 py-2 rounded-full border-2 shadow-lg`}>
            <p className={`text-xs font-bold ${
              evolution.stage >= 4 ? 'text-green-400' : 'text-purple-700'
            }`}>
              {evolution.stage >= 5 ? '未知生命體' : evolution.stage >= 4 ? '詭異變化中...' : '開始變化了...'}
            </p>
          </div>
        )}
      </div>

      {/* 成長數據 */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className={`${evolution.stage >= 4 ? 'bg-black/40' : 'bg-white/60'} backdrop-blur-sm p-4 rounded-xl border ${colors.border}`}>
          <div className={`text-xs mb-1 ${evolution.stage >= 4 ? 'text-gray-300' : 'text-gray-600'}`}>累積時間貢獻</div>
          <div className="text-2xl font-bold text-indigo-600">
            {totalMinutes} <span className="text-sm font-normal text-gray-500">分鐘</span>
          </div>
          <div className={`text-xs mt-1 ${evolution.stage >= 4 ? 'text-gray-400' : 'text-gray-500'}`}>
            +{sizeFromMinutes}px 成長
          </div>
        </div>
        <div className={`${evolution.stage >= 4 ? 'bg-black/40' : 'bg-white/60'} backdrop-blur-sm p-4 rounded-xl border ${colors.border}`}>
          <div className={`text-xs mb-1 ${evolution.stage >= 4 ? 'text-gray-300' : 'text-gray-600'}`}>累積距離貢獻</div>
          <div className="text-2xl font-bold text-emerald-600">
            {totalKilometers.toFixed(2)} <span className="text-sm font-normal text-gray-500">公里</span>
          </div>
          <div className={`text-xs mt-1 ${evolution.stage >= 4 ? 'text-gray-400' : 'text-gray-500'}`}>
            +{sizeFromKilometers}px 成長
          </div>
        </div>
      </div>

      {/* 成長說明 */}
      <div className={`mt-4 ${evolution.stage >= 4 ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-sm p-4 rounded-xl border ${colors.border}`}>
        <p className={`text-xs text-center ${evolution.stage >= 4 ? 'text-gray-300' : 'text-gray-600'}`}>
          {evolution.stage >= 5
            ? '你的寵物已經進化成了未知的存在...'
            : evolution.stage >= 3
            ? '你的寵物正在經歷奇特的變化...'
            : '你的貓咪會隨著你的努力不斷成長！每累積 60 分鐘增加 5px，每跑 1 公里增加 3px'
          }
        </p>
      </div>
    </div>
  );
};

export default CatPet;
