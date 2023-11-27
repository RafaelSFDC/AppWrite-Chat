import React from "react";
import { motion } from 'framer-motion';


const ButtonMotion = ({ children, type }) => {
    return <motion.button initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        whileTap={{ scale: 0.9 }}
        whileFocus={{ scale: 1.1, }}
        whileHover={{ scale: 1.1 }}
        type={type === "submit" ? "submit" : "button"}
    >{children}</motion.button>;
};

export default ButtonMotion;
