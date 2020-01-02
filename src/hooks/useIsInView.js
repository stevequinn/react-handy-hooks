import { useRef, useEffect, useState } from "react";

//
// Usage:
// import React from "react";
// import { useIsInView } from "../hooks";

// const InView = props => {
//   const [ref, isIntersecting] = useIsInView("5px");
  
//   if (isIntersecting) console.log("InView render");
  
//   return (
//     <div ref={ref}>
//       {isIntersecting && <p>{props.msg}</p>}
//     </div>
//   );
// };
// export default InView;
//
const useIsInView = (margin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin: margin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.unobserve(ref.current);
    };
  });
  return [ref, isIntersecting];
};

export default useIsInView;
