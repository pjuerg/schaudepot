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


export const animations = [
  fadeRight,
  fadeLeft,
  fadeOut,
];
