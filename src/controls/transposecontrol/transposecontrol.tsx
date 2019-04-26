import {h, Component, ComponentChild} from "preact"
// @ts-ignore
import style from "./transposecontrol.scss"
// @ts-ignore
import img_arrow from "~assets/arrow.svg"
// @ts-ignore
import img_arrow_off from "~assets/arrow-off.svg"

export default class TransposeControl extends Component<
    {onChange:(number)=>void},
    {transpose:number}
> {
    constructor() {
        super()

        this.onDown = this.onDown.bind(this)
        this.onUp = this.onUp.bind(this)

        this.state = {
            transpose: 0
        }
    }

    onUp() {
        this.setState({transpose: this.state.transpose + 1})
        this.props.onChange(this.state.transpose)
    }

    onDown() {
        this.setState({transpose: this.state.transpose - 1})
        this.props.onChange(this.state.transpose)
    }

    render() : ComponentChild {
        var img_up = img_arrow
        var img_dw = img_arrow
        if(this.state.transpose <= 0) img_up = img_arrow_off
        if(this.state.transpose >= 0) img_dw = img_arrow_off
        
        return (
            <div class={style.transpose}>
                <div class={style.transUp} onClick={this.onUp}>
                    <img src={img_up} />
                </div>
                <div class={style.transVal}>
                    {this.state.transpose>0 ? "+":""}
                    {this.state.transpose}
                </div>
                <div class={style.transDown} onClick={this.onDown}>
                    <img src={img_dw} />
                </div>
            </div>
        )
    }
}