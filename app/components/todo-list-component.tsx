"use client";
import { useState } from 'react';
import TaskComponenet from './task-component';
import InputComponent from './input-component';

interface Task {
    id: string;
    name: string;
    complete: boolean;
}

export default function ToDoListComponent() {
    // This is a functional component that renders a list of tasks with checkboxes.
    const [tasks, setTasks] = useState<Task[]>([]);

    function inputNewTask(task: string) {
        // This function handles the input of a new task.
        const newTask = {
            id: Date.now().toString(),
            name: task,
            complete: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]); // Update the tasks state with the new task
    }

    function onCheckboxChange(id: string) {
        // This function handles the checkbox change event.
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, complete: !task.complete } : task
            )
        );
    }

    function handleRemove(id: string) {
        // This function handles the removal of a task.
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }

    return (
        <div>
            {tasks.map((task) => (
                <TaskComponenet key={task.id} label={task.name} complete={task.complete} changeCheckbox={() => onCheckboxChange(task.id)} removeTask={() => handleRemove(task.id)} />
            ))}   
            <InputComponent add={inputNewTask}/>
        </div>
    );
}