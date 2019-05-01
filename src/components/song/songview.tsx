import {h, Component, ComponentChild} from "preact"
import ChordView from "../chord/chord"
// @ts-ignore
import style from "./songview.scss"
import { Song } from "../../logic/Song";
import { Chunk, Chord, Text, SongLine } from "../../logic/parse";

function wrapLines(lines: SongLine[], maxwidth: number) {
    var actualLines: SongLine[] = [];
    const charWidth = Math.floor(maxwidth / 8);

    lines.forEach(l => {
        var baseLine = actualLines.length;
        var breakpoints: number[] = [];

        var currWidth = 0;
        var currLine = 0;

        l.text.forEach(c => {
            var width = c.value.length

            // Is there room for this chunk
            if(currWidth + width <= charWidth) {
                breakpoints.push(charWidth);
                
                // Just add it
                while(actualLines.length <= baseLine)
                    actualLines.push(new SongLine());

                actualLines[baseLine + currLine].text.push(c);
                currWidth += c.value.length
            }
            else {
                var w1 = charWidth - currWidth; // The part that there is room for
                // Split at a space
                for(; w1 > 0; w1--) {
                    if(c.value[w1-1] == ' ') break;
                }
                breakpoints.push(currWidth + w1);
                breakpoints.push(charWidth);

                const t1 = new Text(c.value.substring(0, w1));
                const t2 = new Text(c.value.substring(w1, width));

                // Add the part that there is room for
                while(actualLines.length <= baseLine + currLine)
                    actualLines.push(new SongLine());

                actualLines[baseLine + currLine].text.push(t1);
                
                currLine++
                currWidth = w1;

                // Add the part that there wasnt room for
                while(actualLines.length <= baseLine + currLine)
                    actualLines.push(new SongLine());

                actualLines[baseLine + currLine].text.push(t2);
            }
        })

        currWidth = 0;
        currLine = 0;

        l.chords.forEach(c => {
            var width = c.value.length
            var breakpt = breakpoints[currLine];

            // Is there room for this chunk
            if(currWidth + width <= breakpt) {
                // Just add it
                while(actualLines.length <= baseLine)
                    actualLines.push(new SongLine());

                actualLines[baseLine + currLine].chords.push(c);
                currWidth += width
            }
            else if(c instanceof Chord) {
                currLine++;
                currWidth = width;

                while(actualLines.length <= baseLine + currLine)
                    actualLines.push(new SongLine());

                actualLines[baseLine + currLine].chords.push(c);
            }
            else {
                var w1 = breakpt - currWidth; // The part that there is room for

                const t1 = new Text(c.value.substring(0, w1));
                const t2 = new Text(c.value.substring(w1, width));

                // Add the part that there is room for
                while(actualLines.length <= baseLine + currLine)
                    actualLines.push(new SongLine());

                actualLines[baseLine + currLine].chords.push(t1);
                
                currLine++
                currWidth = w1;

                // Add the part that there wasnt room for
                while(actualLines.length <= baseLine + currLine)
                    actualLines.push(new SongLine());

                actualLines[baseLine + currLine].chords.push(t2);
            }
        })
    })

    return actualLines;
}

export class SongView extends Component<
    {song:Song, transpose:number, blur:boolean, onFocus:()=>void, scroll:number}, {}
> {
    constructor() {
        super()
    }

    render() : ComponentChild {
        var fadeStyle = "opacity: 0;"
        if(this.props.blur) {
            fadeStyle = ""
        }

        var actualLines = wrapLines(this.props.song.lines, window.innerWidth)
        var els = actualLines.map(l => 
            <div>
                <div>{l.chords && l.chords.map(c => <ChunkView chunk={c} transpose={this.props.transpose} />)}</div>
                <div>{l.text && l.text.map(c => <ChunkView chunk={c} transpose={this.props.transpose} />)}</div>
            </div>
        );

        return (
            <div onTouchStart={this.props.onFocus}>
                <div style="transform:translateY();">
                    <h1>{this.props.song.title}</h1>
                    <h2>{this.props.song.artist}</h2>
                    <pre class={style.song}>
                        {els}
                    </pre>
                </div>
                <div class={style.fade}></div>
                <div class={style.overlay} style={fadeStyle} ></div>
            </div>
        )
    }

}
 

function ChunkView(props: {chunk: Chunk, transpose:number}) {
    if(props.chunk instanceof Chord) {
        return <ChordView chord={props.chunk.value} transpose={props.transpose} />
    }
    return <span>{props.chunk.value}</span>
}