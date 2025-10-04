import React from "react";
import './styles/Controls.scss';

const Controls = ({ display, volume, setVolume }) => {
    return (
        <div
            id="display"
            className=" border rounded 
                        p-3
                        text-center
                        d-flex
                        justify-content-center
                        align-items-center
                        ">
            <h5 className="m-0">{display || "Play a sound"}</h5>
        </div>
    );
}

export default Controls;