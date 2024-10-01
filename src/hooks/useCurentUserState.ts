import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../Atom/atom";

const useCurrentUserState = () => {
  const setCurrentUser = useSetRecoilState(currentUserState)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return
      setCurrentUser(user)
    })
  }, [setCurrentUser])
}

export default useCurrentUserState;