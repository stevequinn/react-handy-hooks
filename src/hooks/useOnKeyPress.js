import { useState, useEffect, useCallback } from "react";

const useOnKeyPress = (
  targetKey,
  onKeyDown,
  onKeyUp,
  w = window,
  isDebugging = false
) => {
  const [isKeyDown, setIsKeyDown] = useState(false);
  const onKeyDownLocal = useCallback(e => {
    if (isDebugging && console) {
      console.log(
        "key down",
        e.key,
        e.key !== targetKey ? "- isn't triggered" : "- is triggered"
      );
    }
    if (e.key !== targetKey) return;
    setIsKeyDown(true);
    if (typeof onKeyDown !== "function") return;
    onKeyDown(e);
  });
  const onKeyUpLocal = useCallback(e => {
    if (isDebugging && console) {
      console.log(
        "key up",
        e.key,
        e.key !== targetKey ? "- isn't triggered" : "- is triggered"
      );
    }
    if (e.key !== targetKey) return;
    setIsKeyDown(false);
    if (typeof onKeyUp !== "function") return;
    onKeyUp(e);
  });
  useEffect(() => {
    w.addEventListener("keydown", onKeyDownLocal);
    w.addEventListener("keyup", onKeyUpLocal);
    return () => {
      w.removeEventListener("keydown", onKeyDownLocal);
      w.removeEventListener("keyup", onKeyUpLocal);
    };
  });
  return isKeyDown;
};

export default useOnKeyPress;
