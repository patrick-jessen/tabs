import { Song } from "./Song";

export function getSongs() : Song[] {

    return [
        new Song("Society", "Eddie Vedder", 
            `[Intro]
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
Hope you're not lonely without me`
        )
    ];
}