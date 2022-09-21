type YMDHMS = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
};

type DHMS = Pick<YMDHMS, 'date' | 'hour' | 'minute' | 'second'>;

type HMS = Pick<YMDHMS, 'hour' | 'minute' | 'second'>;

interface ITimeObject {
  date: string | number;
  hour: string | number;
  minute: string | number;
  second: string | number;
}

/**
 * 剩余时间格式化（日时分秒）
 * @param remainTime 剩余时间
 */
export function remainTimeFormatDHMS(remainTime: number): DHMS {
  const date = Math.floor(remainTime / 864e5);
  const hour = Math.floor((remainTime % 864e5) / 36e5);
  const minute = Math.floor((remainTime % 36e5) / 6e4);
  const second = Math.floor(((remainTime % 36e5) % 6e4) / 1e3);
  return { date, hour, minute, second };
}

/**
 * 时间戳格式化（时分秒）
 * @param timestamp 时间戳
 */
export function timestampFormatHMS(timestamp: number): HMS {
  const d = new Date(timestamp);
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();
  return { hour, minute, second };
}

/**
 * 时间格式化
 * @param path {string} 所删除目录路径
 */
function formatTime(str, format) {
  let timestamp = 0;
  if (typeof str === 'string') {
    timestamp = parseInt(str, 10);
  } else {
    timestamp = str;
  }
  let D = null;
  if (Number.isNaN(timestamp)) {
    D = new Date();
  } else {
    D = new Date(timestamp);
  }

  let ret = '';
  if (D && !Number.isNaN(D.getTime())) {
    const fullyear = `${D.getFullYear()}`;
    const month = D.getMonth() + 1;
    const date = D.getDate();
    const hours = D.getHours();
    const minute = D.getMinutes();
    const second = D.getSeconds();
    const doublemonth = month > 9 ? `${month}` : `0${month}`;
    const doubledate = date > 9 ? `${date}` : `0${date}`;
    const doubleyear = fullyear.toString().substr(2);
    const doublehours = hours > 9 ? hours : `0${hours}`;
    const doubleminues = minute > 9 ? minute : `0${minute}`;
    const doublesecond = second > 9 ? second : `0${second}`;
    ret = format;
    ret = ret.replace(/YYYY/g, fullyear);
    ret = ret.replace(/YY/g, doubleyear);
    ret = ret.replace(/mm/g, doublemonth);
    ret = ret.replace(/m/g, `${month}`);
    ret = ret.replace(/dd/g, doubledate);
    ret = ret.replace(/d/g, `${date}`);
    ret = ret.replace(/hh/g, `${doublehours}`);
    ret = ret.replace(/h/g, `${hours}`);
    ret = ret.replace(/ii/g, `${doubleminues}`);
    ret = ret.replace(/i/g, `${minute}`);
    ret = ret.replace(/ss/g, `${doublesecond}`);
    ret = ret.replace(/s/g, `${second}`);
  }
  return ret;
}