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
        tabName.innerText = `${tabsObj[key]['tabName']}(${tabsObj[key]['storeTabs'].length})`;
        tabName.addEventListener('click', () => {openTabs(tabsObj, key)});
        // 削除ボタン作成
        del = document.createElement('a');
        del.className = 'del';
        del.innerText = 'DEL';
        del.addEventListener('click', () => {delTab(tabsObj, key)});
        

        div.appendChild(tabName);
        div.appendChild(del);
        
        parent.appendChild(div);
    });
    
    for (var i = 0; i < keys.length; i++) {
        console.log(tabsObj[keys[i]]);
    }
}

const delTab = (tabsObj, key) => {
    delete tabsObj[key];
    // store 更新
    chrome.storage.sync.set({'store': tabsObj}, () => {});
    // 更新
    location.reload();
}

const openTabs = (tabsObj, key) => {
    let arr = tabsObj[key]['storeTabs'];
    let link;
    console.log(arr);
    arr.forEach( (tab) => {
        link = document.createElement('a');
        link.href = tab[2];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);    
    });
}

const run = () => {
    window.addEventListener('load', () => {
        getTabsInfo(showTabs);
        
    });
}

run();
