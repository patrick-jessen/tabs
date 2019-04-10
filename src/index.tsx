import {h, render, Component, ComponentChild} from "preact"
import Song from "./song/song";
import Controls from "./controls/controls";

class App extends Component<any, any> {
    scrollCounter:number = 0

    constructor(){
        super();
        
        this.scroll = this.scroll.bind(this)
        this.onScrollChange = this.onScrollChange.bind(this)
        this.onScollChanging = this.onScollChanging.bind(this)
        this.onTransposeChange = this.onTransposeChange.bind(this)
        requestAnimationFrame(this.scroll)

        this.state = {
            scrollSpeed: 0,
            blurSong: false,
            transpose: 0,
        }
    }

    onScrollChange(v) {
        this.setState({scrollSpeed: v * 0.005})
    }

    onScollChanging(b) {
        this.setState({blurSong: b})
    }

    scroll() {
        this.scrollCounter += this.state.scrollSpeed
        document.documentElement.scrollTo(0, document.documentElement.scrollTop + this.scrollCounter)
        if(this.scrollCounter > 1) this.scrollCounter = 0

        requestAnimationFrame(this.scroll)
    }

    onTransposeChange(t) {
        this.setState({transpose: t})
    }

    render() : ComponentChild {
        var songCls = "transition: 0.5s filter 0.05s;"
        if(this.state.blurSong)
            songCls += 'filter: blur(3px) brightness(0.75);'

        return (
            <div id="damn">
                <div style={songCls}>
                    <Song transpose={this.state.transpose} />
                </div>
                <Controls 
                    onScrollChange={this.onScrollChange} 
                    onScollChanging={this.onScollChanging} 
                    onTransposeChange={this.onTransposeChange}
                />
            </div>
        )
    }
}

const mountPoint = document.body;
render(<App />, mountPoint, mountPoint.lastChild as Element)