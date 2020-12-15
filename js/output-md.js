const getMD = (callback) => {
    // storage のデータを取得
    chrome.storage.local.get(['mdString'], (result) => {
        callback(result.mdString);
    });

}

const copyClipboard = (id) => {
    // クリップボードにコピー
    let target = document.getElementById(id);
    target.select();
    document.execCommand('copy');
}

const pasteMDString = (mdString) => {
    // textarea の値を任意の文字列に変更
    let textarea = document.getElementById('output-md');
    // 任意の文字列に何もなければ、何も表示しない。
    textarea.value = mdString == 'undefined' ? '' : mdString;
}

const closeWindow = () => {
    window.close();
}

const run = () => {
    window.addEventListener('load', () => {
        getMD(pasteMDString);
        const copyButton = document.getElementById('copy');
        const exitButton = document.getElementById('exit');

        copyButton.addEventListener('click', () => {copyClipboard('output-md');});
        exitButton.addEventListener('click', () => {closeWindow();});
    });
}

run();
