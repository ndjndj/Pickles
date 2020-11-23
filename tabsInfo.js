const getTabsInfo = (callback) => {
    // storage のデータ取得
    chrome.storage.sync.get(['tabsInfo'], (result) => {
        callback(result.tabsInfo);
    });
}

const arrToHTMLTag = (arr) => {
    let parent = document.getElementById('tabsInfo');
    let div;
    let checkBox;
    let label;
    let link;
    let span;
    arr.forEach( (tab) => {
        //コンテナ作成
        div = document.createElement('div');
        div.className = 'container';
        
        //ラベル作成
        label = document.createElement('label');
        label.className = 'checkLabel';
        
        //チェックボックス作成
        checkBox = document.createElement('input');
        checkBox.className = 'checkBox';
        checkBox.type = 'checkbox';
        checkBox.checked = 'checked';
        span = document.createElement('span');
        span.textContent = `${tab[0]}. ${tab[1]}`;

        //リンク作成
        link = document.createElement('a');
        link.className = 'link';
        link.textContent = 'jump this page';
        link.href = tab[2];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
              
        //要素追加
        label.appendChild(checkBox);
        label.appendChild(span);
        div.appendChild(label);
        div.appendChild(link);
        parent.appendChild(div);
    });
}

const saveTabs = () => {
    const tabName = document.getElementById('tabName');
    const tabsInfo = document.getElementById('tabsInfo');
    console.log(tabName);
    console.log(tabsInfo);
}

const run = () => {
    window.addEventListener('load', () => {
        const saveButton = document.getElementsByClassName('save')[0];

        getTabsInfo(arrToHTMLTag);
        saveButton.addEventListener('click', () => {saveTabs();});
    });
}

run();
