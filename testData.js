
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
        span = document.createElement('span');
        span.innerHTML = `${tab[0]}. ${tab[1]}`;

        //リンク作成
        link = document.createElement('a');
        link.className = 'link';
        link.innerHTML = 'jump this page';
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

arrToHTMLTag(testArray);