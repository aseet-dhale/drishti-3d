import { Howl, Howler } from 'howler';
import React, { useEffect } from 'react';

const sound = new Howl({
    src:'bg/bg.mp3',
    format: 'mp3',
});

export default function BGSound(props) {
    useEffect(() => {
        if(props.soundState){
            sound.play();
        } else {
            sound.pause();
        }
        Howler.volume(.25);
    },[props.soundState]);

    return <></>;
}