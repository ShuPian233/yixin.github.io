// 循环打字效果
function typeWriterLoop(element, texts, speed, delayBetween) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = texts[textIndex];
    
    function type() {
        if (isDeleting) {
            // 删除模式
            if (charIndex > 0) {
                element.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="cursor"></span>';
                charIndex--;
                setTimeout(type, speed / 2);
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                currentText = texts[textIndex];
                setTimeout(type, delayBetween);
            }
        } else {
            // 打字模式
            if (charIndex < currentText.length) {
                element.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="cursor"></span>';
                charIndex++;
                setTimeout(type, speed);
            } else {
                isDeleting = true;
                setTimeout(type, delayBetween * 2);
            }
        }
    }
    
    // 开始打字效果
    type();
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化循环打字效果
    const typingText = document.getElementById('typing-text');
    const textsToType = [
        "专业网络安全解决方案提供商，致力于保护您的数字资产安全，构建可信赖的网络环境。",
        "我们提供全方位的网络安全服务，包括安全评估、渗透测试和安全体系建设。",
        "拥有资深安全专家团队，10年以上行业经验，为您的业务保驾护航。"
    ];
    
    // 添加初始光标
    typingText.innerHTML = '<span class="cursor"></span>';
    
    // 延迟开始打字效果
    setTimeout(function() {
        typeWriterLoop(typingText, textsToType, 80, 2000);
    }, 1000);
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 返回顶部按钮显示/隐藏
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // 高亮当前导航项
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenu = document.getElementById('closeMenu');
    
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeMenu.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // 点击导航链接时关闭移动菜单
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 表单提交
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const formMessage = document.getElementById('formMessage');
        
        // 显示加载状态
        submitBtn.disabled = true;
        btnText.textContent = '提交中...';
        submitBtn.insertAdjacentHTML('afterbegin', '<span class="loading"></span>');
        
        // 模拟表单提交
        setTimeout(function() {
            // 移除加载状态
            submitBtn.disabled = false;
            submitBtn.querySelector('.loading').remove();
            btnText.textContent = '提交咨询';
            
            // 显示成功消息
            formMessage.textContent = '感谢您的咨询，我们会尽快与您联系！';
            formMessage.className = 'form-message success';
            
            // 重置表单
            document.getElementById('contactForm').reset();
            
            // 3秒后隐藏消息
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 3000);
        }, 1500);
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 返回顶部功能
    document.getElementById('backToTop').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 初始化页面加载动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有服务卡片和团队成员卡片
    document.querySelectorAll('.service-card, .team-member').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
