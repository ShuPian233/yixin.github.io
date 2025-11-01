// script.js - 404页面交互逻辑
//JavaScript中，跳转网页（即重定向）有多种方法。以下是一些常见的方法：
//使用 window.location.href
//使用 window.location.replace
//使用 window.location.assign
//使用 window.open（打开新窗口或标签页）
//使用 meta 标签（不是JavaScript，但也是常用方法，在此一并提及）
//这些方法的示例代码。
//1. 使用 window.location.href
//这是最常见的方法，它会在当前窗口加载新的页面。
//window.location.href = "https://www.example.com";
//2. 使用 window.location.replace
//这个方法会替换当前页面在历史记录中的位置，因此用户不能通过点击后退按钮返回到前一个页面。
//window.location.replace("https://www.example.com");
//3. 使用 window.location.assign
//这个方法会加载一个新的文档，和href类似，但可以通过后退按钮返回。
//window.location.assign("https://www.example.com");
//4. 使用 window.open
//这个方法会打开一个新的浏览器窗口或标签页，取决于浏览器的设置。
//window.open("https://www.example.com", "_blank");


// 背景图片数组 - 可以添加更多图片URL
const backgroundImages = [
    './photo/bg1.jpg',
    './photo/bg2.jpg',
     // 添加更多本地图片路径，确保这些图片确实存在于photo文件夹中
];

// 彩蛋相关变量
let clickCount = 0;
const triggerCount = 5;

/// 修改setRandomBackground函数，移除Unsplash的参数
function setRandomBackground() {
    // 从图片数组中随机选择一张
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const selectedImage = backgroundImages[randomIndex];
    
    // 直接使用本地图片路径，不需要额外参数
    document.body.style.backgroundImage = `url(${selectedImage})`;
}
    


// 彩蛋点击计数器
function handleEasterEggClick() {
    clickCount++;
    console.log(`点击次数: ${clickCount}`); // 调试信息
    
    // 添加点击动画效果
    this.style.transform = 'scale(1.1)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    
    // 如果达到触发次数，显示彩蛋
    if (clickCount >= triggerCount) {
        showEasterEgg();
        clickCount = 0; // 重置计数器
    }
}

// 显示彩蛋弹窗
function showEasterEgg() {
    console.log("显示彩蛋!"); // 调试信息
    document.getElementById('easterEggModal').classList.add('active');
}

// 隐藏彩蛋弹窗
function hideEasterEgg() {
    document.getElementById('easterEggModal').classList.remove('active');
}

// 页面加载完成后初始化
function init() {
    console.log("页面初始化"); // 调试信息
    
    // 设置随机背景
    setRandomBackground();
    
    // 获取DOM元素
    const errorCode = document.getElementById('errorCode');
    const easterEggModal = document.getElementById('easterEggModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    // 检查元素是否存在
    if (!errorCode) {
        console.error("找不到errorCode元素!");
        return;
    }
    
    if (!easterEggModal) {
        console.error("找不到easterEggModal元素!");
        return;
    }
    
    // 添加事件监听器
    errorCode.addEventListener('click', handleEasterEggClick);
    closeModalBtn.addEventListener('click', hideEasterEgg);
    
    // 点击弹窗外部关闭弹窗
    easterEggModal.addEventListener('click', function(e) {
        if (e.target === easterEggModal) {
            hideEasterEgg();
        }
    });
    
    // 按钮功能设置
    document.getElementById('homeBtn').addEventListener('click', function() {
        // 返回主页功能 - 这里设置为跳转到根路径
        window.location.href = '/';
    });

    // 为其他按钮添加示例功能
    document.getElementById('btn1').addEventListener('click', function() {
        window.open("https://www.crazygames.com/", "_blank");
    });

    document.getElementById('btn2').addEventListener('click', function() {
        window.location.href = "CPS.html";
    });

    document.getElementById('btn3').addEventListener('click', function() {
        window.location.href = "https://vercel.uta.mrxiaom.top/";
    });
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);

// 窗口大小变化时调整背景图片尺寸
window.addEventListener('resize', setRandomBackground);