//验证特殊字符函数
export function checkName(val) {
    var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    var rs = "";
    for (var i = 0, l = val.length; i < val.length; i++) {
        rs = rs + val.substr(i, 1).replace(reg, '');
    }
    return rs;
}
//验证邮箱
export function validateEmail(val) {
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    return reg.test(val) ? false : true
}
//验证密码
export function validatePassword(val) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
    return reg.test(val) ? false : true
}
//验证验证码
export function validatecode(val) {
    let reg = /^[a-z0-9]{6}$/
    return reg.test(val) ? false : true
}