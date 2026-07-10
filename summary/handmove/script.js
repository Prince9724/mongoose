// ============================================
// STATE
// ============================================

const state = {
    currentColor: '#D4AF37',
    brushSize: 8,
    isDrawing: false,
    isPaused: true,
    lastX: null,
    lastY: null,
    gestureStatus: 'Idle',
    drawingHistory: [],
    historyIndex: -1,
    maxHistory: 50,
    fps: 0,
    frameCount: 0,
    lastFpsUpdate: 0,
    colorIndex: 0,
    isMobile: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
};

// ============================================
// COLOR PALETTE
// ============================================

const COLORS = [
    '#D4AF37',  // Gold
    '#2196F3',  // Blue
    '#4CAF50',  // Green
    '#F44336',  // Red
    '#FFC107',  // Yellow
    '#000000',  // Black
    '#9C27B0',  // Purple
];

const COLOR_NAMES = [
    'Gold',
    'Blue',
    'Green',
    'Red',
    'Yellow',
    'Black',
    'Purple'
];

// ============================================
// DOM REFS
// ============================================

const video = document.getElementById('webcam');
const drawingCanvas = document.getElementById('drawingCanvas');
const landmarkCanvas = document.getElementById('landmarkCanvas');
const ctx = drawingCanvas.getContext('2d');
const lmCtx = landmarkCanvas.getContext('2d');
const cursor = document.getElementById('customCursor');

const colorBtns = document.querySelectorAll('.color-btn');
const brushBtns = document.querySelectorAll('.brush-btn');
const gestureStatusEl = document.getElementById('gestureStatus');
const currentColorDisplay = document.getElementById('currentColorDisplay');
const brushSizeDisplay = document.getElementById('brushSizeDisplay');
const fpsDisplay = document.getElementById('fpsDisplay');
const drawingStatus = document.getElementById('drawingStatus');

const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const clearBtn = document.getElementById('clearBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const screenshotBtn = document.getElementById('screenshotBtn');
const downloadBtn = document.getElementById('downloadBtn');

// ============================================
// CANVAS SETUP - MOBILE FIXED
// ============================================

function setupCanvas() {
    const rect = drawingCanvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // For mobile, use higher resolution
    const width = rect.width;
    const height = rect.height;
    
    drawingCanvas.width = width * dpr;
    drawingCanvas.height = height * dpr;
    drawingCanvas.style.width = width + 'px';
    drawingCanvas.style.height = height + 'px';
    
    landmarkCanvas.width = width * dpr;
    landmarkCanvas.height = height * dpr;
    landmarkCanvas.style.width = width + 'px';
    landmarkCanvas.style.height = height + 'px';
    
    ctx.scale(dpr, dpr);
    lmCtx.scale(dpr, dpr);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = state.currentColor;
    ctx.lineWidth = state.brushSize;
}

window.addEventListener('resize', () => {
    const dataUrl = drawingCanvas.toDataURL();
    setupCanvas();
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => ctx.drawImage(img, 0, 0, drawingCanvas.width, drawingCanvas.height);
});

// ============================================
// DRAWING FUNCTIONS
// ============================================

function startDrawing(x, y) {
    if (state.isPaused) return;
    state.isDrawing = true;
    state.lastX = x;
    state.lastY = y;
    drawingStatus.textContent = '✏️ Drawing';
    drawingStatus.style.color = '#4CAF50';
}

function draw(x, y) {
    if (!state.isDrawing || state.isPaused || state.lastX === null) return;
    
    ctx.beginPath();
    ctx.moveTo(state.lastX, state.lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = state.currentColor;
    ctx.lineWidth = state.brushSize;
    ctx.stroke();
    
    state.lastX = x;
    state.lastY = y;
}

function stopDrawing() {
    if (state.isDrawing) {
        state.isDrawing = false;
        saveHistory();
        drawingStatus.textContent = '⏸️ Paused';
        drawingStatus.style.color = '#FFC107';
    }
    state.lastX = null;
    state.lastY = null;
}

function clearCanvas() {
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    saveHistory();
    showToast('🧹 Canvas Cleared!');
}

// ============================================
// COLOR CHANGE FUNCTIONS
// ============================================

function nextColor() {
    state.colorIndex = (state.colorIndex + 1) % COLORS.length;
    setColor(state.colorIndex);
    showToast(`🎨 ${COLOR_NAMES[state.colorIndex]}`);
}

function previousColor() {
    state.colorIndex = (state.colorIndex - 1 + COLORS.length) % COLORS.length;
    setColor(state.colorIndex);
    showToast(`🎨 ${COLOR_NAMES[state.colorIndex]}`);
}

function setColor(index) {
    state.currentColor = COLORS[index];
    currentColorDisplay.style.background = state.currentColor;
    
    colorBtns.forEach((btn, i) => {
        btn.classList.remove('active');
        if (i === index) {
            btn.classList.add('active');
        }
    });
}

// ============================================
// HISTORY
// ============================================

function saveHistory() {
    const dataUrl = drawingCanvas.toDataURL();
    state.drawingHistory = state.drawingHistory.slice(0, state.historyIndex + 1);
    state.drawingHistory.push(dataUrl);
    if (state.drawingHistory.length > state.maxHistory) {
        state.drawingHistory.shift();
    }
    state.historyIndex = state.drawingHistory.length - 1;
}

function undo() {
    if (state.historyIndex > 0) {
        state.historyIndex--;
        restoreHistory(state.historyIndex);
        showToast('↩️ Undo');
    }
}

function redo() {
    if (state.historyIndex < state.drawingHistory.length - 1) {
        state.historyIndex++;
        restoreHistory(state.historyIndex);
        showToast('↪️ Redo');
    }
}

function restoreHistory(index) {
    const img = new Image();
    img.src = state.drawingHistory[index];
    img.onload = () => {
        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        ctx.drawImage(img, 0, 0);
    };
}

// ============================================
// GESTURE DETECTION
// ============================================

function getGesture(landmarks) {
    if (!landmarks || landmarks.length === 0) return 'No Hand';
    
    const fingers = getFingerStates(landmarks);
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    
    const thumbIndexDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
    const isThumbIndexTouch = thumbIndexDist < 0.05;
    const onlyThumbUp = fingers[0] && !fingers[1] && !fingers[2] && !fingers[3] && !fingers[4];
    const onlyPinkyUp = !fingers[0] && !fingers[1] && !fingers[2] && !fingers[3] && fingers[4];
    const raisedCount = fingers.filter(f => f).length;
    
    if (onlyThumbUp) return 'Thumb Up 👍';
    if (onlyPinkyUp) return 'Pinky Up 🤙';
    if (isThumbIndexTouch && fingers[1]) return 'Click 👆';
    if (raisedCount === 0) return 'Fist ✊';
    if (raisedCount === 5) return 'Open Palm 🖐️';
    if (fingers[1] && !fingers[2] && !fingers[3] && !fingers[4]) return 'Index Up 👆';
    if (fingers[1] && fingers[2] && !fingers[3] && !fingers[4]) return 'Two Fingers ✌️';
    
    return 'Idle';
}

function getFingerStates(landmarks) {
    const tips = [4, 8, 12, 16, 20];
    const pips = [3, 6, 10, 14, 18];
    
    return tips.map((tip, i) => {
        const tipY = landmarks[tip].y;
        const pipY = landmarks[pips[i]].y;
        if (i === 0) {
            const tipX = landmarks[tip].x;
            const pipX = landmarks[pips[i]].x;
            return Math.abs(tipX - pipX) > 0.04;
        }
        return tipY < pipY;
    });
}

// ============================================
// MEDIAPIPE - MOBILE FIXED
// ============================================

const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1, // 0 = Lite (faster on mobile)
    minDetectionConfidence: 0.6, // Lower for mobile
    minTrackingConfidence: 0.5
});

hands.onResults(onResults);

// ============================================
// RESULTS HANDLER - MOBILE FIXED
// ============================================

let colorChangeCooldown = false;
let lastGestureTime = 0;

function onResults(results) {
    lmCtx.clearRect(0, 0, landmarkCanvas.width, landmarkCanvas.height);
    
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        const gesture = getGesture(landmarks);
        
        state.gestureStatus = gesture;
        gestureStatusEl.textContent = gesture;
        
        // FIXED: Mirror correction for mobile
        const indexTip = landmarks[8];
        const x = (1 - indexTip.x) * drawingCanvas.width;
        const y = indexTip.y * drawingCanvas.height;
        
        handleGesture(gesture, x, y);
        drawLandmarks(landmarks);
        updateCursor(x, y);
        
    } else {
        state.gestureStatus = 'No Hand';
        gestureStatusEl.textContent = 'No Hand';
        state.isPaused = true;
        drawingStatus.textContent = '⏸️ No Hand';
        drawingStatus.style.color = '#F44336';
        if (cursor) cursor.style.display = 'none';
        stopDrawing();
    }
}

// ============================================
// GESTURE HANDLER
// ============================================

function handleGesture(gesture, x, y) {
    const now = Date.now();
    const cooldown = 500;
    
    switch(gesture) {
        case 'Thumb Up 👍':
            if (now - lastGestureTime > cooldown) {
                previousColor();
                lastGestureTime = now;
                state.isPaused = true;
                drawingStatus.textContent = '⏸️ Color Changed';
                drawingStatus.style.color = '#FFC107';
                if (cursor) {
                    cursor.style.display = 'block';
                    cursor.classList.remove('drawing');
                }
                stopDrawing();
            }
            break;
            
        case 'Pinky Up 🤙':
            if (now - lastGestureTime > cooldown) {
                nextColor();
                lastGestureTime = now;
                state.isPaused = true;
                drawingStatus.textContent = '⏸️ Color Changed';
                drawingStatus.style.color = '#FFC107';
                if (cursor) {
                    cursor.style.display = 'block';
                    cursor.classList.remove('drawing');
                }
                stopDrawing();
            }
            break;
            
        case 'Click 👆':
            if (now - lastGestureTime > cooldown) {
                nextColor();
                lastGestureTime = now;
                state.isPaused = true;
                drawingStatus.textContent = '⏸️ Color Changed';
                drawingStatus.style.color = '#FFC107';
                if (cursor) {
                    cursor.style.display = 'block';
                    cursor.classList.remove('drawing');
                }
                stopDrawing();
            }
            break;
            
        case 'Index Up 👆':
            state.isPaused = true;
            drawingStatus.textContent = '⏸️ Moving';
            drawingStatus.style.color = '#FFC107';
            if (cursor) {
                cursor.style.display = 'block';
                cursor.classList.remove('drawing');
            }
            stopDrawing();
            break;
            
        case 'Two Fingers ✌️':
            state.isPaused = false;
            drawingStatus.textContent = '✏️ Drawing';
            drawingStatus.style.color = '#4CAF50';
            if (cursor) {
                cursor.style.display = 'block';
                cursor.classList.add('drawing');
            }
            if (!state.isDrawing) {
                startDrawing(x, y);
            } else {
                draw(x, y);
            }
            break;
            
        case 'Open Palm 🖐️':
            state.isPaused = true;
            drawingStatus.textContent = '⏸️ Paused';
            drawingStatus.style.color = '#FF9800';
            if (cursor) {
                cursor.style.display = 'block';
                cursor.classList.remove('drawing');
            }
            stopDrawing();
            break;
            
        case 'Fist ✊':
            state.isPaused = true;
            drawingStatus.textContent = '✊ Clear!';
            drawingStatus.style.color = '#F44336';
            if (cursor) cursor.style.display = 'none';
            stopDrawing();
            clearCanvas();
            showToast('✊ Canvas Cleared!');
            break;
            
        default:
            if (cursor) {
                cursor.style.display = 'block';
                cursor.classList.remove('drawing');
            }
            break;
    }
}

// ============================================
// DRAW LANDMARKS - MOBILE OPTIMIZED
// ============================================

function drawLandmarks(landmarks) {
    const w = landmarkCanvas.width;
    const h = landmarkCanvas.height;
    const dpr = window.devicePixelRatio || 1;
    
    // Scale down for mobile performance
    const scale = state.isMobile ? 0.7 : 1;
    const radius = state.isMobile ? 3 : 4;
    
    const connections = [
        [0,1], [1,2], [2,3], [3,4],
        [0,5], [5,6], [6,7], [7,8],
        [5,9], [9,10], [10,11], [11,12],
        [9,13], [13,14], [14,15], [15,16],
        [13,17], [17,18], [18,19], [19,20],
        [0,17]
    ];
    
    lmCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    lmCtx.lineWidth = state.isMobile ? 1 : 1.5;
    
    connections.forEach(([i, j]) => {
        const p1 = landmarks[i];
        const p2 = landmarks[j];
        lmCtx.beginPath();
        lmCtx.moveTo((1 - p1.x) * w, p1.y * h);
        lmCtx.lineTo((1 - p2.x) * w, p2.y * h);
        lmCtx.stroke();
    });
    
    landmarks.forEach(landmark => {
        lmCtx.beginPath();
        lmCtx.arc((1 - landmark.x) * w, landmark.y * h, radius, 0, 2 * Math.PI);
        lmCtx.fillStyle = '#FF1744';
        lmCtx.fill();
        lmCtx.strokeStyle = 'rgba(255,255,255,0.2)';
        lmCtx.lineWidth = 0.5;
        lmCtx.stroke();
    });
}

// ============================================
// CURSOR - MOBILE HIDE
// ============================================

function updateCursor(x, y) {
    if (cursor && !state.isMobile) {
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        cursor.style.display = 'block';
    } else if (cursor && state.isMobile) {
        cursor.style.display = 'none'; // Hide cursor on mobile
    }
}

// ============================================
// COLOR BUTTONS
// ============================================

let hoverTimeout = null;

colorBtns.forEach((btn, index) => {
    // For touch devices (mobile)
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const color = btn.dataset.color;
        if (color === 'clear') {
            clearCanvas();
            showToast('🧹 Canvas Cleared!');
            return;
        }
        state.colorIndex = index;
        setColor(index);
        showToast(`🎨 ${COLOR_NAMES[index]}`);
    });
    
    // For mouse (desktop)
    btn.addEventListener('mouseenter', () => {
        if (state.isMobile) return;
        const color = btn.dataset.color;
        if (color === 'clear') {
            hoverTimeout = setTimeout(() => {
                clearCanvas();
                showToast('🧹 Canvas Cleared!');
            }, 700);
            return;
        }
        hoverTimeout = setTimeout(() => {
            state.colorIndex = index;
            setColor(index);
            showToast(`🎨 ${COLOR_NAMES[index]}`);
        }, 700);
    });
    
    btn.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
    });
    
    btn.addEventListener('click', () => {
        if (state.isMobile) return;
        const color = btn.dataset.color;
        if (color === 'clear') {
            clearCanvas();
            showToast('🧹 Canvas Cleared!');
            return;
        }
        state.colorIndex = index;
        setColor(index);
        showToast(`🎨 ${COLOR_NAMES[index]}`);
    });
});

setColor(0);

// ============================================
// BRUSH SIZE - MOBILE FRIENDLY
// ============================================

brushBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const size = parseInt(btn.dataset.size);
        state.brushSize = size;
        brushSizeDisplay.textContent = size;
        brushBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast(`🖌️ Size: ${size}`);
    });
    
    // Touch support
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const size = parseInt(btn.dataset.size);
        state.brushSize = size;
        brushSizeDisplay.textContent = size;
        brushBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast(`🖌️ Size: ${size}`);
    });
});

// ============================================
// BUTTONS - MOBILE FRIENDLY
// ============================================

function addTouchButton(btn, action) {
    btn.addEventListener('click', action);
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        action();
    });
}

addTouchButton(undoBtn, undo);
addTouchButton(redoBtn, redo);

clearBtn.addEventListener('click', () => {
    if (confirm('🗑️ Clear entire drawing?')) {
        clearCanvas();
    }
});

clearBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (confirm('🗑️ Clear entire drawing?')) {
        clearCanvas();
    }
});

fullscreenBtn.addEventListener('click', toggleFullscreen);
fullscreenBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleFullscreen();
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen().catch(() => {});
    }
}

screenshotBtn.addEventListener('click', takeScreenshot);
screenshotBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    takeScreenshot();
});

function takeScreenshot() {
    const link = document.createElement('a');
    link.download = 'drawing-screenshot.png';
    link.href = drawingCanvas.toDataURL();
    link.click();
    showToast('📸 Screenshot saved!');
}

downloadBtn.addEventListener('click', downloadDrawing);
downloadBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    downloadDrawing();
});

function downloadDrawing() {
    const link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = drawingCanvas.toDataURL();
    link.click();
    showToast('⬇️ Drawing downloaded!');
}

// ============================================
// TOAST
// ============================================

function showToast(message) {
    let toast = document.getElementById('toast');
    if (toast) toast.remove();
    
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(10px);
        color: white;
        padding: 12px 28px;
        border-radius: 12px;
        font-family: 'Poppins', sans-serif;
        font-size: ${state.isMobile ? '16px' : '14px'};
        border: 1px solid rgba(255,255,255,0.1);
        z-index: 9999;
        animation: fadeInUp 0.3s ease;
        pointer-events: none;
        max-width: 90%;
        text-align: center;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOutDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 1500);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes fadeOutDown {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }
`;
document.head.appendChild(style);

// ============================================
// FPS
// ============================================

function updateFPS() {
    state.frameCount++;
    const now = performance.now();
    if (now - state.lastFpsUpdate >= 1000) {
        state.fps = state.frameCount;
        state.frameCount = 0;
        state.lastFpsUpdate = now;
        fpsDisplay.textContent = state.fps;
        if (state.fps >= 50) fpsDisplay.style.color = '#4CAF50';
        else if (state.fps >= 30) fpsDisplay.style.color = '#FFC107';
        else fpsDisplay.style.color = '#F44336';
    }
    requestAnimationFrame(updateFPS);
}

// ============================================
// CAMERA - MOBILE FIXED
// ============================================

async function setupCamera() {
    try {
        const constraints = {
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user',
                frameRate: { ideal: 30 }
            }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                video.play();
                resolve(video);
            };
        });
    } catch (err) {
        console.error('Camera error:', err);
        alert('❌ Please allow camera access!\n\nMobile users: Tap "Allow" when prompted.');
        
        // Try again with simpler constraints
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            return new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    video.play();
                    resolve(video);
                };
            });
        } catch (err2) {
            alert('❌ Camera not available. Please check permissions.');
            console.error(err2);
        }
    }
}

// ============================================
// INIT - MOBILE OPTIMIZED
// ============================================

async function init() {
    // Show loading message
    showToast('📱 Loading camera...');
    
    await setupCamera();
    setupCanvas();
    
    // Mobile optimization
    if (state.isMobile) {
        // Reduce FPS on mobile for battery
        hands.setOptions({
            modelComplexity: 0, // Lite mode
        });
        console.log('📱 Mobile mode enabled');
    }
    
    const camera = new Camera(video, {
        onFrame: async () => {
            await hands.send({image: video});
            updateFPS();
        },
        width: 640,
        height: 480
    });
    camera.start();
    
    saveHistory();
    
    console.log('✅ GestureDraw Ready!');
    console.log('📱 Mobile:', state.isMobile ? 'Yes' : 'No');
    console.log('🎨 Gesture Controls:');
    console.log('   👍 Thumb Up = Previous Color');
    console.log('   🤙 Pinky Up = Next Color');
    console.log('   ✌️ Two Fingers = Draw');
    console.log('   🖐️ Open Palm = Pause');
    console.log('   ✊ Fist = Clear Canvas');
    showToast('✋ Use gestures to draw!');
}

// Start when page loads
document.addEventListener('DOMContentLoaded', init);

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); }
    if (e.ctrlKey && e.key === 'y') { e.preventDefault(); redo(); }
    if (e.key === 'c' || e.key === 'C') { clearCanvas(); showToast('🧹 Cleared!'); }
    if (e.key === 'f' || e.key === 'F') { toggleFullscreen(); }
    if (e.key === 'ArrowRight') { nextColor(); }
    if (e.key === 'ArrowLeft') { previousColor(); }
});

console.log('🎨 Shortcuts: Ctrl+Z (Undo), Ctrl+Y (Redo), C (Clear), F (Fullscreen)');
console.log('   ⬅️ ➡️ Arrow keys = Change Color');