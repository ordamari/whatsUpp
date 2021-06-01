



export const timeService = {
    isToday,
    isYesterday,
    isLastWeek,
    getFullDate,
    getTime,
    getDay
}

function getDay(timestamp){
    const date = new Date(timestamp);
    return date.toDateString().split(' ')[0];
}

function getTime(timestamp){
    const date= new Date(timestamp);
    return `${_getTimePiece(date.getHours())}:${_getTimePiece(date.getMinutes())}`
}

function getFullDate(timestamp){
    const date= new Date(timestamp);
    return `${_getTimePiece(date.getDate())}/${_getTimePiece(date.getMonth()+1)}/${date.getFullYear()}`
}

function isToday(timestamp){
    const midnight = _getMidnightTimestamp(Date.now());
    return timestamp>= midnight && timestamp<= _getNextDay(midnight);
}

function isYesterday(timestamp){
    const midnight = _getMidnightTimestamp(Date.now());
    return timestamp<=midnight && timestamp>=_getYesterday(midnight);
}

function isLastWeek(timestamp){
    const midnight = _getMidnightTimestamp(Date.now());
    const lastWeek = midnight-(6*1000*60*60*24);
    return timestamp>=lastWeek && timestamp<= _getNextDay(midnight);
}

function _getMidnightTimestamp(timestamp){
    const date= new Date(timestamp);
    return timestamp- ((date.getHours()*1000*60*60)+(date.getMinutes()*1000*60)+(date.getSeconds()*1000*60)+date.getMilliseconds());
}

function _getNextDay(timestamp){
    return timestamp+(1000*60*60*24);
}

function _getYesterday(timestamp){
    return timestamp-(1000*60*60*24);
}

function _getTimePiece(num){
    if(num<10) return '0'+num;
    return num+'';
}