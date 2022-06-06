import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { nanoid } from "nanoid";
import "./index.css";


function App(){

    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");


    const taskValueChange = (val) => {
         setText(val);
    };


    //use effect
    useEffect(() => {
        let tempTasks = localStorage.getItem('tasks');
        console.log(tempTasks);
        if(!tempTasks){
            setTasks([]);
        }
        else{
            setTasks(JSON.parse(tempTasks));
        }
        
    }, []);

    // useEffect(() => {
    //     let tempTasks = localStorage.getItem('tasks');
    //     console.log(tempTasks);
    //     setTasks(JSON.parse(tempTasks));

    // });
    // useEffect(() => {
    //     let tempTasks = localStorage.getItem('tasks');
    //     console.log(tempTasks);
    //     setTasks(JSON.parse(tempTasks));
    // }, tasks);





    const addTask = () => {
        
        //setTasks([...tasks, { id: nanoid(),name: text, checked: false}]);

        //these 2lines can be done in 1line itself but due to setTasks being async, so do the setTasks in 2steps, ar gets created
        let ar = [...tasks, { id: nanoid(),name: text, checked: false}];
        setTasks(ar);

        setText("");

        //
        //localStorage.setItem('tasks', JSON.stringify());

        //
        localStorage.setItem('tasks', JSON.stringify(ar));
    }

    const addCheck = (id) => {
        tasks.map((task) => {
            if(task.id === id){
                task.checked = !task.checked;
            }
        });
        setTasks([...tasks]);

        //
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const deleteTask = (id) => {
        const arr = tasks.filter((task) => task.id!==id);
        setTasks(arr);

        //
        localStorage.setItem('tasks', JSON.stringify(arr));
    }


    return (
        <>
        <div className="todo-form">
            <div className="new-task-add">
                <input type="text" onChange={(e) => taskValueChange(e.target.value)}/>
                <button className="add" onClick = {() => addTask()}>Add</button>
            </div>
            <div className="filters">
                <button onClick={() => setFilter("All")}>All</button>{" "}
                <button onClick={() => setFilter("Done")}>Show Done</button>{" "}
                <button onClick={() => setFilter("Not Done")}>Show Pending</button>
            </div>
            <br />
            <div className="task-list">
                {
                    tasks.map((value)=>{

                        if(filter==="All"){
                            return (
                                <div className="task" key={value.id}>
                                    <input type="checkbox" onClick={() => addCheck(value.id)}></input>
                                    <span key={value.id}>{value.name}</span>
                                    <button className="delButton" type="button" onClick={() => deleteTask(value.id)}>Delete</button>
                                </div>
                            )
                        }
                        
                        if(filter==="Done" && value.checked===true){
                            return (
                                <div className="task" key={value.id}>
                                    <input type="checkbox" checked></input>
                                    <span key={value.id}>{value.name}</span>
                                    <button className="delButton" type="button" onClick={() => deleteTask(value.id)}>Delete</button>
                                </div>
                            )
                        }

                        if(filter==="Not Done" && value.checked===false){
                            return (
                                <div className="task" key={value.id}>
                                    <input type="checkbox" ></input>
                                    <span>{value.name}</span>
                                    <button className="delButton" type="button" onClick={() => deleteTask(value.id)}>Delete</button>
                                </div>
                            )
                        }
                    })               
                }
            </div>
        </div>
        </>
    );
          
};


ReactDOM.render(<App/>, document.getElementById("root"));
