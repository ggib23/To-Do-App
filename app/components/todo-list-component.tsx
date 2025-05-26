"use client";
import { useState } from 'react';
import TaskComponenet from './task-component';
import InputComponent from './input-component';

interface Task {
    id: string;
    name: string;
    complete: boolean;
}

interface ToDoListComponentProps {
    tasks?: Task[];
}

async function insertTask(url: string, data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    });
    return response.json();
}

async function updateTask(url: string, data = {}) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    });
    return response.json();
}

async function deleteTask(url: string, data = {}) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
        

export default function ToDoListComponent({tasks}: ToDoListComponentProps) {
    // This is a functional component that renders a list of tasks with checkboxes.
    const [taskList, setTaskList] = useState<Task[]>([...tasks || []]);

    // This function handles the input of a new task.
    async function inputNewTask(task: string) {
        const newTask = {
            id: Date.now().toString(),
            name: task,
            complete: false,
        };
        setTaskList((prevTasks) => [...prevTasks, newTask]); // Update the tasks state with the new task

        // Call the /tasks API route to fetch the tasks
        const tasks = await insertTask(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, newTask);
        console.log("New task added:", tasks);
    }

    // This function handles the checkbox change event.
    async function onCheckboxChange(id: string) {
        let updatedTask: Task | undefined;
        const updatedTasks: Task[] = taskList.map((task) => {
            if (task.id === id) {
                updatedTask = { ...task, complete: !task.complete };
                return updatedTask;
            } else {
                return task;
            }
        });
        setTaskList(updatedTasks);

        // Call the /tasks API route to update the tasks
        if (updatedTask) {
            const task = await updateTask(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, updatedTask);
            console.log("Task updated:", task);
        }
    }

    // This function handles the removal of a task.
    function handleRemove(id: string) {
        setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
        // Call the /tasks API route to delete the task
        const task = deleteTask(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, { 'id': id });
        console.log("Task removed:", task);
    }

    return (
        <div>
            {taskList.map((task) => (
                <TaskComponenet key={task.id} label={task.name} complete={task.complete} changeCheckbox={() => onCheckboxChange(task.id)} removeTask={() => handleRemove(task.id)} />
            ))}   
            <InputComponent add={inputNewTask}/>
        </div>
    );
}