import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import DrumPad from './DrumPad';
import Controls from './Controls';
import audioClips from '../data/AudioClips.js';
import './styles/DrumMachine.scss';

const DrumMachine = () => {
    const [display, setDisplay] = useState('');
    const [volume, setVolume] = useState(0.5);
    const [muted, setMuted] = useState(false);

    const handleKeyDown = useCallback((event) => {
        const key = event.key.toUpperCase();
        const clip = audioClips.find(c => c.keyTrigger === key);
        if (clip) {
            playSound(key, clip.id);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
/* Try without useeffect to fix mobile bug.

    useEffect(() => {
        audioClips.forEach((clip) => {
            const element = document.getElementById(clip.keyTrigger);
            if (element) {
                element.volume = muted ? 0 : volume;
            }
        })
    })
*/
    const playSound = (key, clipId) => {
        const audioEl = document.getElementById(key);
        if (!audioEl) return;

        if (muted) {
            audioEl.pause();
            audioEl.currentTime = 0;
            return;
        }

        audioEl.currentTime = 0;
        audioEl.volume = volume;
        audioEl.play();

        setDisplay(clipId);

        const btn = audioEl.parentElement;
        if (btn) {
            btn.classList.add('active');
            setTimeout(() => btn.classList.remove('active'), 150);
        }
    };

    return (
        <Container 
            id="drum-machine" 
            className="bg-light d-flex p-3 rounded shadow">

                <div className="pad-grid">    
                        {audioClips.map(clip => (
                            <DrumPad
                                key={clip.keyTrigger}
                                clip={clip}
                                playSound={playSound}
                            />
                        ))}
                </div>

                <div className="controls">
                    <div className="d-flex controls-header text-center mb-0 flex-column align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                 width="20" 
                                 height="20" 
                                 fill="currentColor" 
                                 class="bi bi-speaker" 
                                 viewBox="0 0 20 20"
                                 >
                                    <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                    <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5M8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                            </svg>
                        <h3 className="h3-heading m-0 p-0 mb-3 pb-2 fw-normal">Drum Pad Controls:</h3>
                <h3 className="m-0 p-0 mb-2 fw-normal">Volume</h3>
                        <input 
                            id="volume"
                            type="range" 
                            className="form-control-range"
                            min="0" max="1" step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                         />
                         <button 
                            onClick={() => setMuted(!muted)}
                            className={`btn btn-secondary btn-sm btn-volume mt-2 d-flex align-items-center justify-content-center gap-1 m-0 p-1
                                ${muted ? 'muted' : 'unmuted'}
                                `}
                            style={{ minWidth: 30 }}
                         >
                                {muted ? (
                                 <svg xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    fill="currentColor" 
                                    class="bi bi-volume-mute"
                                    viewBox="0 0 16 16"
                                    >
                                    <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
                                    </svg>
                                ) : ( 
                                 
                                 <svg xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    fill="currentColor" 
                                    className="bi bi-volume-up" 
                                    viewBox="0 0 16 16"
                                    style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }}
                                >
                                    <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                                    <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
                                     </svg> )
                                }
                         </button>
                        <h3 className="mt-2 mb-1 p-0 fw-normal">Sample:</h3>
                        </div>
                   <Controls display={display} />
                </div>
            </Container>
    );
};

    export default DrumMachine;