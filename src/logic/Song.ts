import { Parser, SongLine } from "./parse";

export class Song {
    title: string
    artist: string
    source: string
    lines: SongLine[]

    constructor(title:string, artist:string, source:string) {
        this.title = title;
        this.artist = artist;
        this.source = source;
    }

    parse() { 
        if(this.lines == null)
            this.lines = new Parser(this.source).parse();
    }
}

