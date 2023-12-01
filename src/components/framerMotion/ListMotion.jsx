import React from "react";
import { motion } from 'framer-motion';

const ListMotion = ({ children, onClick, className }) => {
    return <motion.li
        whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.9 }}
        exit={{ x: -150, opacity: 0 }}
        className={className}
        onClick={onClick}
    >{children}</motion.li>;
};

export default ListMotion;
