export const getTabsInfo = (callback) => {
    // storage のデータ取得
    chrome.storage.sync.get(['tabsInfo'], (result) => {
        callback(result.tabsInfo);
    });
}

export const arrToHTMLTag = (arr) => {
    let parent = document.getElementById('tabsInfo');
    let div;
    let checkBox;
    let label;
    let link;
    let span;
    arr.forEach( (tab) => {
        //要素作成
        div = document.createElement('div');
        label = document.createElement('label');
        checkBox = document.createElement('input');
        link = document.createElement('a');
        span = document.createElement('span');

        //プロパティ設定
        checkBox.type = 'checkbox';
        title.innerHTML = `${tab[0]}. ${tab[1]}`;
        link.innerHTML = tab[2];
        link.href = tab[2];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        div.className = 'container';
        checkBox.className = 'checkBox';
        title.className = 'title';
        link.className = 'link';

        div.appendChild(checkBox);
        div.appendChild(title);
        div.appendChild(link);
        parent.appendChild(div);
    });
}

export const run = () => {
    window.addEventListener('load', () => {
        getTabsInfo(arrToHTMLTag);
    });
}

run();
