
const arrToHTMLTag = (arr) => {
    let parent = document.getElementById('tabsInfo'); 
    let div;
    let checkBox;
    let title;
    let link;
    let label;
    arr.forEach( (tab) => {
        div = document.createElement('div');
        checkBox = document.createElement('input');
        title = document.createElement('p');
        link = document.createElement('a');
        label = document.createElement('label');

        checkBox.type = 'checkbox';
        title.innerHTML = `${tab[0]}. ${tab[1]}`;
        link.innerHTML = tab[2];
        link.href = tab[2];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        div.className = 'container';
        label.className = 'checkLabel';
        checkBox.className = 'checkBox';
        title.className = 'title';
        link.className = 'link';

        label.appendChild(checkBox);
        label.appendChild(title);
        label.appendChild(link);
        div.appendChild(label);
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