import { CameraIcon, PhotographIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
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
  const textAreaRef = useRef(null);
  const [comment, setCommentValue] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("");
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (comment.length > 0) {
      const scrollHeight = textAreaRef.current.scrollHeight;
      setTextAreaHeight(`${scrollHeight}px`);
      console.log(textAreaHeight);
    }
    // setTextAreaHeight("");
    // textAreaRef.current.scrollHeight !== undefined
    // console.log(textAreaRef.current.scrollHeight);
    // const scrollHeight = textAreaRef.current.scrollHeight;
    // setTextAreaHeight(scrollHeight + "px");
  }, [comment]);

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
    closePopUp(e, openModal, modalRef, setOpenModal, setSelectedPicture);
  };

  return (
    <div
      onClick={(e) => closeModal(e)}
      className={`fixed inset-0 flex items-center justify-center 
        bg-black bg-opacity-80
          ${openModal ? "z-50" : "z-[-1]"}`}
    >
      <div
        ref={modalRef}
        className={`relative flex flex-col w-fit rounded-2xl mt-4 sm:mx-auto bg-white transition-all duration-200 ease-in ${
          openModal ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div className="flex justify-center border-b border-gray-300">
          <h1 className="m-2 text-md text-gray-700 mb-2 font-medium">
            Add a new post
          </h1>
        </div>
        <div>
          {selectedPicture ? (
            <div className="flex w-screen sm:min-w-[40rem] sm:max-w-[45rem] sm:h-fit p-1">
              <img
                src={selectedPicture}
                className="flex-1 max-h-[24rem] object-contain"
                alt="selected picture"
              />
              <div className="flex flex-col flex-1 mt-2">
                <h3 className="font-semibold text-gray-900 ml-3">
                  Description
                </h3>
                <textarea
                  ref={textAreaRef}
                  value={comment}
                  className={`mt-2 w-full
                     resize-none overflow-auto border-0 outline-none focus:ring-0 text-gray-700`}
                  style={{ height: textAreaHeight }}
                  placeholder="Add a description..."
                  onChange={(e) => setCommentValue(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col w-screen sm:w-[25rem] items-center mx-auto my-24">
              <PhotographIcon className="w-[8rem] mb-8 text-gray-600" />
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
          <input ref={filePickerRef} type="file" hidden onChange={addPost} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
