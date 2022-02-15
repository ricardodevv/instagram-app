const { atom } = require("recoil");

const postPicture = atom({
  key: "postPicture",
  default: null,
});

export default postPicture;
