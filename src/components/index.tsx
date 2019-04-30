import {h, render, Component, ComponentChild} from "preact";
import { SongView } from "./song/songview";
import { Controls } from "./controls/controls";
import { Video } from "./video/video";
import { SignIn } from "./signin/signin";
import { getSongs } from "../logic/Sync";


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

        var s = getSongs()[0]
        s.parse();
        this.songObj = s

        this.state = {
            scrollSpeed: 0,
            blurSong: false,
            transpose: 0,

            
            play: false,
            video: false,
        }
    }

    onScrollChange(v) {
        this.setState({scrollSpeed: v * 0.0025})
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
                <SongView 
                    onFocus = {this.onVideoLostFocus}
                    song={this.songObj} 
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


                {/* <SignIn /> */}
            </div>
        )
    }
}


export function renderApp() {
    const mountPoint = document.body;
    render(<App />, mountPoint, mountPoint.lastChild as Element)
}