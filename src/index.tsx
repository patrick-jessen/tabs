import {h, render, Component, ComponentChild} from "preact"
import Song from "./song/song";
import Controls from "./controls/controls";
import Video from "./video/video";

class App extends Component<any, any> {
    scrollCounter:number = 0
    songObj: any

    constructor(){
        super();
        
        this.scroll = this.scroll.bind(this)
        this.onScrollChange = this.onScrollChange.bind(this)
        this.onScrollToggle = this.onScrollToggle.bind(this)
        this.onTransposeChange = this.onTransposeChange.bind(this)
        this.onVideoShow = this.onVideoShow.bind(this)
        this.onVideoLostFocus = this.onVideoLostFocus.bind(this)
        this.onPlayToggle = this.onPlayToggle.bind(this)
        requestAnimationFrame(this.scroll)

        this.songObj = {
            yt: "cl4cLEToPfc",
            song: `
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

        this.state = {
            scrollSpeed: 0,
            blurSong: false,
            transpose: 0,

            
            play: false,
            video: false,
        }
    }

    onScrollChange(v) {
        this.setState({scrollSpeed: v * 0.005})
    }

    onScrollToggle(b) {
        this.setState({blurSong: b})
    }

    scroll() {
        if(this.state.scrollSpeed == 0)
            this.scrollCounter = 0    

        this.scrollCounter += this.state.scrollSpeed
        document.documentElement.scrollTo(0, document.documentElement.scrollTop + this.scrollCounter)
        if(this.scrollCounter > 1) this.scrollCounter = 0

        requestAnimationFrame(this.scroll)
    }

    onTransposeChange(t) {
        this.setState({transpose: t})
    }

    onVideoShow() {
        this.setState({blurSong: true, video: true})
    }
    onVideoLostFocus() {
        this.setState({video: false, blurSong: false})
    }

    onPlayToggle(b) {
        console.log(" player", b)
        this.setState({play: b})
    }

    render() : ComponentChild {
        return (
            <div>
                <Song 
                    onFocus = {this.onVideoLostFocus}
                    song={this.songObj.song} 
                    transpose={this.state.transpose} 
                    blur={this.state.blurSong} 
                />
                <Controls 
                    onScrollChange={this.onScrollChange} 
                    onScrollToggle={this.onScrollToggle}
                    onTransposeChange={this.onTransposeChange}
                    onVideoShow={this.onVideoShow}
                    videoPlaying={this.state.play}
                />
                <Video 
                    videoId={this.songObj.yt} 
                    visible={this.state.video} 
                    play={this.state.play} 
                    onPlayToggle={this.onPlayToggle}    
                />
            </div>
        )
    }
}

const mountPoint = document.body;
render(<App />, mountPoint, mountPoint.lastChild as Element)