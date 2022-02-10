import { CameraIcon, PhotographIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { userState } from "../atoms/userAtom";
import { db, storage } from "../firebase";
import { closePopUp } from "../src/utils";

const Modal = () => {
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const modalRef = useRef(null);
  const captionRef = useRef(null);
  const filePickerRef = useRef(null);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);

  const uploadPost = async () => {
    if (loading) {
      return;
    }
    setLoading(!loading);

    // 1) Create a post and add to firestore 'post' collection
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      caption: captionRef.current.value,
      profileImg: user.profilePic,
      timestamp: serverTimestamp(),
    });

    console.log("New doc added with ID", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedPicture, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpenModal(false);
    setLoading(false);
    setSelectedPicture(null);
  };

  const addPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      setSelectedPicture(reader.result);
    };
  };

  const closeModal = (e) => {
    closePopUp(e, openModal, modalRef, setOpenModal);
    setSelectedPicture(null);
  };

  return (
    <div
      onClick={(e) => closeModal(e)}
      className={`fixed z-50 inset-0 flex items-center justify-center 
        bg-black bg-opacity-80 
          ${openModal ? "inline-grid" : "hidden"}`}
    >
      {openModal && (
        <div
          ref={modalRef}
          className="relative rounded-2xl mt-4 w-screen sm:w-[25rem] sm:mx-auto bg-white"
        >
          <div className="flex justify-center border-b border-gray-300">
            <h1 className="m-2 text-md text-gray-600 mb-2 font-medium">
              Add a new post
            </h1>
          </div>
          <div>
            <div className="flex flex-col py-24 items-center justify-center">
              <div
                className="flex flex-col w-full justify-center items-center 
              border-gray-300 transition ease-linear duration-150 
                hover:border-solid hover:border-gray-600 
                hover:rounded-md"
              >
                {selectedPicture ? (
                  <img
                    src={selectedPicture}
                    className="w-full object-contain cursor-pointer"
                    alt="selected picture"
                    onClick={() => setSelectedPicture(null)}
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <PhotographIcon className="w-18 m-10 text-gray-600" />
                    <button
                      className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-md cursor-pointer"
                      onClick={() => filePickerRef.current.click()}
                    >
                      Select file from computer
                    </button>
                  </div>
                )}
              </div>

              <div>
                <input
                  ref={filePickerRef}
                  type="file"
                  hidden
                  onChange={addPost}
                />
              </div>
              {/* <div className="flex flex-col w-full align-start">
                <input
                  placeholder="Add a description..."
                  ref={captionRef}
                  className="border-none flex-1 my-1 focus:ring-0 outline-none"
                />
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
