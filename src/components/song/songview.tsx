import {h, Component, ComponentChild} from "preact"
import ChordView from "../chord/chord"
// @ts-ignore
import style from "./songview.scss"
import { Song } from "../../logic/Song";
import { Chunk, Chord, Text, SongLine } from "../../logic/parse";

export class SongView extends Component<
    {song:Song, transpose:number, blur:boolean, onFocus:()=>void}, {}
> {
    constructor() {
        super()
    }

    render() : ComponentChild {
        var fadeStyle = "opacity: 0;"
        if(this.props.blur) {
            fadeStyle = ""
        }

        var actualLines : SongLine[] = [];
        const viewWidth = window.innerWidth;
        const charWidth = 8;
        for(var l = 0; l < this.props.song.lines.length; l++) {
            var line = this.props.song.lines[l];
            var currLine = actualLines.length;

            var chordsWidth = 0;
            var textWidth = 0;
            
            if(line.chords != null)
                line.chords.forEach(c => {
                    var value = c.value;
                    var start = 0;

                    while(true) {
                        var lineIdx = currLine + Math.floor((chordsWidth + c.value.length) / viewWidth);
                        
                        while(lineIdx >= actualLines.length)
                            actualLines.push(new SongLine());

                        if(actualLines[lineIdx].chords == null)
                            actualLines[lineIdx].chords = []

                        if(c instanceof Chord) {
                            actualLines[lineIdx].chords.push(c);
                            break;
                        }
                        
                        var len = Math.min(Math.floor(viewWidth / charWidth), chordsWidth + value.length);
                        if(len < chordsWidth + value.length)
                        {
                            currLine++;
                            chordsWidth = 0;
                        }
                        var chunk = new Text(value.substring(0, len));

                        start += len;
                        value = value.substring(start);
                        
                        actualLines[lineIdx].chords.push(chunk);
                        if(value.length == 0) break;
                    }
                    chordsWidth += c.value.length * charWidth;
                });
            if(line.text != null)
                line.text.forEach(c => {
                    var value = c.value;
                    var start = 0;

                    while(true) {
                        var lineIdx = currLine + Math.floor((textWidth + value.length) / viewWidth);
                        currLine++;

                        while(lineIdx >= actualLines.length)
                            actualLines.push(new SongLine());

                        if(actualLines[lineIdx].text == null)
                            actualLines[lineIdx].text = []

                        var len = Math.min(Math.floor(viewWidth / charWidth), textWidth + value.length);
                        var chunk = new Text(value.substring(0, len));

                        start += len;
                        value = value.substring(start);
                        
                        actualLines[lineIdx].text.push(chunk);
                        if(len == value.length) break;
                    }
                    textWidth += c.value.length;
                });
        }

        console.log(actualLines)

        var els = actualLines.map(l => 
            <div>
                <div>{l.chords && l.chords.map(c => <ChunkView chunk={c} transpose={this.props.transpose} />)}</div>
                <div>{l.text && l.text.map(c => <ChunkView chunk={c} transpose={this.props.transpose} />)}</div>
            </div>
        );

        return (
            <div onTouchStart={this.props.onFocus}>
                <h1>{this.props.song.title}</h1>
                <h2>{this.props.song.artist}</h2>
                <pre class={style.song}>
                    {els}
                    <div class={style.fade}></div>
                </pre>
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