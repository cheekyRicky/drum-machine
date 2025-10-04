import React from "react";
import './styles/DrumPad.scss';

const DrumPad = ({ clip, playSound }) => {
    const { keyTrigger, id, url } = clip;

    const handleClick = () => {
        playSound(keyTrigger, id);
    };

    return (
        <button 
            className = "drum-pad btn btn-outline-dark w-100 h-100"
            id = {id}
            onClick = {handleClick}
            onMouseDown={(e) => e.preventDefault()}
            >
                {keyTrigger}
            <audio 
                className = "clip"
                id = {keyTrigger}
                src = {url} 
                preload="auto"
            />
        </button>
    );
};

export default DrumPad;