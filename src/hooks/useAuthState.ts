import { useEffect, useState } from "react";

import { auth } from "../firebase/firebase";

const useAuthState = () => {
  const [isAuthStateReady, setIsAuthStateReady] = useState(false);
  const init = async () => {
    await auth.authStateReady();
    setIsAuthStateReady(true);
  };
  useEffect(() => {
    init();
  }, []);
  
  return isAuthStateReady
};

export default useAuthState;
