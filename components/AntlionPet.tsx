import React from 'react';

interface AntlionPetProps {
  totalMinutes: number;
  totalKilometers: number;
}

const AntlionPet: React.FC<AntlionPetProps> = ({ totalMinutes, totalKilometers }) => {
  // 計算寵物大小：基於總時間（分鐘）和總公里數
  // 基礎大小 100px，每 60 分鐘增加 5px，每 1 公里增加 3px
  const baseSize = 100;
  const sizeFromMinutes = Math.floor(totalMinutes / 60) * 5;
  const sizeFromKilometers = Math.floor(totalKilometers) * 3;
  const petSize = baseSize + sizeFromMinutes + sizeFromKilometers;

  // 計算成長等級（用於顯示）
  const growthLevel = Math.floor(petSize / 50);

  // 根據大小調整不同部位的比例
  const bodyScale = Math.min(petSize / 100, 3); // 最多放大3倍相對比例
  const headSize = petSize * 0.6; // 頭部是身體的 60%
  const bodyHeight = petSize * 0.8; // 身體高度
  const legSpacing = petSize * 0.15; // 腿的間距

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg border-2 border-amber-200 p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">我的蟻獅寵物</h2>
        <div className="flex justify-center gap-4 text-sm">
          <div className="bg-white/80 px-4 py-2 rounded-full border border-amber-200">
            <span className="text-gray-600">等級：</span>
            <span className="font-bold text-amber-600">Lv.{growthLevel}</span>
          </div>
          <div className="bg-white/80 px-4 py-2 rounded-full border border-amber-200">
            <span className="text-gray-600">大小：</span>
            <span className="font-bold text-emerald-600">{petSize}px</span>
          </div>
        </div>
      </div>

      {/* 寵物顯示區域 */}
      <div
        className="relative flex items-center justify-center bg-gradient-to-b from-yellow-100/30 to-amber-200/30 rounded-2xl overflow-hidden"
        style={{
          minHeight: `${Math.max(petSize + 100, 300)}px`,
          padding: '40px'
        }}
      >
        {/* 地面 */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-300/50 to-transparent"></div>

        {/* 蟻獅本體 - Q版設計 */}
        <div
          className="relative transition-all duration-500 ease-out"
          style={{
            width: `${petSize}px`,
            height: `${petSize}px`,
          }}
        >
          {/* 身體（橢圓形） */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-amber-600 to-amber-700 rounded-full shadow-lg"
            style={{
              width: `${petSize * 0.7}px`,
              height: `${bodyHeight}px`,
            }}
          >
            {/* 身體條紋 */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-amber-800/30 rounded-full"></div>
            <div className="absolute top-2/4 left-0 right-0 h-1 bg-amber-800/30 rounded-full"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-amber-800/30 rounded-full"></div>
          </div>

          {/* 頭部（圓形，超大頭） */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-xl border-4 border-amber-400"
            style={{
              width: `${headSize}px`,
              height: `${headSize}px`,
              transform: `translateX(-50%) translateY(-${headSize * 0.2}px)`,
            }}
          >
            {/* 眼睛 */}
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
                className="absolute bg-gray-800 rounded-full"
                style={{
                  width: `${headSize * 0.12}px`,
                  height: `${headSize * 0.15}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>
              {/* 高光 */}
              <div
                className="absolute bg-white rounded-full"
                style={{
                  width: `${headSize * 0.06}px`,
                  height: `${headSize * 0.06}px`,
                  left: '30%',
                  top: '30%',
                }}
              ></div>
            </div>
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
                className="absolute bg-gray-800 rounded-full"
                style={{
                  width: `${headSize * 0.12}px`,
                  height: `${headSize * 0.15}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>
              {/* 高光 */}
              <div
                className="absolute bg-white rounded-full"
                style={{
                  width: `${headSize * 0.06}px`,
                  height: `${headSize * 0.06}px`,
                  left: '30%',
                  top: '30%',
                }}
              ></div>
            </div>

            {/* 嘴巴（微笑） */}
            <div
              className="absolute left-1/2 -translate-x-1/2 border-2 border-amber-800 rounded-full"
              style={{
                width: `${headSize * 0.3}px`,
                height: `${headSize * 0.15}px`,
                bottom: `${headSize * 0.25}px`,
                borderTop: 'none',
                borderColor: '#78350f',
              }}
            ></div>

            {/* 觸鬚 */}
            <div
              className="absolute bg-amber-700 rounded-full"
              style={{
                width: `${headSize * 0.08}px`,
                height: `${headSize * 0.4}px`,
                left: `${headSize * 0.15}px`,
                top: `${headSize * 0.05}px`,
                transform: 'rotate(-30deg)',
                transformOrigin: 'top center',
              }}
            >
              <div
                className="absolute top-0 w-full h-3 bg-amber-800 rounded-full"
                style={{ height: `${headSize * 0.08}px` }}
              ></div>
            </div>
            <div
              className="absolute bg-amber-700 rounded-full"
              style={{
                width: `${headSize * 0.08}px`,
                height: `${headSize * 0.4}px`,
                right: `${headSize * 0.15}px`,
                top: `${headSize * 0.05}px`,
                transform: 'rotate(30deg)',
                transformOrigin: 'top center',
              }}
            >
              <div
                className="absolute top-0 w-full h-3 bg-amber-800 rounded-full"
                style={{ height: `${headSize * 0.08}px` }}
              ></div>
            </div>
          </div>

          {/* 腿部（6隻腿） */}
          {[...Array(6)].map((_, i) => {
            const side = i < 3 ? -1 : 1; // 左右兩側
            const index = i % 3;
            const angle = side * (20 + index * 15);
            return (
              <div
                key={i}
                className="absolute bg-amber-700 rounded-full shadow"
                style={{
                  width: `${petSize * 0.08}px`,
                  height: `${petSize * 0.4}px`,
                  left: side < 0 ? `${legSpacing}px` : 'auto',
                  right: side > 0 ? `${legSpacing}px` : 'auto',
                  bottom: `${bodyHeight * 0.2 + index * (bodyHeight * 0.2)}px`,
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'top center',
                }}
              ></div>
            );
          })}
        </div>

        {/* 成長提示 */}
        {growthLevel > 0 && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-amber-300 shadow-lg">
            <p className="text-xs font-bold text-amber-700">
              🌟 已成長 {growthLevel} 階段！
            </p>
          </div>
        )}
      </div>

      {/* 成長數據 */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-amber-200">
          <div className="text-xs text-gray-600 mb-1">累積時間貢獻</div>
          <div className="text-2xl font-bold text-indigo-600">
            {totalMinutes} <span className="text-sm font-normal text-gray-500">分鐘</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            +{sizeFromMinutes}px 成長
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-amber-200">
          <div className="text-xs text-gray-600 mb-1">累積距離貢獻</div>
          <div className="text-2xl font-bold text-emerald-600">
            {totalKilometers.toFixed(2)} <span className="text-sm font-normal text-gray-500">公里</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            +{sizeFromKilometers}px 成長
          </div>
        </div>
      </div>

      {/* 成長說明 */}
      <div className="mt-4 bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-amber-200">
        <p className="text-xs text-gray-600 text-center">
          💡 你的蟻獅會隨著你的努力不斷成長！每累積 60 分鐘增加 5px，每跑 1 公里增加 3px，成長無上限！
        </p>
      </div>
    </div>
  );
};

export default AntlionPet;
