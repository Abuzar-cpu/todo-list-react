import React from "react";
import './CSS/ToDo.css'

export default class todoItem extends React.Component {
    render() {
        return (
            <div id={"to-do-item"} className={"mr-auto ml-auto w-50 p-3 d-flex"}>
                {this.props.completed ? <input defaultChecked={true} onInput={() => this.props.complete(this.props.children)} type={"checkbox"} /> : <input onInput={() => this.props.complete(this.props.children)} type={"checkbox"} />}
                <div className={"ml-3"}>{this.props.children}</div>
                <span onClick={() => this.props.delete(this.props.children)} className={"ml-auto"} ><i className="fa fa-times" /></span>
            </div>
        )
    }
}