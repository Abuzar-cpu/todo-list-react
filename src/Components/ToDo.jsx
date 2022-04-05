import React, {useRef, useState} from "react";
// import ToDoItem from "./ToDoItem";
import {useDispatch, useSelector} from "react-redux";
import ToDoItem from "./ToDoItem";

const ToDo = props => {
    const inpRef = useRef();

    const todo = useSelector(store => store.todo);
    const dispatch = useDispatch();

    const [activePage, setActivePage] = useState("pending");

    const show = state => {
        if (state === "completed") {
            if (todo.completed.length === 0) {
                return <p>No completed tasks</p>
            }
            return todo.completed.map((item, idx) => <ToDoItem key={idx}>{item}</ToDoItem>);
        } else if (state === "pending") {
            if (todo.pending.length === 0) {
                return <p>No pending tasks</p>
            }
            return todo.pending.map((item, idx) => <ToDoItem key={idx}>{item}</ToDoItem>);
        }
    }

    return (
        <div>
            <form className={""} onSubmit={(e) => {
                e.preventDefault();
                dispatch({
                    type: "ADD_TASK",
                    payload: {text: inpRef.current.value, state: "not_completed"}
                });
                inpRef.current.value = "";
            }}>
                <input className={"form-control w-50"} ref={inpRef} type="text" placeholder="Add new todo"/>
            </form>

            <div className="todo-list">
                <div className="todo-list-header">
                    <button className={"btn btn-primary mt-3"} onClick={() => setActivePage("pending")}>Pending</button>
                    <button className={"btn btn-primary ms-3 mt-3"}
                            onClick={() => setActivePage("completed")}>Completed
                    </button>
                </div>
                <div className="todo-list-body mt-3">
                    {activePage === "completed" ? show("completed") : show("pending")}
                </div>
            </div>
        </div>
    );
}

export default ToDo;