"use client";
import { useState } from "react";

interface InputComponentProps {
    add: (task: string) => void;
}

export default function InputComponent({ add }: InputComponentProps) {
    // This is a functional component that renders an input field for adding new tasks.
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (task.trim() !== "") {
            add(task.trim()); // Call the add function passed as a prop with the new task
            setTask("");
        }
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                placeholder="Add a new task"
                className="w-full p-2 border border-gray-300 rounded"
                value={task}
                onChange={e => setTask(e.target.value)}
            />
            <button onClick={handleAdd} className="ml-2 p-2 bg-blue-500 text-white rounded">Add</button>
        </div>
    );
}