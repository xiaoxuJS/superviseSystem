import {
    isArray,
    isString
} from "./common"

function filterObjectUndefined(obj) { //封装过滤对象中的undefined属性
    let newObj = {};
    let objKeys = Object.keys(obj);
    objKeys.forEach(function (item) {
        if (obj[item] || obj[item] === 0) { //第一步过滤null属性和undefined
            newObj[item] = obj[item];
            if (isArray(newObj[item]) && newObj[item].length === 0) { //判断是否为空数组，删除该属性
                delete newObj[item]
            } else if (JSON.stringify(newObj[item]) === "{}") { //判断是否为空对象，删除该属性
                delete newObj[item]
            } else if (isArray(newObj[item])) { //对附件进行特殊处理
                if (newObj[item].length > 0 && newObj[item][0].uid) {
                    let arr = newObj[item].map(item => {
                        if (item.response) {
                            return item.response.data.attachmentId
                        } else {
                            return item.uid
                        }
                    });
                    newObj[item] = arr
                }
            } else if (isString(newObj[item])) {
                if (newObj[item].trim().length === 0) {
                    delete newObj[item]
                } else {
                    newObj[item] = newObj[item].trim()
                }
            }
        }
    });
    return newObj
}
export default filterObjectUndefined