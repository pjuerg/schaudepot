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

const slideTop = {
  name: "slide top",
  variants: {
    initial: {
      y: 0,
    },
    animate: {
      y: -72,
    },
    exit: {
      y: 0,
    },
  },
  transition: {
    duration: 0.15,
    ease: "easeOut",
    
  },
};

const slideBottom = {
  name: "slide bottom",
  variants: {
    initial: {
      y: -60,
    },
    animate: {
      y: 0,
    },
    exit: {
      y: -60,
    },
  },
  transition: {
    duration: 0.15,
    ease: "easeOut",
  },
};


export const animations = [fadeRight, fadeLeft, fadeOut, slideTop, slideBottom];
