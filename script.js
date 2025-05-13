document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const videoUrlInput = document.getElementById('videoUrl');
    const parseBtn = document.getElementById('parseBtn');
    const player = document.getElementById('player');
    const apiButtons = document.querySelectorAll('.api-btn');
    
    // 初始化默认解析接口（推荐线路2）
    let currentApi;
    
    // 设置默认线路为线路2
    function initDefaultApi() {
        // 移除所有active类
        apiButtons.forEach(btn => btn.classList.remove('active'));
        
        // 为线路2添加active类
        apiButtons[1].classList.add('active');
        
        // 更新当前解析接口
        currentApi = apiButtons[1].getAttribute('data-api');
    }
    
    // 初始化设置
    initDefaultApi();
    
    // 解析视频函数
    function parseVideo() {
        const videoUrl = videoUrlInput.value.trim();
        
        if (!videoUrl) {
            alert('请输入视频链接！');
            return;
        }
        
        // 检查URL格式
        if (!isValidUrl(videoUrl)) {
            alert('请输入有效的视频链接！');
            return;
        }
        
        // 设置播放器src
        player.src = currentApi + encodeURIComponent(videoUrl);
        
        // 滚动到播放器位置
        document.querySelector('.player-container').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // 检查URL是否有效
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // 切换解析接口
    function switchApi(event) {
        if (event.target.classList.contains('api-btn')) {
            // 移除所有按钮的active类
            apiButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            event.target.classList.add('active');
            
            // 更新当前解析接口
            currentApi = event.target.getAttribute('data-api');
            
            // 如果已经有输入的视频链接，自动重新解析
            if (videoUrlInput.value.trim()) {
                parseVideo();
            }
        }
    }
    
    // 为按钮添加点击事件
    parseBtn.addEventListener('click', parseVideo);
    
    // 为输入框添加回车事件
    videoUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            parseVideo();
        }
    });
    
    // 为API按钮添加点击事件
    const apiList = document.getElementById('apiList');
    apiList.addEventListener('click', switchApi);

    // 自动填充链接(如果URL中有链接参数)
    function autoFillAndPlay() {
        const urlParams = new URLSearchParams(window.location.search);
        const videoUrl = urlParams.get('url');
        
        if (videoUrl) {
            videoUrlInput.value = decodeURIComponent(videoUrl);
            parseVideo();
        }
    }
    
    // 页面加载时执行自动填充
    autoFillAndPlay();
}); 