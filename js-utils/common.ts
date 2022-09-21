/**
 * 是否空对象
 * @param obj {object} 是否为空对象
 */
const isEmptyObject = obj => Reflect.ownKeys(obj).length == 0 && obj.constructor == Object;

/**
 * 判断变量类型
 * @param data {any} 需要判断类型的数据
 */
function typeString(data) {
  return `${Object.prototype.toString.call(data)}`.slice(8, -1).toLocaleLowerCase();
}

/**
 * sleep等待一段时间再执行
 * @param time {number} 延迟多久ms
 */
const wait = async (time) => new Promise((resolve) => setTimeout(resolve, time));

/**
 * 打乱数组
 * @param arr {array} 需要处理的数组
 */
const shuffle = arr => arr.sort(() => 0.5 - Math.random());

/**
 * 数组扁平化
 * @param arr {array} 需要处理的数组
 */
function parseTreeToFlatObject(data) {
  const result = {};
  data &&
    Array.isArray(data) &&
    data.forEach(item => {
      Array.isArray(item.childs) &&
        item.childs.forEach(child => {
          result[child.id] = child.name;
        });
    });
  return result;
}

/**
 * 点击下载
 * @param url {string} 下载文件url
 * @param fileName {string} 文件名称
 */
function clickDownload(url, fileName) {
  const a = document.createElement('a');
  a.download = fileName;
  a.style.display = 'none';
  a.href = url;
  document.body.appendChild(a);
  a.click();
}

/**
 * promise超时
 * @param path {string} 所删除目录路径
 */
function timeoutWrapper(fn, timeout = 3000) {
  const wait = new Promise((resolve) => {
    setTimeout(() => {
      resolve('请求超时');
    }, timeout);
  });
  return Promise.race([fn, wait]);
}
