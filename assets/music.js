let audio = new Audio('https://ia800605.us.archive.org/5/items/yal-3-yn-8-same/YAL3YN-8SAME.mp3');
let isPlaying = false;
audio.volume = 1.0; // ضبط مستوى الصوت الافتراضي إلى 100%

// تخزين مستوى الصوت في localStorage
if (localStorage.getItem('musicVolume')) {
    audio.volume = parseFloat(localStorage.getItem('musicVolume'));
}

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
}

// زيادة مستوى الصوت
function increaseVolume() {
    if (audio.volume < 1.0) {
        audio.volume = Math.min(1.0, audio.volume + 0.1);
        localStorage.setItem('musicVolume', audio.volume.toString());
    }
}

// خفض مستوى الصوت
function decreaseVolume() {
    if (audio.volume > 0.0) {
        audio.volume = Math.max(0.0, audio.volume - 0.1);
        localStorage.setItem('musicVolume', audio.volume.toString());
    }
}

// إضافة التحكم في مستوى الصوت عبر لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    if (isPlaying) {
        // زيادة مستوى الصوت باستخدام مفتاح السهم للأعلى
        if (e.key === 'ArrowUp') {
            increaseVolume();
        }
        // خفض مستوى الصوت باستخدام مفتاح السهم للأسفل
        else if (e.key === 'ArrowDown') {
            decreaseVolume();
        }
        // إيقاف مؤقت/تشغيل باستخدام مفتاح المسافة
        else if (e.key === ' ') {
            toggleMusic();
        }
    }
});
