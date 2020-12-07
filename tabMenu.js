const getTabsInfo = (callback) => {
    // storage のデータ取得
    chrome.storage.sync.get(['store'], (result) => {
        callback(result.store);
    });
}

const showTabs = (tabsObj) => {
    const keys = Object.keys(tabsObj);
    const parent = document.getElementById('tabsInfo');
    
    let div;
    let tabName;
    let del;
    keys.forEach( (key) => {
        // コンテナ作成
        div = document.createElement('div');
        div.className = 'container';

        // タブ名作成
        tabName = document.createElement('a');
        tabName.className = 'tabName';
        tabName.innerText = tabsObj[key]['tabName'];
        // 削除ボタン作成
        del = document.createElement('a');
        del.className = 'del';
        del.innerText = 'DEL';

        div.appendChild(tabName);
        div.appendChild(del);
        
        parent.appendChild(div);
    });
    
    for (var i = 0; i < keys.length; i++) {
        console.log(tabsObj[keys[i]]);


    }



}

const run = () => {
    window.addEventListener('load', () => {
        getTabsInfo(showTabs);
        
    });
}

run();
