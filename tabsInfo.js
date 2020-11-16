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
    let title;
    let link;
    
    arr.forEach( (tab) => {
        div = document.createElement('div');
        checkBox = document.createElement('input');
        title = document.createElement('p');
        link = document.createElement('a');

        checkBox.type = 'checkbox';
        console.log(title);
        console.log(link);
        div.appendChild(checkBox);
        div.appendChild(title);
        div.appendChild(link);
        parent.appendChild(div);
    });
}

const run = () => {
    window.addEventListener('load', () => {
        getTabsInfo(arrToHTMLTag);
    });
}

run();
