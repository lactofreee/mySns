import { User } from "firebase/auth";
import { atom } from "recoil";
import { ITweet } from "../components/Posting/tweet";
import { DropDownProps } from "../utils/dropdown";


//  사용자 상태
export const currentUserState = atom({
  key: "currentUserState",
  default: null as User | null,
});

//  트윗 상태
export const tweetsState = atom<ITweet[]>({
  key: "tweetsState",
  default: [],
});

export const modalState = atom({
  key: "modalState",
  default: false,
})

export const currentTweet = atom<DropDownProps>({
  key: "currentTweet",
  default: {
    currentUser: null,
    id: "",
    photo: "",
    isUserAuthorizedToDelete: false
  },
})

interface newTweet {
  tweet: string,
  preview: string,
}

export const tweetToUpdate = atom<newTweet>({
  key: "tweetYoUpdate",
  default: {
    tweet: "",
    preview: "",
  }
})