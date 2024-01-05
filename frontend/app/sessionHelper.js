function validateSession(key) {
  let seassionVal = sessionStorage.getItem(key);

  if (seassionVal !== null) {
    let sessionObj = JSON.parse(seassionVal);
    let expiredAt = new Date(value.expiredAt);

    if (expiredAt > new Date()) {
      // Validate expiry date.
      return sessionObj.value;
    } else {
      sessionStorage.removeItem(key);
    }
  }

  return null;
}

function setToSession(key, value, inMin) {
  let expiredAt = new Date(new Date().getTime() + 60000 * inMin);
  let obj = {
    value: value,
    expiredAt: expiredAt.toISOString(),
  };

  sessionStorage.setItem(key, JSON.stringify(obj));
}

function getFromSession(key) {
  let seassionVal = sessionStorage.getItem(key);

  if (seassionVal !== null) {
    let sessionObj = JSON.parse(seassionVal);
    let expiredAt = new Date(value.expiredAt);

    if (expiredAt > new Date()) {
      return sessionObj.value;
    } else {
      sessionStorage.removeItem(key);
    }
  }

  return null;
}

export { validateSession, setToSession };
