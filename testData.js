
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
        title.innerHTML = `${tab[0]}. ${tab[1]}`;
        link.innerHTML = tab[2];
        link.href = tab[2];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        div.appendChild(checkBox);
        div.appendChild(title);
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
        , [6, 'aタグ 新しいタブ - Google 検索','https://www.google.com/search?q=a%E3%82%BF%E3%82%B0+%E6%96%B0%E3%81%97%E3%81%84%E3%82%BF%E3%83%96&oq=a%E3%82%BF%E3%82%B0%E3%80%80%E3%81%82%E3%81%9F%E3%82%89%EF%BD%93&aqs=chrome.1.69i57j0i4l2j0i4i5i30l2.15566j0j9&sourceid=chrome&ie=UTF-8']
];

arrToHTMLTag(testArray);