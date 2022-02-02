import { CameraIcon } from "@heroicons/react/outline";
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

  return (
    <div
      onClick={(e) => closePopUp(e, openModal, modalRef, setOpenModal)}
      className={`fixed inset-0 flex items-center justify-center 
        bg-black bg-opacity-90 
          ${openModal ? "inline-grid" : "hidden"}`}
    >
      {openModal && (
        <div
          ref={modalRef}
          className="relative w-screen h-screen top-12 sm:w-[40rem] sm:mx-auto bg-white"
        >
          <div className="m-8">
            <h1 className="text-3xl text-gray-800 mb-2 font-medium">
              Add a Post
            </h1>
            <div className="flex flex-col items-center justify-center">
              <div
                className="flex w-full h-[15rem] my-4 justify-center border-2 border-dashed 
              border-gray-300 transition ease-linear duration-150 
                hover:border-solid hover:border-gray-600 
                hover:rounded-md cursor-pointer"
                onClick={() => filePickerRef.current.click()}
              >
                {selectedPicture ? (
                  <img
                    src={selectedPicture}
                    className="w-full object-contain cursor-pointer"
                    alt="selected picture"
                    onClick={() => setSelectedPicture(null)}
                  />
                ) : (
                  <CameraIcon className="w-14 m-10 text-gray-600" />
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
              <div className="flex flex-col w-full align-start">
                <h3 className="font-medium">Description</h3>
                <input
                  placeholder="Add a description..."
                  ref={captionRef}
                  className="border-none flex-1 my-1 focus:ring-0 outline-none"
                />
                <div className="flex mt-5 space-x-4 justify-end">
                  <button className="postBtn text-white bg-black">
                    Cancel
                  </button>
                  <button className="postBtn text-black" onClick={uploadPost}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
