import { useDeleteTodos, useGetTodos, useUpdateTodo } from "@/query/todoQuery";
import { useTodoStore, type FilterType } from "@/store/todoStore";
import { CheckCheck, Trash2, Undo2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

export default function TodoList() {
  const { filter, setFilter } = useTodoStore();

  const { data: todos = [], isLoading } = useGetTodos(filter);

  const deleteMutation = useDeleteTodos();
  const toggleMutation = useUpdateTodo();

  if (isLoading) return <div>Loading...</div>;

  const handleFilterClick = (newFilter: FilterType) => {
    setFilter(newFilter);
  };
  return (
    <div className="py-4">
      <div className="flex gap-4 container mb-4">
        {(["all", "upcoming", "done"] as FilterType[]).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => handleFilterClick(f)}
            className="hover:cursor-pointer"
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="mb-4 shadow-md rounded-xl border border-gray-200 px-4 py-3 mr-5"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col items-start">
                <h3
                  className={`text-lg font-medium ${
                    todo.isDone ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {todo.name}
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  {todo.shortDescription}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600"
                >
                  {todo.datetime}
                </Badge>
                <div className="flex gap-1 mt-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleMutation.mutate(todo)}
                    title={todo.isDone ? "Revert" : "Done"}
                    className="hover:cursor-pointer"
                  >
                    {todo.isDone ? (
                      <Undo2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <CheckCheck className="w-4 h-4 text-green-600" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(todo._id)}
                    title="Delete"
                    className="hover:cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
