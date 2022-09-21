/**
 * 该字符串是否符合url特征
 * @param str {string} 是否符合url特性的字符串
 */
function validURL(str) {
  const pattern = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  return pattern.test(str);
}

/**
 * 判断字符串是否为url
 * @param str {string} 是否符合url特性的字符串
 */
function isUrl(str) {
  const v = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
  return v.test(str);
}


/**
 * 转化url query为search的对象 "?a=123&b=123" -> search对象
 * @param search {string} location.search
 */
function getQueryFromQuery(search = location.search) {
  const query = {};
  if (search.indexOf('?') === 0) search = search.slice(1);
  search.split('&').forEach(str => {
      if (!str) return;
      const arr = str.split('=');
      query[arr[0]] = decodeURIComponent(arr[1]);
  });
  return query;
}

/**
 * 转化search的对象为url query  search对象 -> "a=123&b=123"
 * @param query {object} query对象
 */
function queryToString(query) {
  if (!query) return '';
  return Object.entries(query)
    .map(([key, value]) => {
        if (value === undefined || value === null) return '';
        return `${key}=${encodeURIComponent(value)}`;
    })
    .filter(s => s)
    .join('&');
}

/**
 * 获取url某个参数 包括query和hash  search对象 -> "a=123&b=123"
 * @param query {name} 查找参数名
 */
function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.url.substr(1).match(reg);
  if (r !== null) return r[2];
  return null;
}