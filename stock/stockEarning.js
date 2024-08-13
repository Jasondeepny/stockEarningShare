document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    const generateButton = document.getElementById('generateButton');
    const backgroundImageInput = document.getElementById('backgroundImage');
    const downloadLink = document.getElementById('downloadLink');

    // 预加载图片
    const avatarImg = new Image();
    avatarImg.src = 'path/to/avatar.png'; // 替换为实际的头像图片路径

    const bottomLeftImg = new Image();
    bottomLeftImg.src = 'path/to/bottom_left.png'; // 替换为实际的底部左侧图片路径

    const bottomRightImg = new Image();
    bottomRightImg.src = 'path/to/bottom_right.png'; // 替换为实际的底部右侧图片路径

    const qrCodeImg = new Image();
    qrCodeImg.src = 'path/to/qr_code.png'; // 替换为实际的二维码图片路径


    function generateImage() {
        console.log("生成图片函数被调用");

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 获取输入值
        const username = document.getElementById('username').value;
        const date = document.getElementById('date').value;
        const amount = document.getElementById('amount').value;
        const stockName = document.getElementById('stockName').value;
        const percentage = document.getElementById('percentage').value;
        const currentPrice = document.getElementById('currentPrice').value;
        const costPrice = document.getElementById('costPrice').value;

        console.log("输入值:", { username, date, amount, stockName, percentage, currentPrice, costPrice });

        // 绘制背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 设置画布大小
        canvas.width = 600;
        canvas.height = 800;

        // 绘制白色背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制头像和用户名
        ctx.beginPath();
        ctx.arc(50, 50, 40, 0, Math.PI * 2);
        ctx.fillStyle = '#f0f0f0';
        ctx.fill();
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(username, 100, 60);

        // 绘制日期
        ctx.font = '18px Arial';
        ctx.fillStyle = '#666666';
        ctx.fillText(date, 100, 90);

        // 绘制累计盈佣
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(20, 120, 560, 60);
        ctx.font = '18px Arial';
        ctx.fillStyle = '#666666';
        ctx.fillText(`累计盈佣: ${amount} USD`, 40, 155);

        // 绘制股票信息
        ctx.font = 'bold 28px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(stockName, 20, 240);

        ctx.font = 'bold 72px Arial';
        ctx.fillStyle = percentage >= 0 ? '#4CAF50' : '#FF0000';
        ctx.fillText(`${percentage}%`, 20, 330);

        ctx.font = '24px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(`现价 ${currentPrice} USD`, 20, 380);
        ctx.fillText(`成本 ${costPrice} USD`, 20, 420);

        // 绘制底部图片（这里用简单的形状代替）
        ctx.fillStyle = '#e0f0e0';
        ctx.fillRect(20, 460, 270, 200);
        ctx.fillRect(310, 460, 270, 200);

        // 绘制LONGBRIDGE logo
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText('LONGBRIDGE', 20, 720);

        // 绘制二维码占位符
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(460, 680, 100, 100);

        console.log("图片生成完成");
        console.log("图片生成完成");

        // 更新下载链接
        updateDownloadLink();
    }

    function updateDownloadLink() {
        console.log("更新下载链接");
        downloadLink.href = canvas.toDataURL('image/png');
    }

    // 为生成按钮添加事件监听器
    if (generateButton) {
        generateButton.addEventListener('click', generateImage);
    } else {
        console.error("生成按钮未找到");
    }

    // 添加背景图片功能
    if (backgroundImageInput) {
        backgroundImageInput.addEventListener('change', function (e) {
            console.log("背景图片被选择");
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = function (event) {
                    const img = new Image();
                    img.onload = function () {
                        console.log("背景图片加载完成");
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        generateImage(); // 重新绘制其他元素
                    }
                    img.src = event.target.result;
                }

                reader.readAsDataURL(file);
            }
        });
    } else {
        console.error("背景图片输入元素未找到");
    }

    console.log("脚本初始化完成");
});