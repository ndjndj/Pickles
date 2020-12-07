const getTabsInfo = (callback) => {
    // storage のデータ取得
    chrome.storage.sync.get(['store'], (result) => {
        callback(result.store);
    });
}

const showTabs = (tabsObj) => {
    const keys = Object.keys(tabsObj);

    console.log(keys);

    for (var i = 0; i < keys.length; i++) {
        console.log(tabsObj[keys[i]]);
    }
}

const run = () => {
    window.addEventListener('load', () => {
        getTabsInfo(showTabs);
        
    });
}

run();
