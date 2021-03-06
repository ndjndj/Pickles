
const arrToHTMLTag = (arr) => {
    let parent = document.getElementById('tabsInfo');
    let div;
    let checkBox;
    let label;
    let link;
    let span;
    let tabTitle;
    let tabHref;
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

        //リンク情報作成
        tabTitle = document.createElement('input');
        tabHref = document.createElement('input');
        tabTitle.type = 'hidden';
        tabHref.type = 'hidden';
        tabTitle.value = tab[1];
        tabHref.value = tab[2];

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
const testArray = [
          [1, 'Qiita.com', 'https://Qiita.com']
        , [2, 'Qiita.com', 'https://Qiita.com']
        , [3, 'Qiita.com', 'https://Qiita.com']
        , [4, 'Qiita.com', 'https://Qiita.com']
        , [5, 'Qiita.com', 'https://Qiita.com']
        , [6, 'aタグ 新しいタブ - Google 検索','https://www.google.com/search?q=a%E3%82%BF%E3%82%B0+%E6%96%B0%E3%81%97%E3%81%84%E3%82%BF%E3%83%96&']
];

const saveTabs = () => {
    const key = dateToString(new Date());
    console.log(key);
    const tabName = document.getElementById('tabName');
    const tabsInfo = document.getElementById('tabsInfo');
    const containers = tabsInfo.getElementsByClassName('container');
    
    let newTabsInfo = [];
    let index = 1;
    Array.prototype.forEach.call(
          containers
        , (container) => {
            let checkVal = container.getElementsByClassName('checkLabel')[0]
                                    .getElementsByTagName('input')[0].checked;
            if (checkVal) {
                let tabTitle = container.getElementsByClassName('tabTitle')[0].value;
                let tabHref = container.getElementsByClassName('tabHref')[0].value;
                let info = [index, tabTitle, tabHref];
                newTabsInfo.push(info);
                
                index++;
            }
        }
    );
    
    

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

const run = () => {
    window.addEventListener('load', () => {
        const saveButtons = document.getElementsByClassName('save');
        console.log(saveButtons);
        // arrToHTMLTag(testArray);
        Array.prototype.forEach.call(
              saveButtons
            , (btn) => {btn.addEventListener('click', () => {saveTabs();})});
    });
}

run();
