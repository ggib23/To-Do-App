"use client";
import * as React from 'react';

interface TaskComponenetProps {
  label: string;
  complete?: boolean;
  changeCheckbox?: () => void;
  removeTask?: () => void;
}

export default function TaskComponenet({label, complete, changeCheckbox, removeTask}: TaskComponenetProps) {
    // This is a functional component that renders a checkbox with a label.

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={complete}
                    onChange={changeCheckbox}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm font-medium text-gray-900">{label}</label>
            </div>
            <button
                type="button"
                onClick={removeTask}
                className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold focus:outline-none"
                aria-label="Remove task"
                >
                ×
            </button>
        </div>
    );
}