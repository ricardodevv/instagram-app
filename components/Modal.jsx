import {
  ArrowCircleRightIcon,
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
  CameraIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
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
import { useClosePopUp } from "../src/utils";
import postPicture from "../atoms/postPicture";

const Modal = () => {
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const modalRef = useRef(null);
  const captionRef = useRef(null);
  const filePickerRef = useRef(null);
  const [selectedPicture, setSelectedPicture] = useRecoilState(postPicture);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);
  const [comment, setCommentValue] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("");
  const user = useRecoilValue(userState);
  const popUp = useClosePopUp();
  const [modalSection, setModalSection] = useState(1);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`;
      console.log(textAreaHeight);
    }

    if (selectedPicture && modalSection === 1) {
      setModalSection(modalSection + 1);
    }

    if (!selectedPicture && modalSection !== 1) {
      setModalSection(1);
    }
  }, [comment, selectedPicture]);

  const backButton = (e) => {
    setModalSection(modalSection - 1);
  };

  const uploadPost = async () => {
    if (loading) {
      return;
    }
    setLoading(!loading);

    let descriptionText = textAreaRef.current.value;
    let descriptionSplitted = descriptionText.split(" ");
    let tags = descriptionSplitted.filter((el) => el.includes("@"));
    console.log(tags);

    // 1) Create a post and add to firestore 'post' collection
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      description: descriptionText,
      profileImg: user.profilePic,
      tags: tags,
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
      onClick={(e) => popUp.closePopUp(e, openModal, modalRef, setOpenModal)}
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
        <div className="flex justify-between border-b border-gray-300">
          {modalSection > 1 && (
            <button onClick={(e) => backButton(e)}>
              <ArrowSmLeftIcon className="w-8 ml-3" />
            </button>
          )}
          <h1 className="w-full text-center m-2 text-md text-gray-700 mb-2 font-medium">
            Add a new post
          </h1>
          {modalSection > 1 && (
            <button>
              <p className="text-blue-500 text-sm font-medium mr-5">Next</p>
            </button>
          )}
        </div>
        {modalSection === 1 && (
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
        <div>
          {modalSection === 2 && (
            <div className="flex flex-col sm:flex sm:flex-row w-screen sm:min-w-[40rem] sm:min-h-[20rem] sm:max-w-[45rem] sm:h-fit p-1">
              <img
                src={selectedPicture}
                className="flex-1 p-4 self-center max-h-[15rem] max-w-[15rem] sm:max-h-[25rem] sm:max-w-[25rem] object-contain"
                alt="selected picture"
              />
              <div className="flex-1 flex-col sm:border-l border-gray-400">
                <h3 className="font-semibold text-gray-900 ml-3 mt-4">
                  Description
                </h3>
                <textarea
                  rows="1"
                  ref={textAreaRef}
                  value={comment}
                  className={`mt-1 w-full
                     resize-none overflow-auto border-0 outline-none focus:ring-0 text-gray-700`}
                  placeholder="Add a description..."
                  onChange={(e) => setCommentValue(e.target.value)}
                />
              </div>
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
