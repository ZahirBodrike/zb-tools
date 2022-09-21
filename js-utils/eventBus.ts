class EventBus {
  eventMap = {};

  on = (eventName, callback) => {
    let callBackList = this.eventMap[eventName];
    if (!callBackList) {
      callBackList = [];
      this.eventMap[eventName] = callBackList;
    }
    if (callback && typeof callback === 'function') {
      callBackList.push(callback);
    }
  };

  emit = (eventName, params) => {
    const callBackList = this.eventMap[eventName];
    if (callBackList instanceof Array && callBackList.length > 0) {
      callBackList.forEach((callback) => {
        if (callback && typeof callback === 'function') {
          callback(params);
        }
      });
    }
  };

  remove = (eventName) => {
    this.eventMap[eventName] = null;
  };
}

export default new EventBus();
