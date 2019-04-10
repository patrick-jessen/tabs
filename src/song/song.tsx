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

export default class Song extends Component<any, {value:string}> {
    constructor() {
        super()

        this.onInput = this.onInput.bind(this)
        this.state = {
            value: `
[Intro]
Bm

[Verse]
D            A          D
    Oh, it's a mystery to me
            D          G              A
We have a greed with which we have agreed
        G                 A                  Bm
And you think you have to want more than you need
    G               A                 Bm
Until you have it all, you won't be free

[Chorus]
        G                  D
Society, you're a crazy breed
                A              Bm
Hope you're not lonely without me

[Verse]
            D                  A                   D
When you want more than you have, you think you need
                D                   G                     A
And when you think more than you want, your thoughts begin to bleed
    G               A             Bm
I think I need to find a bigger place
                G                  A                    Bm
'Cause when you have more than you think, you need more space

[Chorus]
        G                  D
Society, you're a crazy breed
                A              Bm
Hope you're not lonely without me
        G           D
Society, crazy indeed
                A              Bm
Hope you're not lonely without me   
`
        }
    }

    onInput() {

    }

    render() : ComponentChild {
        var parser = new Parser(this.state.value);
        var chunks = []
        while(!parser.isEof)
            chunks.push(parser.parse())

        var els = chunks.map(c => {
            if(c.isChord)
                return <Chord chord={c.value} transpose={this.props.transpose} />
            else
                return <span>{c.value}</span>
        })

        return (
            <pre class={style.song}>
                {els}
            </pre>
        )
    }

}