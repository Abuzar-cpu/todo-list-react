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
            deleted: [],
            activePage: "pending"
        }

        this.inpRef = createRef();
        this.delete = this.delete.bind(this);
        this.complete = this.complete.bind(this);
    }

    complete(note) {
        let newCompleted = [...this.state.completed, note];
        let newPending = this.state.pending.filter((item) => item !== note);

        this.setState({
            completed: newCompleted,
            pending: newPending,
        });
    }

    delete(note) {
        let newCompleted = [...this.state.completed];
        let newPending = [...this.state.pending];
        if(this.state.completed.indexOf(note) !== -1) {
            newCompleted = newCompleted.filter((item) => item !== note);
        }

        if(this.state.pending.indexOf(note) !== -1) {
            newPending = newPending.filter((item) => item !== note);
        }

        this.setState({
           completed: newCompleted,
           pending: newPending,
           deleted: [...this.state.deleted, note]
        });

        // this.completedButtonRef = createRef();
        // this.notCompletedButtonRef = createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Showing:", this.state.activePage)
    }

    showNotCompleted() {
        this.setState({
            activePage: "pending"
        });

        // console.log(this.notCompletedButtonRef.current);
    }

    showCompleted() {
        this.setState({
            activePage: "completed"
        })
    }

    render() {
        const handleEnter = (e) => {
            if(e.key === "Enter") {
                // eslint-disable-next-line no-unused-expressions
                this.inpRef.current.value.trim() !== "" ? this.setState({pending: [...this.state.completed, this.inpRef.current.value.trim()]}) : null;
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
                        {this.state.activePage === "pending" ? this.state.pending.map((item, idx) => <ToDoItem completed={false} complete={this.complete} delete={this.delete} key={`todo-item-${idx}`}>{item}</ToDoItem>) : this.state.completed.map((item, idx) => <ToDoItem completed={true} complete={this.complete} delete={this.delete} key={`todo-item-${idx}`}>{item}</ToDoItem>)}
                    </div>
                </div>

                <div className={"row w-50 ml-auto mr-auto"}>
                    <div className={"col d-flex flex-row-reverse p-0"}>
                        <button  onClick={() => this.showCompleted()}>
                            Completed
                        </button>
                    </div>

                    <div className={"col d-flex p-0"}>
                        <button onClick={() => this.showNotCompleted()}>
                            Not Completed
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}