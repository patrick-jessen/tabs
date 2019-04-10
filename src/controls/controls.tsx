import {h, Component, ComponentChild} from "preact"
//@ts-ignore
import style from "./controls.scss"
//@ts-ignore
import img_scroll from "~assets/scroll.svg"
//@ts-ignore
import img_scroll_off from "~assets/scroll-off.svg"
//@ts-ignore
import img_down from "~assets/down.svg"

export default class Controls extends Component<any, any> {
    constructor() {
        super()
        this.onScrollDrag = this.onScrollDrag.bind(this)
        this.onScrollIconStart = this.onScrollIconStart.bind(this)
        this.onScrollIconEnd = this.onScrollIconEnd.bind(this)
        this.onScrollToggle = this.onScrollToggle.bind(this)
        this.onTransposeUp = this.onTransposeUp.bind(this)
        this.onTransposeDown = this.onTransposeDown.bind(this)
        this.state = {
            scrollEnabled: false,
            scrollSpeed: 50,
            scrollBar: false,
            transpose: 0
        }
    }

    onScrollDrag(e) {
        var touch = e.touches[0]
        var p = touch.clientX / (window.innerWidth/2) * 100
        if(p > 100) p = 100
        if(p < 0) p = 0
        this.setState({scrollSpeed: p, scrollEnabled: p != 0})
        this.props.onScrollChange(p)
    }

    onScrollIconStart() {
        this.setState({scrollBar: !this.state.scrollBar})
        this.props.onScollChanging(true)
    }

    onScrollIconEnd() {
        this.setState({scrollBar: false})
        this.props.onScollChanging(false)
    }

    onScrollToggle() {
        this.setState({scrollEnabled: !this.state.scrollEnabled})
        if(this.state.scrollEnabled)
            this.props.onScrollChange(this.state.scrollSpeed)
        else
            this.props.onScrollChange(0)
    }

    onTransposeUp() {
        this.setState({transpose: this.state.transpose + 1})
        this.props.onTransposeChange(this.state.transpose)
    }
    
    onTransposeDown() {
        this.setState({transpose: this.state.transpose - 1})
        this.props.onTransposeChange(this.state.transpose)
    }

    render() : ComponentChild {
        // Icon
        var scrollImg = img_scroll_off
        if(this.state.scrollEnabled)
            scrollImg = img_scroll

        var scrollStyle = ""
        if(!this.state.scrollBar)
            scrollStyle = "opacity: 0.5;"
        if(!this.state.scrollEnabled)
            scrollStyle = "opacity: 0;"

        var transposeCls = style.transpose
        if(this.state.transpose == 0)
            transposeCls += " " + style.disabled

        // Speed bar
        var speed = this.state.scrollSpeed
        if(!this.state.scrollEnabled)
            speed = 0

        scrollStyle += ` width: ${speed}%`

        // Expanded or not
        var scrollCls = style.scroll
        if(this.state.scrollBar)
            scrollCls += " " + style.expanded
        else if(!this.state.scrollEnabled)
            scrollCls += " " + style.disabled

        return (
            <div class={style.controls}>
                <div class={scrollCls} 
                    onTouchStart={this.onScrollIconStart}
                    onTouchEnd={this.onScrollIconEnd}
                    onTouchMove={this.onScrollDrag}
                    onClick={this.onScrollToggle}
                >
                    <img src={scrollImg} />
                    <div class={style.scrollBar} style={scrollStyle}></div>
                </div>

                <div class={transposeCls}>
                    <div class={style.transDown} onClick={this.onTransposeDown}>
                        <img src={img_down} />
                    </div>
                    { this.state.transpose != 0 &&
                        <div class={style.transVal}>
                            {this.state.transpose>0 ? "+":""}
                            {this.state.transpose}
                        </div>
                    }
                    <div class={style.transUp} onClick={this.onTransposeUp}>
                        <img src={img_down} />
                    </div>
                </div>
            </div>
        )
    }
}