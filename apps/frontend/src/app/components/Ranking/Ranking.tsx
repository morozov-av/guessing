import { FC, useRef } from 'react';
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../hooks/useDimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import styles from './ranking.module.scss'

const sidebar = {
  open: (height = 1000) => {
    console.log(height)
    return {
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }
  },
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const Ranking: FC = () => {
  const [ isOpen, toggleOpen ] = useCycle(false, true);
  const containerRef = useRef(null);
  const {height} = useDimensions(containerRef);
  console.log(isOpen, height)
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={styles.background} variants={sidebar}/>
      <Navigation/>
      <MenuToggle toggle={() => toggleOpen()}/>
    </motion.nav>
  );
};

export default Ranking;
