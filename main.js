
const operateCurrentTabs = (callback) => {
    // 現在のウィンドウのタブをすべて取得する
    chrome.tabs.query(
        {currentWindow: true}, 
        (tabs) => {
            tabsInfo = tabs.map( (tab, i) => [String(i+1), tab.title, tab.url] );
            // タブの情報をコールバック関数に渡す
            callback(tabsInfo);
        }
    );
}

const downloadTabInfo = (tabsInfo) => {
    // タイトル文字列のエスケープ処理
    let processedTabsInfo = tabsInfo.map(tabs => [tabs[0], escapeForCSV(tabs[1]), tabs[2]]);
    // 配列→CSV文字列
    let csvString = arrToString(processedTabsInfo);
    console.log(csvString);
    alert(csvString);
} 

const arrToString = (arr) => {
    const colDelimeter = ',';
    const rowDelimeter = '\n';
    let s = arr.map((row) => row.join(colDelimeter)).join(rowDelimeter);
    return s
}


const escapeForCSV = (s) => {
    const targetLst = ['\"', ',', '\\\\n', '\\\\r'];
    const escapedLst = ['\"\"\"', '\",\"', '\"\\n\"', '\"\\r\"'];
    let escapedValue = String(s);
    targetLst.forEach((elm, i) => {
        let reg = new RegExp(elm, 'g');
        escapedValue = escapedValue.replace(reg, escapedLst[i]);
    });

    return escapedValue
}

const log = (attr) => {
    console.log(attr);
}

const run = () => {
    window.addEventListener('load', () => {
        //operateCurrentTabs(log);
        const dlButton = document.getElementById('download');
        dlButton.addEventListener('click', () => {operateCurrentTabs(downloadTabInfo);});
    })

   
    
}

run();

