const date = new Date();
const year = date.getFullYear();

// 今日の日付を取得
const toMonth = date.getMonth() + 1;
const toDay = toMonth + "-" + date.getDate();

// お昼休憩時刻
const lunchTime = new Date(year + "-" + toDay + " 13:00:00");
// 定時時刻
const regularTime = new Date(year + "-" + toDay + " 19:00:00");
// リセット
const resetTime = new Date(year + "-" + toDay + " 23:59:59");

/**
 * 定期実行を設定
 */
chrome.runtime.onInstalled.addListener(() => {
    // 現在時刻
    const nowTime = new Date();

    // 設定時刻を過ぎていた場合、時報をセットしない
    if (lunchTime > nowTime) {
        // お昼休憩の時報を設定
        chrome.alarms.create('lunch', { when: lunchTime.getTime() });
    }
    if (regularTime > nowTime) {
        // 定時時刻に時報を設定
        chrome.alarms.create('regular', { when: regularTime.getTime() });
    }
    if (resetTime > nowTime) {
        // 翌日の時報をセット
        chrome.alarms.create('resetAlarms', { when: resetTime.getTime() });
    }
});

/**
 * 時報を実行
 * 
 * @param {object} alarm
 */
chrome.alarms.onAlarm.addListener((alarm) => {
    let audioSrcPath;

    if (alarm.name === 'lunch') {
        let audioSrcPath = './mp3/speech_lunch_break_time.mp3';
        playAudio(audioSrcPath);
    }
    if (alarm.name === 'regular') {
        let audioSrcPath = './mp3/speech_regular_time.mp3';
        playAudio(audioSrcPath);
    }

    // 再読み込み
    if (alarm.name === 'resetAlarms') {
        chrome.runtime.reload()
    }
});

/**
 * オーディオを再生
 * 
 * @param {string} audioSrcPath 
 */
function playAudio(audioSrcPath) {
    let audio;
    audio = new Audio();
    audio.src = audioSrcPath;
    audio.play();
}
