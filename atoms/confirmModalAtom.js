import { atom } from "recoil";

const confirmModal = atom({
  key: "confirmModalState",
  default: false,
});

export default confirmModal;
