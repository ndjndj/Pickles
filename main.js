
const operateCurrentTabs = (callback) => {
    // 現在のウィンドウのタブをすべて取得する
    chrome.tabs.query(
        {currentWindow: true}, 
        (tabs) => {
            tabsInfo = tabs.map( (tab, i) => [i+1, tab.title, tab.url] );
            // タブの情報をコールバック関数に渡す
            callback(tabsInfo);
        }
    );
}

const downloadTabInfo = (tabsInfo) => {
    const delimeter = "\n";
} 

const log = (attr) => {
    console.log(attr);
}

window.addEventListener('load', () => {
    operateCurrentTabs(log);
})