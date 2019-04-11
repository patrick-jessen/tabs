import {h, Component} from "preact"
import Plyr from "plyr"
// @ts-ignore
import style from "./video.scss"
import "/node_modules/plyr/dist/plyr.css"

export default class Video extends Component<
    {videoId:string, visible:boolean, play:boolean, onPlayToggle:(boolean)=>void}, any
> {
    player: any

    constructor() {
        super()
        this.onPlayToggle = this.onPlayToggle.bind(this)
    }

    onPlayToggle() {
        this.props.onPlayToggle(!this.player.playing)
    }

    componentDidMount() {
        this.player = new Plyr(this.base.childNodes[0], {
            controls: ["play", "progress"],
            hideControls: false,
            listeners: {
                play: this.onPlayToggle
            }
        })
    }

    componentWillUnmount() {
        this.player.destroy()
    }

    render() {
        if(this.player != null) {
            if(this.props.play)
                this.player.play()
            else
                this.player.pause()
        }

        var videoStyle = ""
        if(!this.props.visible)
            videoStyle = "display:none;"

        return (
            <div class={style.video} style={videoStyle}>
                <div data-plyr-provider="youtube" data-plyr-embed-id={this.props.videoId}></div>
            </div>
        )
    }
}