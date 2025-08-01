// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    initSmoothScroll();
    
    // 导航栏滚动效果
    initNavbarScroll();
    
    // 粒子效果
    initParticleEffect();
    
    // 按钮点击效果
    initButtonEffects();
    
    // 卡片悬停效果
    initCardEffects();
    
    // 打字机效果
    initTypewriterEffect();
    
    // 产品导航功能
    initProductNavigation();
    

});

// 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 更新活跃导航链接
                updateActiveNavLink(this);
            }
        });
    });
}

// 更新活跃导航链接
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// 导航栏滚动效果 - 优化性能
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // 根据滚动方向显示/隐藏导航栏
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // 更新活跃部分
        updateActiveSection();
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// 更新活跃部分
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 粒子效果 - 优化性能
function initParticleEffect() {
    const particleContainer = document.querySelector('.floating-particles');
    
    // 减少粒子数量来提升性能
    for (let i = 0; i < 10; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机位置和颜色
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${randomColor};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 10px ${randomColor};
        animation: particleMove ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // 动画结束后重新创建
    particle.addEventListener('animationend', () => {
        particle.remove();
        createParticle(container);
    });
}

// 按钮点击效果
function initButtonEffects() {
    const buttons = document.querySelectorAll('button, .btn, .nav-link, .product-card, .team-card, .contact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建波纹效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // 处理按钮点击跳转逻辑
            if (this.textContent.trim() === '了解更多') {
                // 跳转到介绍页面
                setTimeout(() => {
                    const aboutSection = document.querySelector('#about');
                    if (aboutSection) {
                        const offsetTop = aboutSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // 更新导航栏活跃状态
                        const aboutNavLink = document.querySelector('a[href="#about"]');
                        if (aboutNavLink) {
                            updateActiveNavLink(aboutNavLink);
                        }
                    }
                }, 300); // 延迟300ms让波纹效果完成
            } else if (this.textContent.trim() === '开始探索') {
                // 跳转到探索页面
                setTimeout(() => {
                    showExplorePage();
                }, 300);
            } else if (this.textContent.trim() === '了解详情' && this.classList.contains('btn-product')) {
                // 处理产品详情按钮点击
                e.stopPropagation(); // 阻止事件冒泡到父元素
                setTimeout(() => {
                    const productId = this.getAttribute('data-product');
                    if (productId) {
                        showProductDetail(productId);
                    }
                }, 300);
            }
        });
    });
}

// 卡片悬停效果（优化版）
function initCardEffects() {
    const cards = document.querySelectorAll('.about-card, .product-card');
    
    cards.forEach(card => {
        let isHovering = false;
        let animationId = null;
        
        card.addEventListener('mouseenter', function() {
            isHovering = true;
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            isHovering = false;
            this.style.transform = 'translateY(0)';
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
        
        // 简化的鼠标移动效果，使用节流
        let lastMoveTime = 0;
        card.addEventListener('mousemove', function(e) {
            const now = Date.now();
            if (now - lastMoveTime < 16) return; // 限制到60fps
            lastMoveTime = now;
            
            if (!isHovering) return;
            
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            animationId = requestAnimationFrame(() => {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = Math.max(-5, Math.min(5, (y - centerY) / 20));
                const rotateY = Math.max(-5, Math.min(5, (centerX - x) / 20));
                
                this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
    });
}

// 打字机效果
function initTypewriterEffect() {
    const heroDescription = document.querySelector('.hero-description');
    const text = heroDescription.textContent;
    heroDescription.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroDescription.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // 延迟开始打字机效果
    setTimeout(typeWriter, 1000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes particleMove {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #00ffff !important;
        text-shadow: 0 0 10px #00ffff !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    .particle {
        pointer-events: none;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// 页面加载动画
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroButtons = document.querySelector('.hero-buttons');
    const hologram = document.querySelector('.hologram');
    
    // 添加加载动画类
    heroTitle.style.animation = 'fadeInUp 1s ease-out';
    heroButtons.style.animation = 'fadeInUp 1s ease-out 0.5s both';
    hologram.style.animation = 'fadeInRight 1s ease-out 1s both';
});

// 添加淡入动画
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    /* 确保动画元素在完成后保持可见 */
    .about-card.animated,
    .product-card.animated,
    .section-title.animated {
        opacity: 1 !important;
        animation-fill-mode: forwards;
    }
    
    /* 平滑过渡效果 */
    .about-card,
    .product-card,
    .section-title {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(fadeInStyle);

// 滚动时的元素动画（优化版）
function initScrollAnimations() {
    // 检查是否支持Intersection Observer
    if (!('IntersectionObserver' in window)) {
        return; // 不支持则跳过动画
    }
    
    const observerOptions = {
        threshold: 0.15, // 提高阈值减少触发频率
        rootMargin: '0px 0px -50px 0px' // 减少边距
    };
    
    let isScrolling = false;
    const observer = new IntersectionObserver((entries) => {
        // 使用requestAnimationFrame优化性能
        if (!isScrolling) {
            requestAnimationFrame(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 简化动画，只设置透明度和类名
                        entry.target.style.opacity = '1';
                        entry.target.classList.add('animated');
                        // 停止观察已动画的元素
                        observer.unobserve(entry.target);
                    }
                });
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, observerOptions);
    
    // 只观察主页面的元素，详情页面不需要滚动动画
    const animateElements = document.querySelectorAll('.about-card, .product-card, .section-title');
    animateElements.forEach(el => {
        // 检查元素是否已经在视口中
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
            // 如果已经在视口中，直接显示
            el.style.opacity = '1';
            el.classList.add('animated');
        } else {
            // 否则隐藏并观察
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.6s ease-out';
        }
        
        observer.observe(el);
    });
}

// 初始化滚动动画
setTimeout(initScrollAnimations, 100);

// 鼠标跟随效果
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #00ffff 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursor2 = document.querySelector('.cursor');
    cursor2.style.left = e.clientX - 10 + 'px';
    cursor2.style.top = e.clientY - 10 + 'px';
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// 全局变量记录来源页面
let previousPageContext = null;

// 产品导航功能
function initProductNavigation() {
    // 超级学霸产品卡片点击跳转到超级学霸页面
    const superScholarCard = document.querySelector('.product-card.super-scholar');
    if (superScholarCard) {
        superScholarCard.addEventListener('click', function() {
            // 记录来源为产品模块
            previousPageContext = 'products';
            console.log('超级学霸产品卡片被点击，设置来源为:', previousPageContext);
            showSuperScholarPage();
        });
    }
    
    // 关于我们卡片点击事件
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            // 记录来源为关于模块
            previousPageContext = 'about';
            console.log('关于卡片被点击:', cardTitle, '设置来源为:', previousPageContext);
            if (cardTitle === '超级学霸') {
                showSuperScholarPage();
            } else if (cardTitle === '商业新秀') {
                showBusinessStarPage();
            } else if (cardTitle === '投资大佬') {
                showInvestmentMasterPage();
            } else if (cardTitle === '科技新秀') {
                showTechStarPage();
            }
        });
    });
    
    // 产品卡片点击跳转（排除按钮点击）
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是按钮，不处理卡片点击事件
            if (e.target.classList.contains('btn-product') || e.target.closest('.btn-product')) {
                return;
            }
            const productId = this.getAttribute('data-product-id');
            if (productId) {
                // 记录来源为产品模块
                previousPageContext = 'products';
                showProductDetail(productId);
            }
        });
    });
    
    // 页脚产品链接点击跳转
    const footerProductLinks = document.querySelectorAll('.footer-product-link');
    footerProductLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            if (productId) {
                showProductDetail(productId);
            }
        });
    });
    
    // 页脚团队介绍链接点击跳转
    const footerTeamLink = document.querySelector('.footer-team-link');
    if (footerTeamLink) {
        footerTeamLink.addEventListener('click', function(e) {
            e.preventDefault();
            showTeamSection();
        });
    }
    
    // 为页脚联系方式链接添加点击事件
    const footerContactLinks = document.querySelectorAll('.footer-contact-link');
    footerContactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showContactSection();
        });
    });
    
    // 页脚关于我们链接点击跳转到介绍模块
    const footerAboutLink = document.querySelector('.footer-about-link');
    if (footerAboutLink) {
        footerAboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 确保所有页面部分都显示（如果当前在其他页面）
            const mainSections = document.querySelectorAll('.hero-section, .about-section, .news-section, .products-section, .footer');
            mainSections.forEach(section => {
                section.style.display = '';
            });
            
            // 隐藏其他详情页面
            const detailSections = document.querySelectorAll('.product-detail, .team-section, .contact-section, .explore-section');
            detailSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // 直接跳转到介绍部分
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 更新导航栏活跃状态
                const aboutNavLink = document.querySelector('a[href="#about"]');
                if (aboutNavLink) {
                    updateActiveNavLink(aboutNavLink);
                }
            }
        });
    }
    
    // 返回上一页按钮
    const backToMainButtons = document.querySelectorAll('.back-to-main');
    backToMainButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 调试信息
            console.log('返回按钮被点击，当前来源:', previousPageContext);
            
            // 显示导航栏（如果之前被隐藏）
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.display = 'block';
            }
            
            // 根据来源页面返回到相应模块
            if (previousPageContext === 'products') {
                // 返回到产品模块
                showMainPage();
                setTimeout(() => {
                    const productsSection = document.querySelector('#products');
                    if (productsSection) {
                        const offsetTop = productsSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            } else if (previousPageContext === 'about') {
                // 返回到关于模块
                showMainPage();
                setTimeout(() => {
                    const aboutSection = document.querySelector('#about');
                    if (aboutSection) {
                        const offsetTop = aboutSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            } else if (previousPageContext === 'assessment') {
                // 返回到智能测评按钮所在的位置（hero section）
                showMainPage();
                setTimeout(() => {
                    const heroSection = document.querySelector('.hero-section');
                    if (heroSection) {
                        const offsetTop = heroSection.offsetTop;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            } else {
                // 默认返回首页顶部
                showMainPage();
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 100);
            }
            // 清除来源记录
            previousPageContext = null;
        });
    });
     
     // 返回产品列表按钮（如果还有的话）
    const backToProductsButtons = document.querySelectorAll('.back-to-products');
    backToProductsButtons.forEach(button => {
        button.addEventListener('click', function() {
            showProductList();
        });
    });
}

// 显示产品详情
function showProductDetail(productId) {
    // 如果没有记录来源，默认设置为产品模块
    if (!previousPageContext) {
        previousPageContext = 'products';
        console.log('showProductDetail: 设置默认来源为products');
    } else {
        console.log('showProductDetail: 当前来源为', previousPageContext);
    }
    
    const productDetail = document.getElementById(`product-detail-${productId}`);
    
    if (productDetail) {
        
        // 隐藏导航栏
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.display = 'none';
            navbar.style.setProperty('display', 'none', 'important');
        }
        
        // 隐藏主要内容区域
        const mainSections = document.querySelectorAll('.hero-section, .about-section, .news-section, .products-section, .footer');
        mainSections.forEach(section => {
            if (section) section.style.display = 'none';
        });
        
        // 隐藏其他产品详情页面
        const allProductDetails = document.querySelectorAll('[id^="product-detail-"]');
        allProductDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        // 隐藏其他页面
        const otherSections = document.querySelectorAll('#team-section, #contact-section, .explore-section');
        otherSections.forEach(section => {
            if (section) section.style.display = 'none';
        });
        
        // 最后显示当前产品详情页面
        productDetail.style.display = 'block';
        productDetail.style.visibility = 'visible';
        productDetail.style.opacity = '1';
        
        // 直接跳转到顶部，不使用动画
        window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
        // 如果找不到对应的产品详情页面，不要跳转到首页
        console.warn('Product detail page not found for productId:', productId);
    }
}

// 添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 显示产品列表
function showProductList() {
    const productList = document.querySelector('.products-grid');
    const productDetails = document.querySelectorAll('[id^="product-detail-"]');
    const teamSection = document.querySelector('#team-section');
    const contactSection = document.querySelector('#contact-section');
    
    if (productList) {
        productList.style.display = 'grid';
        
        // 隐藏所有产品详情
        productDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        // 隐藏团队介绍页面
        if (teamSection) {
            teamSection.style.display = 'none';
        }
        
        // 隐藏联系方式页面
        if (contactSection) {
            contactSection.style.display = 'none';
        }
        
        // 滚动到产品列表区域
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// 显示团队介绍页面
function showTeamSection() {
    const productList = document.querySelector('.products-grid');
    const productDetails = document.querySelectorAll('[id^="product-detail-"]');
    const teamSection = document.querySelector('#team-section');
    const contactSection = document.querySelector('#contact-section');
    
    // 隐藏产品列表
    if (productList) {
        productList.style.display = 'none';
    }
    
    // 隐藏所有产品详情
    productDetails.forEach(detail => {
        detail.style.display = 'none';
    });
    
    // 隐藏联系方式页面
    if (contactSection) {
        contactSection.style.display = 'none';
    }
    
    // 显示团队介绍页面
    if (teamSection) {
        teamSection.style.display = 'block';
        teamSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 显示联系方式页面
function showContactSection() {
    const productList = document.querySelector('.products-grid');
    const productDetails = document.querySelectorAll('[id^="product-detail-"]');
    const teamSection = document.querySelector('#team-section');
    const contactSection = document.querySelector('#contact-section');
    
    // 隐藏产品列表
    if (productList) {
        productList.style.display = 'none';
    }
    
    // 隐藏所有产品详情
    productDetails.forEach(detail => {
        detail.style.display = 'none';
    });
    
    // 隐藏团队介绍页面
    if (teamSection) {
        teamSection.style.display = 'none';
    }
    
    // 显示联系方式页面
    if (contactSection) {
        contactSection.style.display = 'block';
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 返回首页
function showMainPage() {
    // 清除所有页面切换类名，确保显示首页
    document.body.className = '';
    
    // 确保所有详情页面都被隐藏
    const detailSections = document.querySelectorAll('.business-star-detail-section, .investment-master-detail-section, .tech-star-detail-section, #super-scholar-section, #team-section, #contact-section, #explore, #assessment-section, [id^="product-detail-"]');
    detailSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 确保主页面内容显示
    const mainSections = document.querySelectorAll('.hero-section, .about-section, .news-section, .products-section, .footer, .navbar');
    mainSections.forEach(section => {
        section.style.display = '';
    });
    
    // 确保导航栏显示
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = '';
    
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSuperScholarPage() {
    // 隐藏所有主要部分
    const mainSections = document.querySelectorAll('section:not(#super-scholar-section)');
    mainSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 显示超级学霸页面
    const superScholarSection = document.getElementById('super-scholar-section');
    if (superScholarSection) {
        superScholarSection.style.display = 'block';
    }
    
    // 隐藏导航栏
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'none';
    }
    
    // 滚动到页面顶部
    window.scrollTo(0, 0);
}

function showExplorePage() {
    // 隐藏所有主要部分
    const mainSections = document.querySelectorAll('.hero-section, .about-section, .news-section, .products-section, .footer');
    mainSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 隐藏导航栏
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'none';
    }
    
    // 隐藏其他详情页面
    const detailSections = document.querySelectorAll('.product-detail, .team-section, .contact-section, .super-scholar-page, .business-star-detail-section, .investment-master-detail-section, .tech-star-detail-section');
    detailSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 显示探索页面
    const explorePage = document.querySelector('.explore-section');
    if (explorePage) {
        explorePage.style.display = 'block';
        // 移除探索页面的背景，使用主页面的cyber-bg背景
        explorePage.style.background = 'transparent';
    }
    
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showBusinessStarPage() {
    // 隐藏导航栏
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'none';
        navbar.style.setProperty('display', 'none', 'important');
    }
    
    // 使用CSS类来优化性能
    document.body.className = 'show-business-star';
    
    // 直接跳转到页面顶部，不使用动画
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showInvestmentMasterPage() {
    // 隐藏导航栏
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'none';
        navbar.style.setProperty('display', 'none', 'important');
    }
    
    // 使用CSS类来优化性能
    document.body.className = 'show-investment-master';
    
    // 直接跳转到页面顶部，不使用动画
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showTechStarPage() {
    // 隐藏导航栏
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'none';
        navbar.style.setProperty('display', 'none', 'important');
    }
    
    // 使用CSS类来优化性能
    document.body.className = 'show-tech-star';
    
    // 直接跳转到页面顶部，不使用动画
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// 全屏播放视频
function toggleFullscreen(videoElement) {
    if (!videoElement) {
        console.error('Video element not found');
        return;
    }
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        // 进入全屏
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.mozRequestFullScreen) {
            videoElement.mozRequestFullScreen();
        } else if (videoElement.msRequestFullscreen) {
            videoElement.msRequestFullscreen();
        } else {
            // 如果浏览器不支持全屏API，则在新窗口中打开视频
            const newWindow = window.open('', '_blank', 'width=800,height=600');
            newWindow.document.write(`
                <html>
                    <head><title>视频播放</title></head>
                    <body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; height:100vh;">
                        <video controls autoplay style="max-width:100%; max-height:100%;">
                            <source src="${videoElement.querySelector('source').src}" type="video/mp4">
                        </video>
                    </body>
                </html>
            `);
        }
    } else {
        // 退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// 辅助函数：检测元素是否在视口中
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 智能测评系统
let assessmentData = {
    currentQuestion: 0,
    answers: [],
    scores: {
        scholar: 0,    // 超级学霸
        business: 0,   // 商业新秀
        investment: 0, // 投资大佬
        tech: 0        // 科技新秀
    }
};

// 测评题目数据
const assessmentQuestions = [
    {
        question: "您的孩子最喜欢哪种类型的活动？",
        options: [
            { text: "阅读书籍，钻研学术问题", scores: { scholar: 3, business: 1, investment: 1, tech: 1 } },
            { text: "组织活动，领导团队", scores: { scholar: 1, business: 3, investment: 2, tech: 1 } },
            { text: "分析数据，研究趋势", scores: { scholar: 2, business: 2, investment: 3, tech: 1 } },
            { text: "编程创作，技术探索", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "面对问题时，孩子通常会？",
        options: [
            { text: "查阅资料，寻找理论依据", scores: { scholar: 3, business: 1, investment: 1, tech: 2 } },
            { text: "寻求合作，集思广益", scores: { scholar: 1, business: 3, investment: 1, tech: 1 } },
            { text: "分析利弊，权衡得失", scores: { scholar: 1, business: 2, investment: 3, tech: 1 } },
            { text: "动手实践，尝试解决", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子的理想职业倾向是？",
        options: [
            { text: "科学家、教授、研究员", scores: { scholar: 3, business: 0, investment: 1, tech: 2 } },
            { text: "企业家、管理者、销售", scores: { scholar: 0, business: 3, investment: 2, tech: 1 } },
            { text: "投资顾问、金融分析师", scores: { scholar: 1, business: 2, investment: 3, tech: 1 } },
            { text: "程序员、工程师、设计师", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子最感兴趣的学科是？",
        options: [
            { text: "语文、历史、哲学", scores: { scholar: 3, business: 1, investment: 1, tech: 0 } },
            { text: "社会学、心理学、管理学", scores: { scholar: 1, business: 3, investment: 1, tech: 1 } },
            { text: "数学、经济学、统计学", scores: { scholar: 2, business: 1, investment: 3, tech: 1 } },
            { text: "物理、化学、计算机", scores: { scholar: 1, business: 0, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子的学习方式偏好？",
        options: [
            { text: "深度钻研，追求完美", scores: { scholar: 3, business: 1, investment: 1, tech: 2 } },
            { text: "团队协作，互动学习", scores: { scholar: 1, business: 3, investment: 1, tech: 1 } },
            { text: "实用导向，注重效果", scores: { scholar: 1, business: 2, investment: 3, tech: 1 } },
            { text: "动手实践，边做边学", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子对金钱的态度？",
        options: [
            { text: "够用就好，不太在意", scores: { scholar: 3, business: 0, investment: 0, tech: 2 } },
            { text: "赚钱工具，实现目标", scores: { scholar: 1, business: 3, investment: 2, tech: 1 } },
            { text: "投资手段，财富增值", scores: { scholar: 0, business: 2, investment: 3, tech: 1 } },
            { text: "创新资本，技术变现", scores: { scholar: 1, business: 1, investment: 2, tech: 3 } }
        ]
    },
    {
        question: "孩子的性格特点？",
        options: [
            { text: "内向专注，喜欢独处", scores: { scholar: 3, business: 0, investment: 1, tech: 2 } },
            { text: "外向活跃，善于交际", scores: { scholar: 0, business: 3, investment: 2, tech: 1 } },
            { text: "理性冷静，逻辑清晰", scores: { scholar: 2, business: 1, investment: 3, tech: 2 } },
            { text: "创新好奇，喜欢探索", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子的时间管理习惯？",
        options: [
            { text: "制定详细计划，严格执行", scores: { scholar: 3, business: 2, investment: 2, tech: 1 } },
            { text: "灵活调整，适应变化", scores: { scholar: 1, business: 3, investment: 2, tech: 2 } },
            { text: "效率优先，结果导向", scores: { scholar: 1, business: 2, investment: 3, tech: 1 } },
            { text: "专注当下，沉浸其中", scores: { scholar: 2, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子对新技术的态度？",
        options: [
            { text: "谨慎观望，深入研究", scores: { scholar: 3, business: 1, investment: 2, tech: 1 } },
            { text: "积极尝试，寻找商机", scores: { scholar: 1, business: 3, investment: 2, tech: 2 } },
            { text: "理性分析，投资价值", scores: { scholar: 1, business: 2, investment: 3, tech: 1 } },
            { text: "热情拥抱，技术创新", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子的竞争意识？",
        options: [
            { text: "与自己竞争，追求卓越", scores: { scholar: 3, business: 1, investment: 1, tech: 2 } },
            { text: "团队竞争，共同成长", scores: { scholar: 1, business: 3, investment: 1, tech: 1 } },
            { text: "市场竞争，利益最大", scores: { scholar: 0, business: 2, investment: 3, tech: 1 } },
            { text: "技术竞争，创新领先", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子的沟通风格？",
        options: [
            { text: "深度交流，学术讨论", scores: { scholar: 3, business: 1, investment: 1, tech: 1 } },
            { text: "广泛社交，建立人脉", scores: { scholar: 1, business: 3, investment: 2, tech: 1 } },
            { text: "精准表达，数据说话", scores: { scholar: 1, business: 2, investment: 3, tech: 2 } },
            { text: "技术交流，专业对话", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子对失败的反应？",
        options: [
            { text: "深入反思，总结经验", scores: { scholar: 3, business: 1, investment: 2, tech: 2 } },
            { text: "快速调整，重新出发", scores: { scholar: 1, business: 3, investment: 2, tech: 1 } },
            { text: "分析原因，控制风险", scores: { scholar: 1, business: 2, investment: 3, tech: 1 } },
            { text: "技术改进，优化方案", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子的兴趣爱好？",
        options: [
            { text: "读书写作，知识积累", scores: { scholar: 3, business: 1, investment: 1, tech: 1 } },
            { text: "社交活动，人际交往", scores: { scholar: 0, business: 3, investment: 1, tech: 1 } },
            { text: "理财投资，财经资讯", scores: { scholar: 1, business: 2, investment: 3, tech: 1 } },
            { text: "科技产品，编程创作", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子的决策方式？",
        options: [
            { text: "理论分析，科学决策", scores: { scholar: 3, business: 1, investment: 2, tech: 2 } },
            { text: "团队讨论，集体决策", scores: { scholar: 1, business: 3, investment: 1, tech: 1 } },
            { text: "数据分析，量化决策", scores: { scholar: 2, business: 2, investment: 3, tech: 2 } },
            { text: "快速迭代，敏捷决策", scores: { scholar: 1, business: 2, investment: 1, tech: 3 } }
        ]
    },
    {
        question: "孩子的未来规划？",
        options: [
            { text: "学术深造，专业发展", scores: { scholar: 3, business: 1, investment: 1, tech: 2 } },
            { text: "创业发展，商业成功", scores: { scholar: 1, business: 3, investment: 2, tech: 2 } },
            { text: "财富自由，投资收益", scores: { scholar: 0, business: 2, investment: 3, tech: 1 } },
            { text: "技术创新，改变世界", scores: { scholar: 1, business: 1, investment: 1, tech: 3 } }
        ]
    }
];

// 显示测评页面
function showAssessmentPage() {
    // 设置previousPageContext为assessment，这样返回时会回到智能测评系统所在的位置
    previousPageContext = 'assessment';
    console.log('进入智能测评页面，设置返回位置为智能测评系统');
    
    // 隐藏所有其他页面
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    
    // 隐藏导航栏
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'none';
    }
    
    // 显示测评页面
    document.getElementById('assessment-section').style.display = 'block';
    
    // 重置测评数据
    resetAssessment();
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 重置测评
function resetAssessment() {
    assessmentData = {
        currentQuestion: 0,
        answers: [],
        scores: {
            scholar: 0,
            business: 0,
            investment: 0,
            tech: 0
        }
    };
    
    // 显示介绍页面
    document.getElementById('assessment-intro').style.display = 'block';
    document.getElementById('assessment-quiz').style.display = 'none';
    document.getElementById('assessment-result').style.display = 'none';
}

// 开始测评
function startAssessment() {
    document.getElementById('assessment-intro').style.display = 'none';
    document.getElementById('assessment-quiz').style.display = 'block';
    
    loadQuestion(0);
}

// 加载问题
function loadQuestion(questionIndex) {
    const question = assessmentQuestions[questionIndex];
    const questionTitle = document.getElementById('question-title');
    const optionsContainer = document.getElementById('options-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    // 更新问题标题
    questionTitle.textContent = question.question;
    
    // 清空选项容器
    optionsContainer.innerHTML = '';
    
    // 生成选项
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option-item';
        optionElement.textContent = option.text;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    // 更新进度
    const progress = ((questionIndex + 1) / assessmentQuestions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${questionIndex + 1}/${assessmentQuestions.length}`;
    
    // 更新按钮状态
    updateNavigationButtons();
}

// 选择选项
function selectOption(optionIndex) {
    // 移除之前的选择
    document.querySelectorAll('.option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 标记当前选择
    document.querySelectorAll('.option-item')[optionIndex].classList.add('selected');
    
    // 保存答案
    assessmentData.answers[assessmentData.currentQuestion] = optionIndex;
    
    // 更新按钮状态
    updateNavigationButtons();
}

// 更新导航按钮状态
function updateNavigationButtons() {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    
    // 上一题按钮
    btnPrev.disabled = assessmentData.currentQuestion === 0;
    
    // 下一题按钮
    const hasAnswer = assessmentData.answers[assessmentData.currentQuestion] !== undefined;
    btnNext.disabled = !hasAnswer;
    
    // 如果是最后一题，改变按钮文字
    if (assessmentData.currentQuestion === assessmentQuestions.length - 1) {
        btnNext.textContent = '查看结果';
    } else {
        btnNext.textContent = '下一题';
    }
}

// 上一题
function previousQuestion() {
    if (assessmentData.currentQuestion > 0) {
        assessmentData.currentQuestion--;
        loadQuestion(assessmentData.currentQuestion);
        
        // 恢复之前的选择
        const previousAnswer = assessmentData.answers[assessmentData.currentQuestion];
        if (previousAnswer !== undefined) {
            document.querySelectorAll('.option-item')[previousAnswer].classList.add('selected');
        }
    }
}

// 下一题
function nextQuestion() {
    if (assessmentData.currentQuestion < assessmentQuestions.length - 1) {
        assessmentData.currentQuestion++;
        loadQuestion(assessmentData.currentQuestion);
        
        // 恢复之前的选择
        const previousAnswer = assessmentData.answers[assessmentData.currentQuestion];
        if (previousAnswer !== undefined) {
            document.querySelectorAll('.option-item')[previousAnswer].classList.add('selected');
        }
    } else {
        // 最后一题，显示结果
        calculateResults();
        showResults();
    }
}

// 计算结果
function calculateResults() {
    // 重置分数
    assessmentData.scores = {
        scholar: 0,
        business: 0,
        investment: 0,
        tech: 0
    };
    
    // 计算每个维度的分数
    assessmentData.answers.forEach((answerIndex, questionIndex) => {
        const question = assessmentQuestions[questionIndex];
        const selectedOption = question.options[answerIndex];
        
        Object.keys(selectedOption.scores).forEach(dimension => {
            assessmentData.scores[dimension] += selectedOption.scores[dimension];
        });
    });
}

// 显示结果
function showResults() {
    document.getElementById('assessment-quiz').style.display = 'none';
    document.getElementById('assessment-result').style.display = 'block';
    
    // 找出最高分的维度
    const maxScore = Math.max(...Object.values(assessmentData.scores));
    const primaryDimension = Object.keys(assessmentData.scores).find(
        key => assessmentData.scores[key] === maxScore
    );
    
    // 生成推荐内容
    generateRecommendations(primaryDimension);
    
    // 生成分析图表
    generateAnalysisChart();
    
    // 生成分析文本
    generateAnalysisText(primaryDimension);
}

// 生成推荐内容
function generateRecommendations(primaryDimension) {
    const recommendations = {
        scholar: {
            icon: '🧠',
            title: '超级学霸',
            description: '您的孩子展现出强烈的学术倾向和深度思考能力。建议重点培养学术研究能力，为985/211名校冲刺做准备。',
            products: ['智能少年学习系统', '学术研究方法训练', '批判性思维课程']
        },
        business: {
            icon: '⚡',
            title: '商业新秀',
            description: '您的孩子具备优秀的领导力和商业思维。建议培养市场洞察力和团队协作能力，成就未来商业领袖。',
            products: ['商业思维训练', '领导力发展课程', '市场分析实践']
        },
        investment: {
            icon: '💰',
            title: '投资大佬',
            description: '您的孩子对数据分析和风险评估有天赋。建议培养投资理财智慧和敏锐的财富嗅觉。',
            products: ['投资理财课程', '数据分析训练', '风险管控实践']
        },
        tech: {
            icon: '🚀',
            title: '科技新秀',
            description: '您的孩子对技术创新充满热情。建议重点培养编程能力和创新思维，构建数字化未来。',
            products: ['3D打印课程', '编程技能训练', '创新项目实践']
        }
    };
    
    const primary = recommendations[primaryDimension];
    
    // 生成主要推荐
    const primaryRecommendation = document.getElementById('primary-recommendation');
    primaryRecommendation.innerHTML = `
        <div class="card-icon">${primary.icon}</div>
        <h5>${primary.title}</h5>
        <p>${primary.description}</p>
    `;
    
    // 生成次要推荐
    const secondaryRecommendations = document.getElementById('secondary-recommendations');
    const otherDimensions = Object.keys(recommendations).filter(key => key !== primaryDimension);
    
    secondaryRecommendations.innerHTML = otherDimensions.map(dimension => {
        const rec = recommendations[dimension];
        return `
            <div class="recommendation-card">
                <div class="card-icon">${rec.icon}</div>
                <h5>${rec.title}</h5>
                <p>${rec.description}</p>
            </div>
        `;
    }).join('');
}

// 生成分析图表
function generateAnalysisChart() {
    const canvas = document.getElementById('ability-chart');
    const ctx = canvas.getContext('2d');
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 设置画布样式
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    // 数据
    const data = [
        { label: '学术能力', value: assessmentData.scores.scholar, color: '#FFAB00' },
        { label: '商业思维', value: assessmentData.scores.business, color: '#00ffff' },
        { label: '投资理财', value: assessmentData.scores.investment, color: '#ff6b6b' },
        { label: '科技创新', value: assessmentData.scores.tech, color: '#00ff7f' }
    ];
    
    // 找出最大值用于标准化
    const maxValue = Math.max(...data.map(d => d.value));
    
    // 绘制雷达图
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    
    // 绘制网格线
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    // 绘制轴线
    data.forEach((item, index) => {
        const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // 绘制标签
        ctx.fillStyle = '#cccccc';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        const labelX = centerX + Math.cos(angle) * (radius + 20);
        const labelY = centerY + Math.sin(angle) * (radius + 20);
        ctx.fillText(item.label, labelX, labelY);
    });
    
    // 绘制数据多边形
    ctx.beginPath();
    data.forEach((item, index) => {
        const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
        const value = maxValue > 0 ? (item.value / maxValue) * radius : 0;
        const x = centerX + Math.cos(angle) * value;
        const y = centerY + Math.sin(angle) * value;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 171, 0, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#FFAB00';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制数据点
    data.forEach((item, index) => {
        const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
        const value = maxValue > 0 ? (item.value / maxValue) * radius : 0;
        const x = centerX + Math.cos(angle) * value;
        const y = centerY + Math.sin(angle) * value;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = item.color;
        ctx.fill();
    });
}

// 生成分析文本
function generateAnalysisText(primaryDimension) {
    const analysisTexts = {
        scholar: '您的孩子在学术能力方面表现突出，具备深度思考和理论分析的天赋。建议重点培养研究方法和批判性思维，为未来的学术发展奠定坚实基础。',
        business: '您的孩子展现出优秀的商业思维和领导潜质。建议培养市场敏感度和团队协作能力，为未来的商业成功做好准备。',
        investment: '您的孩子对数据分析和风险评估有着敏锐的洞察力。建议系统学习投资理财知识，培养财富管理和风险控制能力。',
        tech: '您的孩子对技术创新充满热情，具备优秀的动手实践能力。建议重点培养编程技能和创新思维，为数字化时代做好准备。'
    };
    
    const analysisText = document.getElementById('analysis-text');
    analysisText.innerHTML = `
        <p>${analysisTexts[primaryDimension]}</p>
        <h5>能力分析：</h5>
        <ul>
            <li>学术能力：${assessmentData.scores.scholar}分 - ${getScoreDescription(assessmentData.scores.scholar)}</li>
            <li>商业思维：${assessmentData.scores.business}分 - ${getScoreDescription(assessmentData.scores.business)}</li>
            <li>投资理财：${assessmentData.scores.investment}分 - ${getScoreDescription(assessmentData.scores.investment)}</li>
            <li>科技创新：${assessmentData.scores.tech}分 - ${getScoreDescription(assessmentData.scores.tech)}</li>
        </ul>
    `;
}

// 获取分数描述
function getScoreDescription(score) {
    if (score >= 35) return '非常突出';
    if (score >= 25) return '较为突出';
    if (score >= 15) return '中等水平';
    return '有待提升';
}

// 重新测评
function retakeAssessment() {
    resetAssessment();
}

// 添加到现有的返回按钮事件处理中
function initAssessmentNavigation() {
    const backButtons = document.querySelectorAll('.back-to-main');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (document.getElementById('assessment-section').style.display === 'block') {
                showMainPage();
            }
        });
    });
}

// 在页面加载时初始化测评导航
document.addEventListener('DOMContentLoaded', function() {
    initAssessmentNavigation();
    initContactForm();
});

// 初始化联系表单
function initContactForm() {
    const messageForm = document.querySelector('.message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', handleFormSubmit);
    }
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // 验证表单
    if (!validateForm(formData)) {
        return;
    }
    
    // 发送邮件
    sendEmail(formData);
}

// 验证表单
function validateForm(data) {
    if (!data.name.trim()) {
        alert('请输入您的姓名');
        return false;
    }
    
    if (!data.email.trim()) {
        alert('请输入您的邮箱');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        alert('请输入有效的邮箱地址');
        return false;
    }
    
    if (!data.subject.trim()) {
        alert('请输入留言主题');
        return false;
    }
    
    if (!data.message.trim()) {
        alert('请输入留言内容');
        return false;
    }
    
    return true;
}

// 验证邮箱格式
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 发送邮件
function sendEmail(formData) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // 显示发送中状态
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    
    // 使用Formspree发送邮件到指定邮箱
    const emailData = {
        name: formData.name,
        email: formData.email,
        subject: '智能少年官网留言：' + formData.subject,
        message: `来自智能少年官网的新留言\n\n姓名：${formData.name}\n邮箱：${formData.email}\n主题：${formData.subject}\n\n留言内容：\n${formData.message}\n\n发送时间：${new Date().toLocaleString('zh-CN')}`,
        _replyto: formData.email,
        _to: 'peiqigogerge@gmail.com'
    };
    
    // 使用Formspree的免费服务发送邮件
    fetch('https://formspree.io/f/xwkgpqpz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (response.ok) {
            // 显示发送成功状态
            submitBtn.textContent = '发送成功';
            submitBtn.style.background = '#28a745';
            
            // 清空表单
            document.querySelector('.message-form').reset();
            
            // 显示成功消息
            showSuccessMessage('留言已成功发送到 peiqigogerge@gmail.com！');
            
            // 恢复按钮状态
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error('发送失败');
        }
    })
    .catch(error => {
        console.error('邮件发送失败:', error);
        
        // 作为最后的备用方案，使用mailto
        const emailSubject = encodeURIComponent('智能少年官网留言：' + formData.subject);
        const emailBody = encodeURIComponent(
            `来自智能少年官网的新留言\n\n` +
            `姓名：${formData.name}\n` +
            `邮箱：${formData.email}\n` +
            `主题：${formData.subject}\n\n` +
            `留言内容：\n${formData.message}\n\n` +
            `发送时间：${new Date().toLocaleString('zh-CN')}`
        );
        
        const mailtoUrl = `mailto:peiqigogerge@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        window.open(mailtoUrl, '_blank');
        
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // 显示提示消息
        showErrorMessage('自动发送失败，已为您打开邮件客户端，请手动发送到 peiqigogerge@gmail.com');
    });
}

// 显示成功消息
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // 3秒后自动移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// 显示错误消息
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // 5秒后自动移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// 添加消息动画样式
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(messageStyle);