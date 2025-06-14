import { createTodo, deleteTodo, fetchTodos, updateTodo } from "@/api/todoApi";
import { QueryKey } from "@/constant/queryKeyContstant";
import type { FilterType } from "@/store/todoStore";
import type { Todo, TodoFormInput } from "@/types/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKey.TODO],
    mutationFn: (data: TodoFormInput) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.TODO] });
    },
  });
};

export const useGetTodos = (filter: FilterType) => {
  return useQuery({
    queryKey: [QueryKey.TODO, filter],
    queryFn: () => fetchTodos(filter),
  });
};

export const useDeleteTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo._id, { isDone: !todo.isDone }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
