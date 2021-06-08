const deleteItem = (arr, label = null, value) => {
  if (label) {
    arr.forEach((item, index) => {
      if (item[label] === value) {
        arr.splice(index, 1);
      } else if (Array.isArray(item)) {
        this.deleteItem(item);
      }
    });
  } else {
    if (item === value) {
      arr.splice(index, 1);
    }
  }
};
export {deleteItem};
