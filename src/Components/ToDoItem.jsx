import React, {createRef} from "react";
import './CSS/ToDo.css'

export default class todoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"to-do-item"} className={"mr-auto ml-auto w-50 p-3 d-flex"}>
                    <input type={"checkbox"} />
                <div className={"ml-3"}>{this.props.children}</div>
                <span onClick={this.props.delete(this.props.children)} className={"ml-auto"} ><i className="fa fa-times" /></span>
            </div>
        )
    }
}