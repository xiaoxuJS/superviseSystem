
export function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

//判断是否是字符串
export function isString(o) {
    return Object.prototype.toString.call(o) === '[object String]';
}
    