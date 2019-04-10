import {h, ComponentChild} from "preact"
// @ts-ignore
import style  from "./chord.scss"

var keys = { 'A':0, 'B':2, 'C':3, 'D':5, 'E':7, 'F':8, 'G':10 }
var keyList = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

export default function Chord(props:{transpose: number, chord:string}) {
    var chord = props.chord
    if(props.transpose != 0) {
        var k = keys[props.chord[0]]
        var mod = ""
        if(props.chord.length > 1)
            mod = props.chord[1]
        if(mod == '#') k++
        else if(mod == 'b') k--

        k += props.transpose
        if(k > 11) k = k%12
        if(k < 0) k = 11+(k%12)

        console.log(k)

        if(mod == '#' || mod == 'b')
            chord = keyList[k] + chord.substr(2)
        else
            chord = keyList[k] + chord.substr(1)
    }

    return <span class={style.chord}>{chord}</span>;
}