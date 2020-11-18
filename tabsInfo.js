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
    let title;
    let link;

    arr.forEach( (tab) => {
        div = document.createElement('div');
        checkBox = document.createElement('input');
        title = document.createElement('p');
        link = document.createElement('a');


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
