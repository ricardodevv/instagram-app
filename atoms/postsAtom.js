const { atom } = require("recoil");

const postsState = atom({
  key: "postsState",
  default: [],
});

export default postsState;
