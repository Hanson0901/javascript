$(document).ready(function () {
    let lastScrollTop = 0;
    $(window).on('scroll', function () {
        let scrollTop = $(this).scrollTop();

        if (scrollTop > lastScrollTop) {
            // Scroll down - hide header, nav, and footer
            $('#header').css('top', '-80px');
            $('#nav').css('top', '-80px');
            $('#footer').css('bottom', '-90px');
        } else {
            // Scroll up - show header, nav, and footer
            $('#header').css('top', '0');
            $('#nav').css('top', '50px');
            $('#footer').css('bottom', '0');
        }

        lastScrollTop = scrollTop;
    });
    // 點擊圖片顯示模態框
    $(".gallery-item img").click(function () {
        const imageUrl = $(this).attr("src");
        $("body").append(`
            <div class="modal">
                <span class="modal-close">&times;</span>
                <img src="${imageUrl}" alt="Expanded Image">
            </div>
        `);
        $(".modal").fadeIn();
    });

    // 點擊關閉模態框
    $(document).on("click", ".modal-close, .modal", function () {
        $(".modal").fadeOut(function () {
            $(this).remove();
        });
    });
    $(".gallery-it img").click(function () {
        const imageUrl = $(this).attr("src");
        const captionText = $(this).data("caption") || "No caption provided"; // 獲取文字描述

        $("body").append(`
            <div class="modal">
                <span class="modal-close">&times;</span>
                <img src="${imageUrl}" alt="Expanded Image">
                <div class="modal-caption">${captionText}</div>
            </div>
        `);
        $(".modal").fadeIn();
    });

    // 點擊關閉模態框
    $(document).on("click", ".modal-close, .modal", function () {
        $(".modal").fadeOut(function () {
            $(this).remove();
        });
    });
    
    let clickCount = 0; // 記錄點擊次數
    let alertTriggered1 = false; // 記錄 alert 是否已經觸發過
    let alertTriggered2 = false;
    const targetImage = $("img[src='https://image.businessfocus.io/wp-content/uploads/2024/12/17576780.jpeg?auto=format&w=2880']"); // 目標圖片
    
    targetImage.on("click", function () {
        clickCount++; // 每次點擊增加計數
        console.log(`已點擊 ${clickCount} 次`);
    
        if (clickCount >= 10 && !alertTriggered1) {
            alertTriggered1 = true; // 標記 alert 已觸發
            // 切換鼠標樣式
            $("body").css("cursor", "url('/static/Just a Chill Guy 3D Meme Animated--pointer--SweezyCursors.cur'), auto");
    
            alert("你已經點擊超過 10 次！鼠標已更改！");
        }
        if (clickCount >= 24 && !alertTriggered2) {
            alertTriggered2 = true; // 標記 alert 已觸發
            // 切換鼠標樣式
            $("body").css("cursor", "url('/static/Christmas Just a Chill Guy Meme Animated--pointer--SweezyCursors.cur'), auto");
    
            alert("你已經點擊超過 24 次！Marry ChristMas！");
        }
    });
    document.addEventListener("DOMContentLoaded", () => {
        const socket = io();
        const messages = document.getElementById("messages");
        const messageInput = document.getElementById("message-input");
        const sendButton = document.getElementById("send-button");
    
        // 模擬使用者名稱
        const username = prompt("請輸入您的名稱") || "匿名";
    
        // 加入聊天室
        socket.emit('join', { username });
    
        // 接收訊息並顯示
        socket.on('message', (data) => {
            const messageBubble = document.createElement("div");
            messageBubble.className = "message-bubble";
            messageBubble.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
            messages.appendChild(messageBubble);
            messages.scrollTop = messages.scrollHeight;
        });
    
        // 發送訊息
        sendButton.addEventListener("click", () => {
            const message = messageInput.value.trim();
            if (message) {
                socket.emit('message', { username, message });
                messageInput.value = "";
            }
        });
    
        // 按下 Enter 鍵發送訊息
        messageInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") sendButton.click();
        });
    });
    
    

    
});
