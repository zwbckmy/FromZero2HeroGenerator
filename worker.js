
// index.js (or worker.js)
const htmlContent = `
<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <title>从夯到拉排名生成器</title>
    <style>
    :root {
        --bg-color: #faf8f3;
        --bg-gradient: linear-gradient(135deg, #faf8f3 0%, #f5f1e8 100%);
        --text-color: #2c3e50;
        --title-color: #34495e;
        --particle-color: rgba(139, 115, 85, 0.05);
        --sidebar-bg: rgba(255, 255, 255, 0.7);
        --sidebar-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
        --sidebar-text: #2c3e50;
        --toggle-bg: rgba(255, 255, 255, 0.9);
        --toggle-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        --table-bg: rgba(255, 255, 255, 0.95);
        --table-border: rgba(0, 0, 0, 0.15);
        --table-shadow: rgba(0, 0, 0, 0.18);
        --cell-border: rgba(0, 0, 0, 0.08);
        --tool-section-bg: rgba(102, 126, 234, 0.12);
        --block-first: #d2191f;
        --block-second: #ff6c13;
        --block-third: #ffed6f;
        --block-fourth: #fff2ca;
        --block-fifth: #fefcff;
    }
    
    body.dark-mode {
        --bg-color: #1a1a1a;
        --bg-gradient: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        --text-color: #e0e0e0;
        --title-color: #ffffff;
        --particle-color: rgba(255, 255, 255, 0.03);
        --sidebar-bg: rgba(35, 35, 35, 0.6);
        --sidebar-shadow: -5px 0 25px rgba(0, 0, 0, 0.55);
        --sidebar-text: #d9ddff;
        --toggle-bg: rgba(60, 60, 60, 0.9);
        --toggle-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        --table-bg: rgba(45, 45, 45, 0.95);
        --table-border: rgba(255, 255, 255, 0.08);
        --table-shadow: rgba(0, 0, 0, 0.6);
        --cell-border: rgba(255, 255, 255, 0.12);
        --tool-section-bg: rgba(102, 126, 234, 0.1);
        --block-first: #8f1d22;
        --block-second: #ba4a1d;
        --block-third: #d3b350;
        --block-fourth: #9f8b61;
        --block-fifth: #4b4b4b;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        background: var(--bg-gradient);
        min-height: 100vh;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        position: relative;
        overflow-x: hidden;
        padding: 20px;
        color: var(--text-color);
        transition: background 0.3s ease, color 0.3s ease;
    }
    
    /* 动态背景粒子效果 */
    body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
            radial-gradient(circle at 20% 50%, var(--particle-color) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, var(--particle-color) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, var(--particle-color) 0%, transparent 50%);
        animation: backgroundShift 15s ease-in-out infinite;
        pointer-events: none;
        z-index: 0;
    }
    
    @keyframes backgroundShift {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
    }
    
    /* 主容器 */
    .main-container {
        position: relative;
        z-index: 1;
        max-width: 1400px;
        margin: 0 auto;
    }
    
    h2 {
        color: var(--title-color);
        text-align: center;
        font-size: 2.5em;
        margin-bottom: 30px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        animation: titleGlow 3s ease-in-out infinite;
        transition: color 0.3s ease, text-shadow 0.3s ease;
    }
    
    @keyframes titleGlow {
        0%, 100% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); }
        50% { text-shadow: 0 0 15px rgba(139, 115, 85, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.1); }
    }
    
    body.dark-mode h2 {
        animation: titleGlowDark 3s ease-in-out infinite;
    }
    
    @keyframes titleGlowDark {
        0%, 100% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); }
        50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.3); }
    }
    
    table{
        border-collapse: collapse;
        border: 4px solid var(--table-border);
        background: var(--table-bg);
        box-shadow: 0 15px 45px var(--table-shadow);
        border-radius: 10px;
        overflow: hidden;
        transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        width: 1000px;
        margin: 0;
    }
    .base-block{
        width: 170px;
        height: 120px;
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        border-radius: 5px;
        transition: transform 0.3s ease;
        color: inherit;
    }
    .base-block:hover {
        transform: scale(1.05);
    }
    .first-block{
        background-color: var(--block-first);
    }
    .second-block{
        background-color: var(--block-second);
    }
    .third-block{
        background-color: var(--block-third);
    }
    .fourth-block{
        background-color: var(--block-fourth);
    }
    .fifth-block{
        background-color: var(--block-fifth);
    }
    tr td{
        border: 3px solid var(--cell-border);
        width: 1000px;
        transition: border-color 0.3s ease, background-color 0.3s ease;
        color: inherit;
        position: relative;
        min-height: 120px;
        height: auto;
        vertical-align: top;
        overflow: visible;
    }
    
    /* 拖拽目标区域样式 */
    .drop-zone {
        position: relative;
        min-height: 120px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 15px;
        overflow: visible;
        flex-wrap: wrap;
        gap: 15px;
    }
    
    .drop-zone.drag-over {
        background-color: rgba(102, 126, 234, 0.2);
        border-color: #667eea;
        border-style: dashed;
    }
    
    .drop-zone.has-image {
        background-color: rgba(102, 126, 234, 0.1);
    }
    
    /* 表格中图片的样式 */
    .drop-zone img {
        max-width: 100px;
        max-height: 100px;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        position: relative;
        cursor: move;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        user-select: none;
        -webkit-user-drag: none;
    }
    
    .drop-zone img:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .drop-zone img.dragging {
        transform: scale(1.1);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        z-index: 1000;
    }
    
    /* 等待区样式 */
    .waiting-area {
        background-color: rgba(255, 193, 7, 0.1);
        border: 2px dashed rgba(255, 193, 7, 0.5);
        border-radius: 8px;
        padding: 10px;
        margin-top: 20px;
        min-height: 150px;
        transition: all 0.3s ease;
        width: 1000px;
        margin: 20px 0 0 0;
    }
    
    .waiting-area h3 {
        color: #ffc107;
        margin-bottom: 10px;
        text-align: center;
        font-size: 1.2em;
    }
    
    /* 等待区图片网格样式 */
    #imagePreview {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 20px;
        justify-items: center;
        align-items: start;
        padding: 10px;
    }
    
    #imagePreview img {
        max-width: 100px;
        max-height: 100px;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    #imagePreview img:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    #imagePreview img {
        max-height: 118px;
        width: auto;
        cursor: move;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    
    /* 右侧工具栏 */
    .sidebar {
        position: fixed;
        right: 0;
        top: 0;
        width: 320px;
        height: 100vh;
        background: var(--sidebar-bg);
        backdrop-filter: blur(18px) saturate(140%);
        box-shadow: var(--sidebar-shadow);
        padding: 20px;
        transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
        z-index: 1000;
        overflow-y: auto;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        color: var(--sidebar-text);
        --pointer-x: 50%;
        --pointer-y: 50%;
    }
    
    .sidebar::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255, 255, 255, 0.25), transparent 55%);
        mix-blend-mode: screen;
        transition: background 0.2s ease;
        pointer-events: none;
    }
    
    body.dark-mode .sidebar::before {
        background: radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255, 255, 255, 0.15), transparent 60%);
        mix-blend-mode: lighten;
    }
    
    .sidebar.hidden {
        transform: translateX(100%);
    }
    
    .sidebar-toggle {
        position: fixed;
        right: 20px;
        top: 20px;
        z-index: 1001;
        background: var(--toggle-bg);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: var(--toggle-shadow);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        transition: all 0.3s ease, opacity 0.3s ease;
    }
    
    .sidebar-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }

    .sidebar-toggle.auto-hidden {
        opacity: 0;
        transform: translateX(20px);
        pointer-events: none;
    }
    
    .sidebar h3 {
        color: #667eea;
        margin-bottom: 15px;
        font-size: 1.3em;
        border-bottom: 2px solid #667eea;
        padding-bottom: 10px;
        transition: color 0.3s ease;
    }
    
    body.dark-mode .sidebar h3 {
        color: #8b9ef5;
    }
    
    .sidebar input[type="text"] {
        width: 100%;
        padding: 12px;
        margin-bottom: 10px;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        transition: border-color 0.3s ease, background-color 0.3s ease;
        background-color: rgba(255, 255, 255, 0.8);
        color: inherit;
    }
    
    .sidebar input[type="text"]:focus {
        outline: none;
        border-color: #667eea;
    }
    
    body.dark-mode .sidebar input[type="text"] {
        border-color: rgba(255, 255, 255, 0.2);
        background-color: rgba(60, 60, 60, 0.7);
    }

    button{
        color: #ffffff;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 8px;
        border: none;
        padding: 12px 20px;
        transition: all 0.3s ease;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        width: 100%;
        margin-bottom: 10px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
    
    .tool-section {
        margin-bottom: 30px;
        padding: 15px;
        background: var(--tool-section-bg);
        border-radius: 16px;
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: background 0.3s ease, border-color 0.3s ease;
    }

    .tool-section:last-child {
        margin-bottom: 0;
    }

    .theme-switch {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 10px;
        color: inherit;
    }

    .theme-switch input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    .theme-switch .slider {
        position: relative;
        width: 48px;
        height: 26px;
        background: rgba(102, 126, 234, 0.4);
        border-radius: 999px;
        transition: background 0.3s ease;
        box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.25);
    }

    .theme-switch .slider::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 4px;
        width: 18px;
        height: 18px;
        background: #ffffff;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
    }

    .theme-switch input:checked + .slider {
        background: rgba(102, 126, 234, 0.8);
    }

    .theme-switch input:checked + .slider::after {
        transform: translateX(22px);
    }

    .theme-switch .theme-label {
        font-size: 14px;
        letter-spacing: 0.04em;
    }

    body.dark-mode .theme-switch .slider {
        background: rgba(102, 126, 234, 0.35);
        box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.5);
    }

    body.dark-mode table th,
    body.dark-mode table td {
        color: #f2f2f2;
    }

    body.dark-mode button {
        box-shadow: 0 4px 18px rgba(102, 126, 234, 0.4);
    }

    body.dark-mode .sidebar input[type="text"] {
        color: #f1f1f1;
    }

    body.dark-mode .tool-section {
        border-color: rgba(255, 255, 255, 0.08);
    }

    body.dark-mode .base-block {
        color: #f7f7f9;
    }

    /* 移动端响应式设计 */
    @media screen and (max-width: 768px) {
        body {
            padding: 10px;
        }
        
        .main-container {
            max-width: 100%;
            margin: 0;
        }
        
        h2 {
            font-size: 1.8em;
            margin-bottom: 20px;
            padding: 0 10px;
        }
        
        table {
            width: 100%;
            border-radius: 8px;
            margin: 0 auto;
        }
        
        .waiting-area {
            width: 100%;
            margin-left: 0;
            margin-right: 0;
        }
        
        .base-block {
            width: 80px;
            height: 60px;
            font-size: 16px;
            padding: 5px;
        }
        
        tr td {
            width: auto;
            min-width: 200px;
            padding: 8px;
        }
        
        /* 移动端侧边栏 */
        .sidebar {
            width: 100%;
            height: 100vh;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .sidebar:not(.hidden) {
            transform: translateX(0);
        }
        
        .sidebar-toggle {
            right: 15px;
            top: 15px;
            width: 45px;
            height: 45px;
            font-size: 20px;
        }
        
        .sidebar h3 {
            font-size: 1.1em;
            margin-bottom: 12px;
        }
        
        .sidebar input[type="text"] {
            padding: 10px;
            font-size: 16px; /* 防止iOS缩放 */
        }
        
        button {
            padding: 10px 15px;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .tool-section {
            padding: 12px;
            margin-bottom: 20px;
        }
        
        #imagePreview {
            min-height: 200px;
            gap: 8px;
        }
        
        #imagePreview img {
            max-height: 80px;
            max-width: 80px;
        }
    }
    
    /* 小屏幕手机优化 */
    @media screen and (max-width: 480px) {
        body {
            padding: 5px;
        }
        
        h2 {
            font-size: 1.5em;
            margin-bottom: 15px;
        }
        
        .base-block {
            width: 60px;
            height: 45px;
            font-size: 12px;
            padding: 3px;
        }
        
        tr td {
            min-width: 150px;
            padding: 5px;
        }
        
        .sidebar {
            padding: 15px;
        }
        
        .sidebar h3 {
            font-size: 1em;
        }
        
        .sidebar input[type="text"] {
            padding: 8px;
            font-size: 16px;
        }
        
        button {
            padding: 8px 12px;
            font-size: 13px;
        }
        
        .sidebar-toggle {
            width: 40px;
            height: 40px;
            font-size: 18px;
            right: 10px;
            top: 10px;
        }
    }
    
    /* 横屏模式优化 */
    @media screen and (max-width: 768px) and (orientation: landscape) {
        .sidebar {
            width: 50%;
            max-width: 400px;
        }
        
        .base-block {
            width: 70px;
            height: 50px;
            font-size: 14px;
        }
        
        tr td {
            min-width: 180px;
        }
    }
    
    /* 移动端表格优化 */
    @media screen and (max-width: 768px) {
        table {
            font-size: 14px;
        }
        
        .base-block {
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        tr td {
            vertical-align: middle;
            text-align: center;
        }
        
        /* 确保表格在小屏幕上可滚动 */
        .main-container {
            overflow-x: auto;
        }
        
        table {
            min-width: 300px;
        }
    }
    
    /* 超小屏幕表格优化 */
    @media screen and (max-width: 480px) {
        table {
            font-size: 12px;
            border-width: 2px;
        }
        
        .base-block {
            font-size: 10px;
            padding: 2px;
        }
        
        tr td {
            padding: 3px;
        }
    }
    
    /* 图片预览区域样式 */
    #imagePreview {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 20px;
        min-height: 300px;
        transition: all 0.3s ease;
        overflow: visible;
    }
    
    
    #imagePreview img {
        max-width: 100px;
        max-height: 100px;
        width: auto;
        height: auto;
        cursor: move;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        user-select: none;
        -webkit-user-drag: none;
        position: relative;
        display: inline-block;
        object-fit: contain;
    }
    
    #imagePreview img:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    #imagePreview img.dragging {
        transform: scale(1.1);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        z-index: 1000;
    }
    
    
    /* 移动端图片预览优化 */
    @media screen and (max-width: 768px) {
        .waiting-area {
            width: 100%;
            margin-left: 0;
            margin-right: 0;
        }
        
        #imagePreview {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 10px;
            min-height: 200px;
        }
        
        #imagePreview img {
            max-height: 80px;
            max-width: 80px;
        }
        
        .drop-zone img {
            max-width: 60px;
            max-height: 60px;
        }
        
        .drop-zone {
            min-height: 80px;
            padding: 5px;
        }
        
    }
    
    @media screen and (max-width: 480px) {
        #imagePreview {
            grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
            gap: 8px;
            min-height: 150px;
        }
        
        #imagePreview img {
            max-height: 60px;
            max-width: 60px;
        }
        
        .drop-zone img {
            max-width: 50px;
            max-height: 50px;
        }
        
        .drop-zone {
            min-height: 60px;
            padding: 3px;
        }
    }

</style>
</head>

<body>
    <!-- 工具栏切换按钮 -->
    <button class="sidebar-toggle" id="sidebarToggle">⚙️</button>
    
    <!-- 右侧工具栏 -->
    <div class="sidebar" id="sidebar">
        <div class="tool-section">
            <h3>🎨 页面设置</h3>
            <label class="theme-switch">
                <input type="checkbox" id="themeToggle">
                <span class="slider"></span>
                <span class="theme-label" id="themeLabel">浅色模式</span>
            </label>
        </div>

        <div class="tool-section">
            <h3>📝 更改标题</h3>
            <input type="text" id="titleInput" placeholder="输入新标题">
            <button id="changeTitleBtn">更改标题</button>
        </div>
        
        <div class="tool-section">
            <h3>🖼️ 上传图片</h3>
            <button id="uploadBtn">选择图片</button>
            <input type="file" id="imageUpload" accept="image/*" multiple style="display: none;">
        </div>
        <div>
        <h3>✌️导出图片</h3>
       <button id="export-btn" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center">
           <i class="fa fa-download mr-2"></i>导出图片
       </button>
   </div>
        
    </div>
    
    <!-- 主内容区 -->
    <div class="main-container">
        <div id="main-container-div">
        <h2>从夯到拉排名生成器</h2>
        <table id="1">
            <tr>   
                <th class="base-block first-block">夯</th>
                <td class="data-block drop-zone" data-level="1"></td>
            </tr>
            <tr>
                <th class="base-block second-block">顶尖</th>
                <td class="data-block drop-zone" data-level="2"></td>
            </tr>
            <tr>
                <th class="base-block third-block">人上人</th>
                <td class="data-block drop-zone" data-level="3"></td>
            </tr>
            <tr>
                <th class="base-block fourth-block">NPC</th>
                <td class="data-block drop-zone" data-level="4"></td>
            </tr>
            <tr>
                <th class="base-block fifth-block">拉完了</th>
                <td class="data-block drop-zone" data-level="5"></td>
            </tr>
        </table>
        </div>

        <div class="waiting-area" id="waitingArea">
            <h3>⏳ 等待区 - 拖拽图片到上方表格完成分类</h3>
            <div id="imagePreview"></div>
        </div>
    </div>

    <script>
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const changeTitleBtn = document.getElementById('changeTitleBtn');
    const titleInput = document.getElementById('titleInput');
    const titleH2 = document.querySelector('h2');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    
    // 全局变量
    let imageCount = 0;
    let waitingArea = document.getElementById('waitingArea');
    let dropZones = document.querySelectorAll('.drop-zone');
    let imagesInWaiting = new Set(); // 跟踪等待区中的图片
    let imagesInTable = new Set(); // 跟踪已分类的图片

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(mode) {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
            themeLabel.textContent = '深色模式已开启';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
            themeLabel.textContent = '浅色模式已开启';
        }
        localStorage.setItem('theme', mode);
    }

    // 工具栏切换功能
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        sidebarToggle.classList.remove('auto-hidden');
    });
    
    // 移动端触摸支持
    let touchStartX = 0;
    let touchStartY = 0;
    let isSidebarOpen = false;
    
    // 触摸开始
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    // 触摸结束 - 处理侧滑手势
    document.addEventListener('touchend', (e) => {
        if (!e.changedTouches[0]) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // 检测右滑手势（从屏幕右边缘开始）
        if (touchStartX > window.innerWidth - 50 && deltaX < -50 && Math.abs(deltaY) < 100) {
            sidebar.classList.remove('hidden');
            isSidebarOpen = true;
        }
        // 检测左滑手势关闭侧边栏
        else if (isSidebarOpen && deltaX < -50 && Math.abs(deltaY) < 100) {
            sidebar.classList.add('hidden');
            isSidebarOpen = false;
        }
    }, { passive: true });

  const memeCanvas = document.getElementById('main-container-div');
  const exportButton = document.getElementById('export-btn');
   // 导出图像功能
            exportButton.addEventListener('click', () => {
                html2canvas(memeCanvas, {
                    scale: 2,
                    useCORS: true,
                    logging: false
                }).then(canvas => {
                    const link = document.createElement('a');
                    var downloadTitle = '从夯到拉排名.png';
                    if (titleH2.textContent) {
                        downloadTitle = titleH2.textContent + '.png'
                    }
                    link.download = downloadTitle ;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                });
            });
    
    // 监听侧边栏状态变化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                isSidebarOpen = !sidebar.classList.contains('hidden');
            }
        });
    });
    observer.observe(sidebar, { attributes: true });

    themeToggle.addEventListener('change', () => {
        applyTheme(themeToggle.checked ? 'dark' : 'light');
    });

    window.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDark.matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    });

    const handleSystemThemeChange = (event) => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    };

    if (typeof prefersDark.addEventListener === 'function') {
        prefersDark.addEventListener('change', handleSystemThemeChange);
    } else if (typeof prefersDark.addListener === 'function') {
        prefersDark.addListener(handleSystemThemeChange);
    }

    // 玻璃面板光效跟随
    sidebar.addEventListener('mousemove', (event) => {
        const rect = sidebar.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
  
    });

    sidebar.addEventListener('mouseleave', () => {
        sidebar.style.setProperty('--pointer-x', '50%');
        sidebar.style.setProperty('--pointer-y', '50%');
    });

    // 设置按钮自动隐藏逻辑
    let hideToggleTimeout;
    const proximityThreshold = 140;
    const isMobile = window.innerWidth <= 768;

    function scheduleToggleHide() {
        if (isMobile) return; // 移动端不自动隐藏
        clearTimeout(hideToggleTimeout);
        hideToggleTimeout = setTimeout(() => {
            sidebarToggle.classList.add('auto-hidden');
        }, 1000);
    }

    function handlePointerMove(event) {
        if (isMobile) return; // 移动端不处理鼠标移动
        const rect = sidebarToggle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.hypot(dx, dy);

        if (distance <= proximityThreshold) {
            sidebarToggle.classList.remove('auto-hidden');
            clearTimeout(hideToggleTimeout);
        } else {
            scheduleToggleHide();
        }
    }

    // 只在非移动端添加鼠标事件
    if (!isMobile) {
    window.addEventListener('pointermove', handlePointerMove);

    sidebarToggle.addEventListener('mouseenter', () => {
        sidebarToggle.classList.remove('auto-hidden');
        clearTimeout(hideToggleTimeout);
    });

    sidebarToggle.addEventListener('focus', () => {
        sidebarToggle.classList.remove('auto-hidden');
        clearTimeout(hideToggleTimeout);
    });

    sidebarToggle.addEventListener('mouseleave', scheduleToggleHide);
    sidebarToggle.addEventListener('blur', scheduleToggleHide);

    scheduleToggleHide();
    }
    
    // 移动端优化：点击外部关闭侧边栏
    if (isMobile) {
        document.addEventListener('touchstart', (e) => {
            if (isSidebarOpen && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.add('hidden');
                isSidebarOpen = false;
            }
        });
    }

    
    

    uploadBtn.addEventListener('click', () => {
        imageUpload.click();
    });

    changeTitleBtn.addEventListener('click', () => {
        if (titleInput.value.trim()) {
            titleH2.textContent = titleInput.value;
            titleInput.value = '';
        }
    });

    imageUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.position = 'relative';
                    img.addEventListener('mousedown', startDrag);
                    img.addEventListener('touchstart', startTouchDrag, { passive: false });
                    img.addEventListener('dragstart', (e) => e.preventDefault()); // 防止默认拖拽
                    
                    // 添加到等待区
                    imagesInWaiting.add(img);
                    imagePreview.appendChild(img);
                    imageCount++;
                    
                    // 更新等待区排列
                    updateWaitingArea();
                };
                reader.readAsDataURL(file);
            }
        }
    });

    let draggedElement = null;
    let offsetX, offsetY;
    let isDragging = false;

    function startDrag(e) {
        draggedElement = e.target;
        const rect = draggedElement.getBoundingClientRect();
        
        // 计算相对于鼠标的偏移量
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        // 设置固定定位，相对于视口
        draggedElement.style.position = 'fixed';
        draggedElement.style.left = rect.left + 'px';
        draggedElement.style.top = rect.top + 'px';
        draggedElement.style.zIndex = '1000';
        draggedElement.style.pointerEvents = 'none'; // 防止拖拽时触发其他事件
        draggedElement.classList.add('dragging');
        isDragging = true;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        e.preventDefault();
        e.stopPropagation();
    }

    function startTouchDrag(e) {
        if (e.touches.length !== 1) return;
        draggedElement = e.target;
        const rect = draggedElement.getBoundingClientRect();
        
        // 计算相对于触摸点的偏移量
        offsetX = e.touches[0].clientX - rect.left;
        offsetY = e.touches[0].clientY - rect.top;
        
        // 设置固定定位，相对于视口
        draggedElement.style.position = 'fixed';
        draggedElement.style.left = rect.left + 'px';
        draggedElement.style.top = rect.top + 'px';
        draggedElement.style.zIndex = '1000';
        draggedElement.style.pointerEvents = 'none'; // 防止拖拽时触发其他事件
        draggedElement.classList.add('dragging');
        isDragging = true;
        document.addEventListener('touchmove', touchDrag, { passive: false });
        document.addEventListener('touchend', stopDrag);
        e.preventDefault();
        e.stopPropagation();
    }

    function drag(e) {
        if (draggedElement && isDragging) {
            // 计算相对于视口的位置
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            
            // 设置绝对定位，相对于视口
            draggedElement.style.position = 'fixed';
            draggedElement.style.left = newX + 'px';
            draggedElement.style.top = newY + 'px';
            draggedElement.style.zIndex = '1000';
            
            // 获取图片中心点
            const imgRect = draggedElement.getBoundingClientRect();
            const imgCenterX = imgRect.left + imgRect.width / 2;
            const imgCenterY = imgRect.top + imgRect.height / 2;
            
            // 检查是否在表格区域上方，提供视觉反馈
            const tableRect = document.querySelector('table').getBoundingClientRect();
            
            // 清除所有drop-zone的高亮
            dropZones.forEach(zone => zone.classList.remove('drag-over'));
            
            // 如果在表格区域内，高亮最近的drop-zone
            if (imgCenterX >= tableRect.left && 
                imgCenterX <= tableRect.right && 
                imgCenterY >= tableRect.top && 
                imgCenterY <= tableRect.bottom) {
                
                const closestZone = findClosestDropZoneByCenter(imgCenterX, imgCenterY);
                if (closestZone) {
                    closestZone.classList.add('drag-over');
                }
            }
        }
    }

    function touchDrag(e) {
        if (draggedElement && isDragging && e.touches.length === 1) {
            e.preventDefault();
            
            // 计算相对于视口的位置
            const newX = e.touches[0].clientX - offsetX;
            const newY = e.touches[0].clientY - offsetY;
            
            // 设置绝对定位，相对于视口
            draggedElement.style.position = 'fixed';
            draggedElement.style.left = newX + 'px';
            draggedElement.style.top = newY + 'px';
            draggedElement.style.zIndex = '1000';
        }
    }

    function stopDrag() {
        if (draggedElement) {
            draggedElement.style.zIndex = '1';
            draggedElement.style.pointerEvents = 'auto'; // 恢复事件处理
            draggedElement.classList.remove('dragging');
            
            // 清除所有drop-zone的高亮
            dropZones.forEach(zone => zone.classList.remove('drag-over'));
            
            // 获取图片中心点
            const imgRect = draggedElement.getBoundingClientRect();
            const imgCenterX = imgRect.left + imgRect.width / 2;
            const imgCenterY = imgRect.top + imgRect.height / 2;
            
            // 检查是否在表格区域内
            const tableRect = document.querySelector('table').getBoundingClientRect();
            if (imgCenterX >= tableRect.left && 
                imgCenterX <= tableRect.right && 
                imgCenterY >= tableRect.top && 
                imgCenterY <= tableRect.bottom) {
                
                // 找到最近的drop-zone
                const closestDropZone = findClosestDropZoneByCenter(imgCenterX, imgCenterY);
                if (closestDropZone) {
                    // 如果图片已经在表格中，检查是否移动到不同的drop-zone
                    const currentDropZone = draggedElement.closest('.drop-zone');
                    if (currentDropZone && currentDropZone !== closestDropZone) {
                        // 移动到不同的drop-zone
                        moveImageToTable(draggedElement, closestDropZone);
                    } else if (!currentDropZone) {
                        // 从等待区移动到表格
                        moveImageToTable(draggedElement, closestDropZone);
                    } else {
                        // 回到原位置
                        resetImagePosition(draggedElement);
                    }
                } else {
                    // 回到原位置
                    resetImagePosition(draggedElement);
                }
            } else {
                // 检查是否拖拽到等待区
                const waitingRect = waitingArea.getBoundingClientRect();
                if (imgCenterX >= waitingRect.left && 
                    imgCenterX <= waitingRect.right && 
                    imgCenterY >= waitingRect.top && 
                    imgCenterY <= waitingRect.bottom) {
                    // 移动到等待区
                    moveImageToWaiting(draggedElement);
                } else {
                    // 如果拖拽到无效区域，回到原位置
                    resetImagePosition(draggedElement);
                }
            }
            
            draggedElement = null;
        }
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', touchDrag);
        document.removeEventListener('touchend', stopDrag);
    }
    
    // 找到最近的drop-zone
    function findClosestDropZone(img) {
        const imgRect = img.getBoundingClientRect();
        let closestZone = null;
        let minDistance = Infinity;
        
        dropZones.forEach(zone => {
            const zoneRect = zone.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(imgRect.left - zoneRect.left, 2) + 
                Math.pow(imgRect.top - zoneRect.top, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                closestZone = zone;
            }
        });
        
        return closestZone;
    }
    
    // 根据中心点找到最近的drop-zone
    function findClosestDropZoneByCenter(centerX, centerY) {
        let closestZone = null;
        let minDistance = Infinity;
        
        dropZones.forEach(zone => {
            const zoneRect = zone.getBoundingClientRect();
            const zoneCenterX = zoneRect.left + zoneRect.width / 2;
            const zoneCenterY = zoneRect.top + zoneRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(centerX - zoneCenterX, 2) + 
                Math.pow(centerY - zoneCenterY, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                closestZone = zone;
            }
        });
        
        return closestZone;
    }
    
    // 重置图片位置
    function resetImagePosition(img) {
        // 重置图片样式
        img.style.position = 'relative';
        img.style.left = 'auto';
        img.style.top = 'auto';
        img.style.zIndex = '1';
        img.style.pointerEvents = 'auto';
    }
    
    // 移动图片到表格
    function moveImageToTable(img, dropZone) {
        // 记录原始位置
        const originalParent = img.parentNode;
        const originalNextSibling = img.nextSibling;
        
        // 从等待区移除（如果存在）
        if (imagesInWaiting.has(img)) {
            imagesInWaiting.delete(img);
        }
        
        // 添加到表格
        imagesInTable.add(img);
        dropZone.appendChild(img);
        dropZone.classList.add('has-image');
        
        // 重置图片样式
        img.style.position = 'relative';
        img.style.left = 'auto';
        img.style.top = 'auto';
        img.style.zIndex = '1';
        img.style.pointerEvents = 'auto';
        
        // 为表格中的图片添加拖拽事件（如果还没有）
        if (!img.hasAttribute('data-drag-events-added')) {
            img.addEventListener('mousedown', startDrag);
            img.addEventListener('touchstart', startTouchDrag, { passive: false });
            img.addEventListener('dragstart', (e) => e.preventDefault());
            img.setAttribute('data-drag-events-added', 'true');
        }
        
        // 更新等待区和表格行高
        updateWaitingArea();
        updateTableRowHeights();
    }
    
    // 移动图片回等待区
    function moveImageToWaiting(img) {
        // 从表格移除（如果存在）
        if (imagesInTable.has(img)) {
            imagesInTable.delete(img);
        }
        
        // 添加到等待区
        imagesInWaiting.add(img);
        imagePreview.appendChild(img);
        
        // 重置图片样式
        img.style.position = 'static';
        img.style.left = 'auto';
        img.style.top = 'auto';
        img.style.zIndex = '1';
        img.style.pointerEvents = 'auto';
        
        // 更新等待区和表格行高
        updateWaitingArea();
        updateTableRowHeights();
    }
    
    // 更新等待区排列
    function updateWaitingArea() {
        const waitingImages = Array.from(imagesInWaiting);
        if (waitingImages.length === 0) {
            waitingArea.style.display = 'none';
            return;
        }
        
        waitingArea.style.display = 'block';
        
        // 重置所有图片的定位，让CSS Grid自动排列
        waitingImages.forEach((img) => {
            img.style.position = 'static';
            img.style.left = 'auto';
            img.style.top = 'auto';
        });
        
        // 调整等待区高度
        const totalRows = Math.ceil(waitingImages.length / Math.floor(imagePreview.offsetWidth / 135)); // 根据容器宽度计算每行数量
        waitingArea.style.minHeight = (totalRows * 120 + 80) + 'px';
    }
    
    // 更新表格行高
    function updateTableRowHeights() {
        dropZones.forEach(zone => {
            const images = zone.querySelectorAll('img');
            if (images.length === 0) {
                zone.style.minHeight = '120px';
                zone.classList.remove('has-image');
            } else {
                // 计算每行可以放置的图片数量（考虑容器宽度和图片尺寸）
                const zoneWidth = zone.offsetWidth;
                const imageWidth = 100; // 图片宽度
                const gap = 10; // 图片间距
                const padding = 20; // 容器内边距
                
                const availableWidth = zoneWidth - padding;
                const imagesPerRow = Math.floor(availableWidth / (imageWidth + gap));
                const actualImagesPerRow = Math.max(1, imagesPerRow);
                
                // 计算需要的行数
                const rows = Math.ceil(images.length / actualImagesPerRow);
                
                // 计算高度：图片高度 + 间距 + 内边距
                const imageHeight = 100;
                const rowGap = 10;
                const newHeight = Math.max(120, rows * (imageHeight + rowGap) + 20);
                
                zone.style.minHeight = newHeight + 'px';
                zone.classList.add('has-image');
            }
        });
    }
    
    // 窗口大小改变时重新计算行高
    window.addEventListener('resize', () => {
        setTimeout(() => {
            updateTableRowHeights();
            updateWaitingArea();
        }, 100);
    });
    
    // 页面加载完成后初始化行高
    window.addEventListener('load', () => {
        setTimeout(() => {
            updateTableRowHeights();
        }, 100);
    });
</script>

</body>
`;

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

function handleRequest(request) {
    return new Response(htmlContent, {
        headers: {
            'content-type': 'text/html;charset=UTF-8',
        },
    });
}