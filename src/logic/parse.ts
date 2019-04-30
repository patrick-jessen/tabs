


export class Parser {
    source : string
    iter: number = -1
    token: string = ""
    isEof: boolean = false
    output: SongLine[] = [new SongLine()]

    constructor(src:string) {
        this.source = src
    }

    parseChord() : Chord {
        const startIter = this.iter + 1;
        switch(this.source[this.iter + 1]) {
            case 'A':
            case 'B':
            case 'C':
            case 'D':
            case 'E':
            case 'F':
            case 'G':
                const c2 = this.source[this.iter + 2]
                switch(c2) {
                    case '\r':
                    case '\n':
                    case ' ':
                        this.iter += 1;
                        return new Chord(this.source.substring(startIter, this.iter + 1))
                    case 'm':
                        this.iter += 2;
                        return new Chord(this.source.substring(startIter, this.iter + 1))
                    case 'b':
                    case '#':
                        const c3 = this.source[this.iter + 3]
                        switch(c3) {
                            case '\r':
                            case '\n':
                            case ' ':
                                this.iter += 2;
                                return new Chord(this.source.substring(startIter, this.iter + 1))
                            case 'm':
                                this.iter += 3;
                                return new Chord(this.source.substring(startIter, this.iter + 1))
                        }
                }
        }
        return null;
    }

    parse() : SongLine[] {
        var chunks: Chunk[] = []
        var isChordLine: boolean = false

        while(true) {
            const next = this.peek();

            if(this.isEof)
                return this.output;

            switch(next) {
                case '\r':
                case '\n':
                    if(this.token.length > 0) {
                       chunks.push(new Text(this.token));
                    }

                    if(this.peek() == '\r') this.consume();
                    this.consume();
                    
                    var sl = this.output[this.output.length - 1];
                    if(isChordLine) {
                        if(sl.chords == null)
                            sl.chords = chunks;
                        else {
                            var newsl = new SongLine();
                            newsl.chords = chunks;
                            this.output.push(newsl);
                        }
                    }
                    else {
                        sl.text = chunks;
                        this.output.push(new SongLine());
                    }

                    chunks = [];
                    isChordLine = false;
                    this.token = "";
                    break;
                default:
                    const chord = this.parseChord();
                    if(chord != null) {
                        isChordLine = true;
                        if(this.token.length > 0) {
                            chunks.push(new Text(this.token));
                        }
                        chunks.push(chord);
                        this.token = ""
                    }
                    else
                        this.consume();
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

export class SongLine {
    chords: Chunk[]
    text: Chunk[]
}

export class Chunk { 
    value: string
}

export class Text extends Chunk {
    constructor(value:string) {
        super();
        this.value = value;
    }
}
export class Chord extends Chunk {
    constructor(value:string) {
        super();
        this.value = value;
    }
}

