//@ts-check
import React, {createRef} from "react";
import ToDoItem from "./ToDoItem";
import './CSS/ToDo.css'
import Header from "./Header";

export default class ToDo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            completed: [],
            pending: [],
            deleted: []
        }

        this.inpRef = createRef();
        this.delete = this.delete.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component updated:", this.state);
    }

    delete(note) {
        console.log(note);
        // let newCompleted = [...this.state.completed];
        // let newPending = [...this.state.pending];
        // this.state.completed.indexOf(note) !== -1 ? newPending.push(note) : newCompleted.push(note);
        //
        // this.setState({
        //    completed: newCompleted,
        //    pending: newPending,
        //    deleted: [...this.state.deleted, note]
        // });
    }

    render() {
        const handleEnter = (e) => {
            if(e.key === "Enter") {
                // eslint-disable-next-line no-unused-expressions
                this.inpRef.current.value.trim() !== "" ? this.setState({completed: [...this.state.completed, this.inpRef.current.value.trim()]}) : null;
                this.inpRef.current.value = "";
            }
        }

        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col d-flex justify-content-center"}>
                        <Header />
                    </div>
                </div>

                <div className={"row mt-3"}>
                    <div className={"col d-flex justify-content-center"}>
                        <input ref={this.inpRef} id={"input"} className={"w-50 h-100 p-3"} placeholder={"Enter your note here..."} onKeyPress={(event) => handleEnter(event)} />
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col"}>
                        {this.state.completed.map((item, idx) => <ToDoItem delete={this.delete} key={`todo-item-${idx}`}>{item}</ToDoItem>)}
                    </div>
                </div>
            </div>
        )
    }
}