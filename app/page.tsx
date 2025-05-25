import ToDoListComponent from "./components/todo-list-component";

export default function ToDoHome() {
  return (
    <div className="flex flex-col items-center justify-start  min-h-screen p-4">
      <h1 className="font-bold">To Do List</h1>
      <p>Welcome to your To Do List!</p>
      <ToDoListComponent />
    </div>
  );
}