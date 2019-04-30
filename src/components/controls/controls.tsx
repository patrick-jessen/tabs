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

export class Controls extends Component<
    {
        onScrollChange:(number)=>void, onScrollToggle:(boolean)=>void,
        onTransposeChange:(number)=>void, 
        onVideoShow:()=>void, videoPlaying: boolean
    }, any
> {
    constructor() {
        super()
        this.state = {}
    }


    render() : ComponentChild {

        return (
            <div class={style.controls}>
                
                <VideoControl 
                    onShow={this.props.onVideoShow}
                    playing={this.props.videoPlaying}
                />

                <TransposeControl 
                    onChange={this.props.onTransposeChange}
                />

                <ScrollControl
                    onChange={this.props.onScrollChange}
                    onToggle={this.props.onScrollToggle}
                />
            </div>
        )
    }
}