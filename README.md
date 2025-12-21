# Novel Reward System

小說獎勵計時器 - 一個幫助你透過學習和運動來賺取閱讀小說時間的生產力系統。

## 功能特色

- 📚 追蹤學習和運動時數/公里數
- ⏰ 自動計算可用的小說閱讀時間
- 📱 PWA 支援，可安裝到手機桌面
- 🎨 使用自訂 app_icon 作為應用圖示

## 本地運行

**前置需求:** Node.js

1. 安裝依賴套件：
   ```bash
   npm install
   ```

2. 在 `.env.local` 設置你的 `GEMINI_API_KEY`

3. 運行開發伺服器：
   ```bash
   npm run dev
   ```

## 部署到 GitHub Pages

### 步驟 1：在 GitHub 創建新倉庫

1. 前往 [GitHub](https://github.com/new)
2. 創建名為 `novel-reward-system` 的新倉庫（或其他名稱）
3. 不要初始化 README、.gitignore 或 license

### 步驟 2：推送代碼到 GitHub

```bash
# 添加遠端倉庫（替換成你的 GitHub 用戶名）
git remote add origin https://github.com/你的用戶名/novel-reward-system.git

# 推送代碼
git push -u origin main
```

### 步驟 3：啟用 GitHub Pages

1. 前往你的 GitHub 倉庫
2. 點擊 `Settings` > `Pages`
3. 在 `Source` 下選擇 `GitHub Actions`
4. GitHub Actions 會自動觸發部署

部署完成後，你的應用會在：
`https://你的用戶名.github.io/novel-reward-system/`

### 重要提醒

如果你的倉庫名稱不是 `novel-reward-system`，請修改 `vite.config.ts` 中的 `base` 路徑：

```typescript
base: mode === 'production' ? '/你的倉庫名稱/' : '/',
```

## PWA 圖示

此專案使用 `app_icon.jpeg` 生成多種尺寸的 PWA 圖示。如需重新生成圖示：

```bash
npm run generate-icons
```

## 技術棧

- React 19
- TypeScript
- Vite
- Tailwind CSS
- PWA (Progressive Web App)
# novel-timer
# novel-timer
