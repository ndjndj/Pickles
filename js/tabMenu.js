const getTabsInfo = (callback) => {
    // storage のデータ取得
    chrome.storage.local.get(['store'], (result) => {
        callback(result.store);
    });
}

const showTabs = (tabsObj) => {
    const keys = Object.keys(tabsObj);
    const parent = document.getElementById('tabsInfo');
    
    let div;
    let tabName;
    let info;
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
        // 一覧ボタン作成
        info = document.createElement('a');
        info.className = 'info';
        info.innerText = 'INFO';
        info.addEventListener('click', () => {infoTab(tabsObj, key);});
        // 削除ボタン作成
        del = document.createElement('a');
        del.className = 'del';
        del.innerText = 'DEL';
        del.addEventListener('click', () => {delTab(tabsObj, key)});


        div.appendChild(tabName);
        div.appendChild(info);
        div.appendChild(del);
        
        parent.appendChild(div);
    });
    
    for (var i = 0; i < keys.length; i++) {
        console.log(tabsObj[keys[i]]);
    }
}

const infoTab = (tabsObj, key) => {
    //タブ情報を一時的に保存する
    chrome.storage.local.set({'tabsInfo': tabsObj[key]['storeTabs']}, () => {});
    
    //新しいウインドウを作成する
    openWindow('tabsInfo.html', 'tabsInfo');
}

const delTab = (tabsObj, key) => {
    // 確認
    let confirm = window.confirm('Are you sure you want to permanently delete this tab infomation?');
    if (!confirm) return;
    // 削除
    delete tabsObj[key];
    // store 更新
    chrome.storage.local.set({'store': tabsObj}, () => {});
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

const openWindow = (url, name, option='width=470, height=600') => {
    let link = document.createElement('a');
    link.addEventListener('click', () => {window.open(url, name, option);});
    link.style.display = 'none';
    document.body.appendChild(link);
    var obj = link.click();
    document.body.removeChild(link);
}

const run = () => {
    window.addEventListener('load', () => {
        getTabsInfo(showTabs);
        
    });
}

run();
