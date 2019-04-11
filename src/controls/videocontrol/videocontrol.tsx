import {h, Component, ComponentChild} from "preact"
// @ts-ignore
import style from "./videocontrol.scss"
// @ts-ignore
import image_yt from "~assets/yt.svg"
// @ts-ignore
import image_yt_off from "~assets/yt-off.svg"

export default class VideoControl extends Component<
    {onToggle:(boolean)=>void, playing:boolean},
    {enabled: boolean}
> {
    constructor() {
        super()

        this.onToggle = this.onToggle.bind(this)

        this.state = {
            enabled: false
        }
    }

    onToggle() {
        this.setState({enabled: !this.state.enabled})
        this.props.onToggle(this.state.enabled)
    }

    render() : ComponentChild {
        var ytImg = image_yt_off
        if(this.props.playing)
            ytImg = image_yt

        return (
            <div class={style.play} onClick={this.onToggle}>
                <img src={ytImg} />
            </div>
        )
    }
}