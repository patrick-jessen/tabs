import {h, Component, ComponentChild} from "preact"
// @ts-ignore
import style from "./transposecontrol.scss"
// @ts-ignore
import img_down from "~assets/down.svg"

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
        var transposeCls = style.transpose
        if(this.state.transpose == 0)
            transposeCls += " " + style.disabled
            
        return (
            <div class={transposeCls}>
                <div class={style.transDown} onClick={this.onDown}>
                    <img src={img_down} />
                </div>
                { this.state.transpose != 0 &&
                    <div class={style.transVal}>
                        {this.state.transpose>0 ? "+":""}
                        {this.state.transpose}
                    </div>
                }
                <div class={style.transUp} onClick={this.onUp}>
                    <img src={img_down} />
                </div>
            </div>
        )
    }
}