import ToDoListComponent from "./components/todo-list-component";

export default async function ToDoHome() {
  // Call the /tasks API route to fetch the tasks
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, { cache: "no-store" });
  const tasks = await res.json();

  return (
    <div className="flex flex-col items-center justify-start  min-h-screen p-4">
      <h1 className="font-bold">To Do List</h1>
      <p>Welcome to your To Do List!</p>
      <ToDoListComponent tasks={tasks}/>
    </div>
  );
}