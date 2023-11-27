import React from "react";
import { ColorRing } from 'react-loader-spinner'

const Spinner = () => {
    return (
        <ColorRing colors={['#3d5af1', '#3d5af1', '#3d5af1', '#3d5af1', '#3d5af1']} style={{ alignSelf: "center" }} />
    )
};

export default Spinner;
