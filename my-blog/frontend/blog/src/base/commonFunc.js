

export function getTimeStr(timestamp, separateSymbol) {
    var d = new Date(timestamp);
    if (!separateSymbol) separateSymbol = '-';
    return d.getFullYear() + separateSymbol +(d.getMonth() + 1) + separateSymbol +d.getDate() + '  ' + d.getHours() +':' + d.getMinutes() +':' + d.getSeconds();
}