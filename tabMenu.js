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

        div.appendChild(tabName);
        div.appendChild(del);
        
        parent.appendChild(div);
    });
    
    for (var i = 0; i < keys.length; i++) {
        console.log(tabsObj[keys[i]]);
    }
}

const delTab = (tabsObj, key) => {
    
}

const openTabs = (tabsObj, key) => {
    let arr = tabsObj[key]['storeTabs'];
    let link;
    console.log(arr);
    arr.forEach( (tab, i) => {
        if (i == 0) {
            window.open(tab[2], null, 'noopener noreferrer');
        } else {
            link = document.createElement('a');
            link.href = tab[2];
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
    });
}

const run = () => {
    window.addEventListener('load', () => {
        getTabsInfo(showTabs);
        
    });
}

run();
