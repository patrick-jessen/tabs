import {h, Component, ComponentChild} from "preact"
//@ts-ignore
import style from "./controls.scss"
//@ts-ignore
import img_scroll from "~assets/scroll.svg"
//@ts-ignore
import img_scroll_off from "~assets/scroll-off.svg"
//@ts-ignore
import img_down from "~assets/down.svg"
import ScrollControl from "./scrollcontrol/scrollcontrol";
import TransposeControl from "./transposecontrol/transposecontrol";
import VideoControl from "./videocontrol/videocontrol";

export default class Controls extends Component<
    {
        onScrollChange:(number)=>void, onScrollToggle:(boolean)=>void,
        onTransposeChange:(number)=>void, 
        onVideoToggle:(boolean)=>void, videoPlaying: boolean
    }, any
> {
    constructor() {
        super()
        this.state = {}
    }


    render() : ComponentChild {

        return (
            <div class={style.controls}>
                <ScrollControl
                    onChange={this.props.onScrollChange}
                    onToggle={this.props.onScrollToggle}
                />

                <TransposeControl 
                    onChange={this.props.onTransposeChange}
                />

                <VideoControl 
                    onToggle={this.props.onVideoToggle}
                    playing={this.props.videoPlaying}
                />
            </div>
        )
    }
}