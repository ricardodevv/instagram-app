import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Modal = () => {
  const [openModal, setOpenModal] = useRecoilState(modalState);

  return (
    <div>
      <h1>Modal View</h1>

      {openModal && <p>THE MODAL IS OPEN</p>}
    </div>
  );
};

export default Modal;
