import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { icons } from "./icons";
import "./styles.css";

export const Container = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const heroRef = useRef();
  const iconsRef = useRef([]);
  const iconCount = icons?.length;
  const { offsetWidth: width, offsetHeight: height } = heroRef?.current ?? {};
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      {hasMounted && (
        <div className="icon-layer">
          {icons.map(({ size, type, icon }, i) => {})}
        </div>
      )}
      <div className="hero-copy">
        <h1>
          Grow your
          <br /> <span>frontend skills</span>
        </h1>
        <h3>Learn advanced React, CSS, and JavaScript techniques.</h3>
        <a href="#">Get Started</a>
      </div>
    </div>
  );
};
