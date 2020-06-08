const date = new Date();
const year = date.getFullYear();

// 今日の日付を取得
const toMonth = date.getMonth() + 1;
const toDay = toMonth + "-" + date.getDate();

// お昼休憩時刻
const lunchTime = new Date(year + "-" + toDay + " 13:00:00");
// 定時時刻
const regularTime = new Date(year + "-" + toDay + " 19:00:00");

chrome.runtime.onInstalled.addListener(() => {
    // お昼休憩の時報を設定
    chrome.alarms.create('lunch', { when: lunchTime.getTime() });
    // 定時時刻に時報を設定
    chrome.alarms.create('regular', { when: regularTime.getTime() });
});

/**
 * 時報を実行
 */
chrome.alarms.onAlarm.addListener((alarm) => {
    let audioSrcPath;
    if (alarm.name === 'lunch') {
        let audioSrcPath = './mp3/speech_lunch_break_time.mp3';
        playAudio(audioSrcPath);

    } else if (alarm.name === 'regular') {
        let audioSrcPath = './mp3/speech_regular_time.mp3';
        playAudio(audioSrcPath);
    }
});

/**
 * オーディオを再生
 * 
 * @param {string} audioSrcPath 
 */
function playAudio(audioSrcPath)
{
    let audio;
    audio = new Audio();
    audio.src = audioSrcPath;
    audio.play();
}
