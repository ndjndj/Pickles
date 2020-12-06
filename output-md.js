const getMD = (callback) => {
    // storage のデータを取得
    chrome.storage.sync.get(['mdString'], (result) => {
        callback(result.mdString);
    });

}

const log = (s) => {
    console.log(s);
}

const run = () => {
    window.addEventListener('load', () => {
        getMD(log);

    });
}