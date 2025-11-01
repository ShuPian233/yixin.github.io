// 字体切换功能
document.addEventListener('DOMContentLoaded', function() {
    const fontToggle = document.getElementById('fontToggle');
    const fontOptions = document.getElementById('fontOptions');
    const fontButtons = document.querySelectorAll('.font-options button');
    
    // 从本地存储获取保存的字体
    const savedFont = localStorage.getItem('selectedFont') || 'default';
    applyFont(savedFont);
    
    // 切换字体选项显示/隐藏
    fontToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        fontOptions.classList.toggle('active');
    });
    
    // 字体选择
    fontButtons.forEach(button => {
        button.addEventListener('click', function() {
            const font = this.getAttribute('data-font');
            console.log('切换字体:', font); // 调试信息
            applyFont(font);
            fontOptions.classList.remove('active');
            
            // 保存到本地存储
            localStorage.setItem('selectedFont', font);
        });
    });
    
    // 点击页面其他地方关闭字体选项
    document.addEventListener('click', function() {
        fontOptions.classList.remove('active');
    });
    
    // 阻止字体选项内部的点击事件冒泡
    fontOptions.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 应用字体函数
    function applyFont(font) {
        console.log('应用字体:', font); // 调试信息
        
        // 移除所有字体类
        document.body.classList.remove('font-jingangtie', 'font-mc', 'font-kuanmaobi');
        
        // 添加选中的字体类
        if (font !== 'default') {
            document.body.classList.add(`font-${font}`);
        }
        
        // 更新按钮文本显示当前字体
        const fontNames = {
            'default': '默认字体',
            'jingangtie': '金刚贴体',
            'mc': 'MC字体',
            'kuanmaobi': '宽毛笔体',
            'shouxieti': '手写体',
        };
        
        const currentFontName = fontNames[font] || '默认字体';
        fontToggle.innerHTML = `字体: ${currentFontName}`;
        
        console.log('当前字体类:', document.body.className); // 调试信息
    }
    
    // 调试：检查字体切换器元素
    console.log('字体切换器元素:', fontToggle);
    console.log('字体选项元素:', fontOptions);
    console.log('字体按钮数量:', fontButtons.length);
});