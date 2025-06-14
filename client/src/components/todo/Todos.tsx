import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./ToDoList";

export function Todos() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>
              Fill the form below.Click Submit when you are done .
            </DialogDescription>
          </DialogHeader>
          <TodoForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
      <TodoList />
    </div>
  );
}
