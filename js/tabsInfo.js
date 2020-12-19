const getTabsInfo = (callback) => {
    // storage のデータ取得
    chrome.storage.local.get(['tabsInfo'], (result) => {
        callback(result.tabsInfo);
    });
}

const getStores = (callback) => {
    // storage のデータ取得
    chrome.storage.local.get(['store'], (result) => {
        callback(result.store);
    });
}

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
        tabTitle.className = 'tabTitle';
        tabHref.className = 'tabHref';
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
        div.appendChild(tabTitle);
        div.appendChild(tabHref);
        parent.appendChild(div);

    });
}

const saveTabs = (store) => {
    let key = dateToString(new Date());
    // タブ名
    const tabName = document.getElementById('tabName').value;
    const tabsInfo = document.getElementById('tabsInfo');
    const containers = tabsInfo.getElementsByClassName('container');
    
    let newTabsInfo = loadCheckTabs(containers);
    // バリデーションチェック
    // タブが選択されていない場合
    if (newTabsInfo.length == 0) { 
        window.alert('nothing selected tab.'); 
        return;
    }
    // タブ名が不正な場合
    if (tabName == '' || tabName == undefined || tabName == null) { 
        window.alert('invalid tabName.'); 
        return;
    } 
    // store が空の場合(初回セーブ時)、新しいオブジェクトを作成する
    if (typeof(store) == 'undefined') {
        store = {};
    }
    // キーがすでに存在している場合、キーを再作成する
    if (store[String(key)] != undefined) {
        key = dateToString(new Date());
    }
    let newStore = {'tabName': tabName, 'storeTabs': newTabsInfo};
    store[String(key)] = newStore;
    //タブ情報を保存する
    chrome.storage.local.set({'store': store}, () => {
        // エラーがあった場合
        if (chrome.runtime.lastError) { 
            window.alert('failed to save tab infomation.') 
        } else {
            window.alert('save completed.');
            window.close();
        }
    }); 
}

const loadCheckTabs = (elem) => {
    // タブ情報を格納する配列
    let newTabsInfo = [];
    // 連番を振るために1からスタートしている
    let index = 1;
    // container からタブ情報を取得し、 newTabsInfo に情報を配列形式で格納する
    Array.prototype.forEach.call(
        elem
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

    return newTabsInfo
}

const zeroPadding = (targetNum, paddingNum) => {
    const ZERO = "0";
    let joinedZero = ZERO.repeat(paddingNum) + String(targetNum);
    return joinedZero.slice(-paddingNum)
}

const dateToString = (time) => {
    // 時間を YYYYMMDDSSmSmS 形式の文字で返す（数字は0埋めされている）
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
        const saveButton = document.getElementsByClassName('save')[0];

        getTabsInfo(arrToHTMLTag);
        saveButton.addEventListener('click', () => {getStores(saveTabs);});
    });
}

run();
