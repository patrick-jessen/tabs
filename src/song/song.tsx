import {h, Component, ComponentChild} from "preact"
import Chord from "../chord/chord"
// @ts-ignore
import style from "./song.scss"

class Chunk {
    isChord: boolean
    value: string
}

class Parser {
    source : string
    iter: number = -1
    token: string
    isEof: boolean = false

    constructor(src:string) {
        this.source = src
    }

    parse() : Chunk {
        this.token = ""

        while(true) {
            const c1 = this.consume()

            switch(c1) {
                case ' ':
                    while(this.peek() == ' ') this.consume()
                    return {isChord: false, value: this.token}
                case '\r':
                case '\n':
                    while(this.peek() == '\r' || this.peek() == '\n')
                        this.consume()
                case "EOF": return {isChord: false, value: this.token}
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                case 'G':
                    const c2 = this.peek()
                    switch(c2) {
                        case '\r':
                        case '\n':
                        case ' ':
                            return {isChord: true, value: this.token}
                        case 'm':
                            this.consume()
                            return {isChord: true, value: this.token}
                        case 'b':
                        case '#':
                            this.consume()
                            const c3 = this.peek()
                            switch(c3) {
                                case '\r':
                                case '\n':
                                case ' ':
                                    return {isChord: true, value: this.token}
                                case 'm':
                                    this.consume()
                                    return {isChord: true, value: this.token}
                            }
                    }
            }
        }
    }

    peek() {
        if(this.iter+1 >= this.source.length) {
            this.isEof = true
            return "EOF"
        }
        return this.source[this.iter + 1]
    }

    consume() {
        var next = this.peek()
        if(next != "EOF")
            this.token += next

        this.iter++
        return next
    }    
}

export default class Song extends Component<
    {song:string, transpose:number, blur:boolean, onFocus:()=>void}, {}
> {
    constructor() {
        super()

        this.onInput = this.onInput.bind(this)
    }

    onInput() {

    }

    render() : ComponentChild {
        var parser = new Parser(this.props.song);
        var chunks = []
        while(!parser.isEof)
            chunks.push(parser.parse())

        var els = chunks.map(c => {
            if(c.isChord)
                return <Chord chord={c.value} transpose={this.props.transpose} />
            else
                return <span>{c.value}</span>
        })

        var fadeStyle = "opacity: 0;"
        var blurStyle = ""
        if(this.props.blur) {
            fadeStyle = ""
            blurStyle = "filter: blur(2px);"
        }

        return (
            <div onTouchStart={this.props.onFocus}>
                <pre class={style.song} style={blurStyle}>
                    {els}
                    <div class={style.fade}></div>
                </pre>
                <div class={style.overlay} style={fadeStyle} ></div>
            </div>
        )
    }

}