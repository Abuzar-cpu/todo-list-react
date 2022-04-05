import './CSS/ToDo.css';
import {useDispatch} from "react-redux";


const ToDoItem = props => {

    const dispatch = useDispatch();

    const changeState = task => {

        // Task was completed, we need to undo this task
        if (task.state === 'completed') {
            dispatch({
                type: "UNCOMPLETED_TASK",
                payload: {
                    text: task.text,
                    state: "not_completed"
                }
            });
        } else {
            dispatch({
                type: "COMPLETE_TASK",
                payload: {
                    text: task.text,
                    state: "completed"
                }
            });
        }
    }

    console.log(props.children)
    return (
        <div className={"col-12 d-flex justify-content-center m-0"}>
            <input defaultChecked= {props.children.state === "completed"} onChange={() => changeState(props.children)} className={"ms-3"} type={"checkbox"} />
            <div className={`p-3`}>{props.children.text}</div>
        </div>
    )
}

export default ToDoItem;