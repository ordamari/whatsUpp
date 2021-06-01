
export const storageService={
    saveToStorage,
    loadFromStorage
}

function saveToStorage(key, val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str)
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    console.log(str);
    var val = JSON.parse(str)
    return val;
}