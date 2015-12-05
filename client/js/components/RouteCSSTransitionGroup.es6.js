/**
 * <RouteCSSTransitionGroup> renders twice on a route change. On the first
 * render, it "freezes" the transitioning-out component by setting
 * `shouldUpdate` on the <StaticContainer> to `false`. This prevents any
 * <Link>s nested under the old component from updating their active state to
 * reflect the new location, to allow for a smooth transition out. It then
 * renders the new, transitioning-in component immediately afterward.
 */
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import StaticContainer from 'react-static-container'

export default class RouteCSSTransitionGroup extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            previousPathname: null
        }
    }

    render() {
        const { children, ...props } = this.props

        return (
            <ReactCSSTransitionGroup {...props}>
                {children}
            </ReactCSSTransitionGroup>
        )
    }

    componentDidUpdate() {
        if (this.state.previousPathname) {
            this.setState({ previousPathname: null })
        }
    }
}