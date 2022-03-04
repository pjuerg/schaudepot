const fadeRight = {
  name: "fade right",
  variants: {
    initial: {
      opacity: 0,
      x: -25,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 25,
    },
  },
  transition: {
    duration: 0.3,
    ease: "easeOut",
    opacity: {
      duration: 0.2,
    },
  },
};

const fadeLeft = {
  name: "fade Left",
  variants: {
    initial: {
      opacity: 0,
      x: 25,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -25,
    },
  },
  transition: {
    duration: 0.3,
    ease: "easeOut",
    opacity: {
      duration: 0.2 },
  },
};

const fadeOut = {
  name: "fade out",
  variants: {
    initial: {
      opacity: 1,
    
    },
    animate: {
      opacity: 0,
    
    },
    exit: {
      opacity: 1,
    },
  },
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

const shiftRight = {
  name: "Shift Right",
  variants: {
    initial: {
      x: "-100%",
    },
    animate: {
      x: 0,
    },
    exit: {
      x: "100%",
    },
  },
  transition: {
    duration: 0.3,
  },
};

const shiftLeft = {
  name: "Shift Left",
  variants: {
    initial: {
      x: "100%",
    },
    animate: {
      x: 0,
    },
    exit: {
      x: "-100%",
    },
  },
  transition: {
    duration: 0.3,
  },
};

const slideUp = {
  name: "Slide Up",
  variants: {
    initial: {
      opacity: 0,
      top: "100vh",
      scale: 0.4,
    },
    animate: {
      opacity: 1,
      top: "0vh",
      scale: 1,
    },
    exit: {
      opacity: 0,
      top: "100vh",
      scale: 0.4,
    },
  },
  transition: {
    duration: 0.7,
  },
};

const slideRight = {
  name: "Slide Right",
  variants: {
    initial: {
      opacity: 0,
      left: "-100%",
      scale: 0.6,
    },
    animate: {
      opacity: 1,
      left: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      left: "100%",
      scale: 0.6,
    },
  },
  transition: {
    duration: 0.7,
  },
};

const fadeBack = {
  name: "Fade Back",
  variants: {
    initial: {
      opacity: 0,
      scale: 0.4,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.4,
    },
  },
  transition: {
    duration: 0.7,
  },
};

const rotateY = {
  name: "Rotate Y",
  variants: {
    initial: {
      rotateY: 90,
    },
    animate: {
      rotateY: 0,
    },
    exit: {
      rotateY: 90,
    },
  },
  transition: {
    duration: 0.7,
  },
};

const rotateX = {
  name: "Rotate X",
  variants: {
    initial: {
      rotateZ: 90,
      opacity: 0,
      scale: 0.6,
    },
    animate: {
      opacity: 1,
      rotateZ: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      rotateZ: 90,
      scale: 0.6,
    },
  },
  transition: {
    duration: 0.7,
  },
};

const rotateZ = {
  name: "Rotate Z",
  variants: {
    initial: {
      opacity: 0,
      rotateZ: 360,
    },
    animate: {
      opacity: 1,
      rotateZ: 0,
    },
    exit: {
      opacity: 0,
      rotateZ: 360,
    },
  },
  transition: {
    duration: 0.7,
  },
};

export const animations = [
  fadeRight,
  fadeLeft,
  fadeOut,
  shiftRight,
  shiftLeft,
  slideUp,
  slideRight,
  fadeBack,
  rotateX,
  rotateY,
  rotateZ,
];
