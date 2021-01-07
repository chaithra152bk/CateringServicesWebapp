import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
    constructor(props){
        super(props);
        window.onload = function() {
            setTimeout (function () {
                scrollTo(0,0);
            }, 100);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
        }
    }
export default withRouter(ScrollToTop);