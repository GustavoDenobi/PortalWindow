export let store = {
  stgs: {
    localId: "aaa",
    remoteId: "bbb"
  },

  loadFromStorage() {
    if (localStorage.stgs) {
      Object.assign(store.stgs, JSON.parse(localStorage.stgs));
      console.log("loaded:");
      console.log(localStorage.stgs);
    }
  },

  saveToStorage() {
    console.log("previous:");
    console.log(localStorage.stgs);
    localStorage.setItem("stgs", JSON.stringify(store.stgs));
    console.log("now:");
    console.log(localStorage.stgs);
  }
};
