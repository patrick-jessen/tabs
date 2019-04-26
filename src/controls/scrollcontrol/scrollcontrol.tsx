import {h, Component, ComponentChild} from "preact"
// @ts-ignore
import style from "./scrollcontrol.scss"
//@ts-ignore
import img_scroll from "~assets/scroll.svg"
//@ts-ignore
import img_scroll_off from "~assets/scroll-off.svg"

export default class ScrollControl extends Component<
    {onChange:(number)=>void, onToggle:(boolean)=>void}, 
    {enabled:boolean, expanded:boolean, speed:number}
> {
    constructor() {
        super()
        this.onChange = this.onChange.bind(this)
        this.onExpand = this.onExpand.bind(this)
        this.onCollapse = this.onCollapse.bind(this)
        this.onToggle = this.onToggle.bind(this)

        this.state = {
            enabled: false,
            expanded: false,
            speed: 50
        }
    }

    onChange(e) {
        var touch = e.touches[0]
        var p = (window.innerHeight - touch.clientY - 50) * 1.3 / 150 * 100
        if(p > 100) p = 100
        if(p < 0) p = 0
        this.setState({speed: p, enabled: p != 0})
        this.props.onChange(p)

        e.preventDefault()
    }

    onExpand() {
        this.setState({expanded: true})
        this.props.onToggle(true)
    }

    onCollapse() {
        this.setState({expanded: false})
        this.props.onToggle(false)
    }

    onToggle() {
        this.setState({enabled: !this.state.enabled})
        if(this.state.enabled)
            this.props.onChange(this.state.speed)
        else
            this.props.onChange(0)
    }

    render() : ComponentChild {
        var scrollImg = img_scroll_off
        if(this.state.enabled)
            scrollImg = img_scroll

        var scrollCls = style.scroll
        if(this.state.expanded)
            scrollCls += " " + style.expanded

        var scrollStyle = ""
        if(!this.state.expanded)
            scrollStyle = "opacity: 0.5;"
        if(!this.state.enabled)
            scrollStyle = "display: none;"

        var speed = this.state.speed
        if(!this.state.speed)
            speed = 0

        scrollStyle += ` height: ${speed}%`

        return (
            <div class={scrollCls} 
                onTouchStart={this.onExpand}
                onTouchEnd={this.onCollapse}
                onTouchMove={this.onChange}
                onClick={this.onToggle}
            >
                <img src={scrollImg} />
                <div class={style.scrollBar} style={scrollStyle}></div>
            </div>
        )
    }
}