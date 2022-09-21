const storage = {
  set(variable, value, expires) {
    const data = {
      value,
      expires_at: new Date(expires).getTime(),
    };
    localStorage.setItem(variable.toString(), JSON.stringify(data));
    return value;
  },
  get(variable) {
    const data = JSON.parse(localStorage.getItem(variable.toString()));
    if (data !== null) {
      if (data.expires_at !== null && data.expires_at < new Date().getTime()) {
        localStorage.removeItem(variable.toString());
      } else {
        return data.value;
      }
    }
    return null;
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

export default storage;