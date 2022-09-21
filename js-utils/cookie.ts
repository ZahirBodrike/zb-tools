/**
 * 设置cookie
 * @param name {string} cookie key
 * @param value {string} cookie value
 * @param option {object} cookie其他参数
 */
function setCookie(name, value, option = {}) {
  const exp = new Date();
  const optionArray = Object.keys(option).map(key => {
    return `;${key}=${option[key]}`;
  });
  document.cookie = `${name}=${escape(value)};expires=${exp.toUTCString()}${optionArray.join('')}`;
}

/**
 * 获取cookie
 * @param name {string} cookie key
 */
function getCookie(name) {
  const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
  if (arr !== null) {
    return unescape(arr[2]);
  }
  return null;
}