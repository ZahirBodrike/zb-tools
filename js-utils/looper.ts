type TTimer = number | null;
type TCallback = () => void;
type TInterval = number;

export default class Looper {
  public timer: TTimer;
  private callback: TCallback;
  private interval: TInterval;

  constructor(callback: TCallback, interval: TInterval) {
    this.timer = null;
    this.callback = () => {};
    this.interval = 5000;
    this.update(callback, interval);
  }

  private update(callback: TCallback = this.callback, interval: TInterval = this.interval) {
    this.callback = callback;
    this.interval = interval;
  }

  private st(delay?: boolean) {
    this.clear(); // 如多次执行_st，会先关闭原有timer，重开新的timer
    !delay && this.callback();
    this.timer = window.setInterval(this.callback, this.interval);
  }

  private rst(callback: TCallback, interval: TInterval) {
    this.clear();
    this.update(callback, interval);
  }

  /** 开始轮询，第一时间执行回调 */
  public start() {
    this.st();
  }

  /** 开始轮询，在下一次轮询时才执行回调 */
  public startDelay() {
    this.st(true);
  }

  /** 重启轮询，更新回调及时间间隔之后立即执行回调 */
  public restart(callback: TCallback, interval: TInterval) {
    this.rst(callback, interval);
    this.start();
  }

  /** 重启轮询并更新回调及时间间隔，下一次轮询时执行回调 */
  public restartDelay(callback: TCallback, interval: TInterval) {
    this.rst(callback, interval);
    this.startDelay();
  }

  /** 清除轮询实例 */
  public clear() {
    this.timer && clearInterval(this.timer);
    this.timer = null;
  }
}
