
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

const showTabsMenu = () => {
    openWindow('html/tabMenu.html', 'tabsMenu');
}

const downloadTabInfoCSV = (tabsInfo) => {
    // タイトル文字列のエスケープ処理
    let processedTabsInfo = tabsInfo.map(tabs => [tabs[0], escapeForCSV(tabs[1]), tabs[2]]);
    // 配列→CSV文字列
    let csvString = arrToStringCSV(processedTabsInfo);
    // ダウンロード実行
    execDownload(csvString, 'csv');
} 

const downloadTabInfoMarkDown = (tabInfo) => {
    // 配列→MarkDown フォーマット
    let mdString = arrToStringMarkDown(tabsInfo);
    // ダウンロード実行
    execDownload(mdString, 'md');
}

const openWindow = (url, name, option='width=480, height=600') => {
    let link = document.createElement('a');
    link.addEventListener('click', () => {window.open(url, name, option);});
    link.style.display = 'none';
    document.body.appendChild(link);
    var obj = link.click();
    document.body.removeChild(link);
}

const openOutputWindow = (tabsInfo) => {
    // arr->マークダウン文字列
    let md = arrToStringMarkDown(tabsInfo);

    //タブ情報を一時的に保存する
    chrome.storage.local.set({'mdString': md}, () => {});
    
    //新しいウインドウを作成する
    openWindow('html/output-md.html', 'output-md', 'width=360, height=500');
}

const saveTabInfo = (tabsInfo) => {
    //タブ情報を一時的に保存する
    chrome.storage.local.set({'tabsInfo': tabsInfo}, () => {});
    
    //新しいウインドウを作成する
    openWindow('html/tabsInfo.html', 'tabsInfo');
}

const arrToStringCSV = (arr, colDelimeter=',', rowDelimeter='\n') => {
    return arr.map((row) => row.map((cell) => escapeForCSV(cell)).join(colDelimeter)).join(rowDelimeter);
}

const arrToStringMarkDown = (arr) => {
    return arr.map((row) => `[${row[1]}](${row[2]})`).join('\n');
}

const execDownload = (content, fileType) => {
    // ファイル名作成
    let nowDate = new Date();
    let fileName = `${dateToString(nowDate)}.${fileType}`;
    // ダウンロードリンク作成
    let link = document.createElement('a');
    link.href = `data:text/plain,${encodeURIComponent(content)}`;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const zeroPadding = (targetNum, paddingNum) => {
    const ZERO = "0";
    let joinedZero = ZERO.repeat(paddingNum) + String(targetNum);
    return joinedZero.slice(-paddingNum)
}

const dateToString = (time) => {
    let year = zeroPadding(time.getFullYear(), 4);
    let month = zeroPadding(time.getMonth() + 1, 2);
    let day = zeroPadding(time.getDate(), 2);
    let hour = zeroPadding(time.getHours(), 2);
    let minutes = zeroPadding(time.getMinutes(), 2);
    let seconds = zeroPadding(time.getSeconds(), 2);
    let millisec = zeroPadding(time.getMilliseconds(), 3);
    return year + month + day + hour + minutes + seconds + millisec
}

const escapeForCSV = (s) => {
    return `"${s.replace(/\"/g, '\"\"')}"`
}

const log = (attr) => {
    console.log(attr);
}

const run = () => {
    window.addEventListener('load', () => {
        //operateCurrentTabs(log);
        const tabsButton = document.getElementById('tabs');
        const csvButton = document.getElementById('csv');
        const dlMdButton = document.getElementById('dl-md');
        const outputMdButton = document.getElementById('output-md');
        const saveButton = document.getElementById('save');

        tabsButton.addEventListener('click', () => {operateCurrentTabs(showTabsMenu);});
        csvButton.addEventListener('click', () => {operateCurrentTabs(downloadTabInfoCSV);});
        dlMdButton.addEventListener('click', () => {operateCurrentTabs(downloadTabInfoMarkDown);});
        outputMdButton.addEventListener('click', () => {operateCurrentTabs(openOutputWindow);});
        saveButton.addEventListener('click', () => {operateCurrentTabs(saveTabInfo);});
    });
    
}

run();

