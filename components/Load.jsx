import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import loaderAnimation from "../components/Loader.json";

function Load() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loaderAnimation,
    });
  }, []);

  return <div ref={container} className="w-16 h-16"></div>;
}

export default Load;
