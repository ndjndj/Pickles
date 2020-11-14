const getTabs = () => {
    // 現在のウィンドウのタブをすべて取得する
    
    let currentTabs = [];
    chrome.tabs.query(
        {currentWindow: true}, 
        (tabs) => {
            console.log(tabs);
            for(var i=0; i<tabs.length; i++) {
                console.log(tabs[i].url);
            }
        }
    )

    console.log(currentTabs);

}

window.addEventListener('load', () => {
    getTabs();
})