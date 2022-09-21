/**
 * 修改cdn img的分辨率
 * @param url {string} 图片url
 * @param size {string} 图片分辨率
 */
function getClipCDNImageURL(url: string, size = '200x200'): string {
  if (typeof url === 'string' && url.length > 0) {
    return url.replace(/.(jpg|png|gif|jpeg|bmp)$/, `_${size}.$1`);
  }
  return url;
}