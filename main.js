const getTabs = () => {
    // 現在のウィンドウのタブをすべて取得する
    chrome.tabs.query({currentWindow: True}, (tabs) => {
        console.log(tabs);
    })


}

window.addEventListener('load', () => {
    getTabs();
})