簡介

這是一個基於 Flask 和 Flask-SocketIO 的簡單網頁，提供了用戶介紹、註冊、登入、聊天室功能，以及 WebSocket 實時通信功能。

安裝指南

1. 克隆本項目

git clone <repository_url>
cd <project_directory>

2. 創建虛擬環境（可選）

建議使用虛擬環境來隔離依賴環境：

python -m venv venv
source venv/bin/activate # Linux/Mac
venv\Scripts\activate  # Windows

3. 安裝依賴

請確保已安裝 Python 3.6 或更高版本，然後運行以下命令來安裝必要的依賴：

pip install flask flask-socketio

使用說明

1. 啟動服務

運行以下命令以啟動應用：

python app.py

2. 打開瀏覽器訪問

默認情況下，應用將在本地啟動，訪問地址為：

http://127.0.0.1:5000

3. 功能簡介

首頁：用戶登錄後可訪問主頁。

登入：提供用戶登入功能。

註冊：新用戶可以創建帳號。

聊天室：使用 WebSocket 實現實時聊天。

聯繫我：展示聯繫頁面。

文件結構

app.py：應用主程式，包含所有後端邏輯。

templates/：存放 HTML 模板文件。

static/：存放靜態資源（如 CSS、JavaScript 等）。

users.json：用於儲存用戶數據的 JSON 文件。

chathistory.json：用於儲存聊天歷史的 JSON 文件。

注意事項

圖片來源

項目中所有展示的圖片均為網絡獲取，作者對其內容不承擔任何責任。

依賴管理

若新增依賴，請確保更新 requirements.txt 文件：

pip freeze > requirements.txt

安全建議

請替換 app.secret_key 和 app.config['SECRET_KEY'] 的默認值，提升安全性。

確保用戶數據存儲文件（如 users.json）安全，不被外部未授權訪問。

聯繫方式

如有問題，請聯繫 [你的聯繫方式或 GitHub 項目鏈接]。

感謝您的使用！