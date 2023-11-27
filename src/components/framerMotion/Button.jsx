import { motion } from 'framer-motion';


// eslint-disable-next-line react/prop-types
const ButtonMotion = ({ children, type, onClick }) => {
    return <motion.button initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        whileTap={{ scale: 0.9 }}
        whileFocus={{ scale: 1.1, }}
        whileHover={{ scale: 1.1 }}
        type={type === "submit" ? "submit" : "button"}
        onClick={onClick}
    >{children}</motion.button>;
};

export default ButtonMotion;
