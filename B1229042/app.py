from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_socketio import SocketIO, emit, join_room
import json
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 用於 session 加密
app.config['SECRET_KEY'] = 'secret!'  # 用於 SocketIO 加密
socketio = SocketIO(app)  # 初始化 SocketIO
messages = []

# 模擬的用戶資料
def load_users():
    try:
        with open('users.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_user(username, password):
    users = load_users()
    users[username] = password
    with open('users.json', 'w') as file:
        json.dump(users, file)

def load_messages():
    if os.path.exists('chathistory.json'):
        with open('chathistory.json', 'r', encoding='utf-8') as file:
            return json.load(file)
    return []

def save_message(message):
    messages = load_messages()
    messages.append(message)
    with open('chathistory.json', 'w', encoding='utf-8') as file:
        json.dump(messages, file, ensure_ascii=False, indent=4)

# 主頁
@app.route("/")
def home():
    if 'user' in session:
        return render_template("main.html", username=session['user'])
    return redirect(url_for('login'))

# 登入
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        users = load_users()

        # 驗證用戶名和密碼
        if username in users and users[username] == password:
            session['user'] = username
            flash('登入成功!', 'success')
            return redirect(url_for('home'))
        else:
            flash('無效的用戶名或密碼!', 'error')

    return render_template('login.html')

# 註冊
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        users = load_users()

        # 檢查用戶是否已存在
        if username in users:
            flash('該用戶名已被使用，請選擇其他名稱。', 'error')
            return redirect(url_for('register'))
        
        # 將新用戶加入 JSON
        save_user(username, password)
        flash('註冊成功！現在您已登入。', 'success')
        session['user'] = username
        return redirect(url_for('home'))

    return render_template("register.html")

# 聯繫我
@app.route('/contact')
def contact():
    if 'user' not in session:
        flash('請先登入!', 'warning')
        return redirect(url_for('login'))
    return render_template('contactme.html', username=session['user'])

# 聊天室
@app.route('/chatroom')
def chatroom():
    if 'user' not in session:
        flash('請先登入!', 'warning')
        return redirect(url_for('login'))
    messages = load_messages()
    return render_template('chat.html', username=session['user'], messages=messages)

# WebSocket 處理
@socketio.on('join')
def handle_join(data):
    username = data['username']
    join_room('global')
    emit('message', {'username': '系統', 'message': f'{username} 加入聊天室！'}, room='global')

@socketio.on('send_message')
def handle_message(data):
    username = data['username']
    message = data['message']
    msg_data = {'username': username, 'message': message}

    # 儲存訊息到 JSON 文件
    save_message(msg_data)
    emit('message', msg_data, room='global')
# 登出
@app.route('/logout')
def logout():
    session.pop('user', None)
    flash('登出成功!', 'info')
    return redirect(url_for('login'))

# 主程式執行
if __name__ == "__main__":
    socketio.run(app, debug=True)  # 使用 socketio.run 啟動
