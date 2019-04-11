import {h, Component, ComponentChild} from "preact"
// @ts-ignore
import style from "./videocontrol.scss"
// @ts-ignore
import image_yt from "~assets/yt.svg"
// @ts-ignore
import image_yt_off from "~assets/yt-off.svg"

export default class VideoControl extends Component<
    {onShow:()=>void, playing:boolean},
    {enabled: boolean}
> {
    constructor() {
        super()
    }


    render() : ComponentChild {
        var ytImg = image_yt_off
        if(this.props.playing)
            ytImg = image_yt

        return (
            <div class={style.play} onClick={this.props.onShow}>
                <img src={ytImg} />
            </div>
        )
    }
}