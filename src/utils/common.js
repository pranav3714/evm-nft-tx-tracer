function sleep(ms) {
  return new Promise((resolve) => [setTimeout(resolve, ms)]);
}

function flattenArray(arr) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flattenArray(val));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

module.exports = {
  sleep,
  flattenArray,
};
