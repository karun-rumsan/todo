import { cn } from "@/lib/utils";
import { useCreateTodo } from "@/query/todoQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
export type TodoFormProps = {
  onSuccess: () => void;
};
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  shortDescription: z.string().min(2, {
    message: "Description is required ",
  }),
  dateTime: z.object({
    date: z.date(),
    time: z.string().min(1, { message: "Time is required" }),
  }),
});
export default function TodoForm({ onSuccess }: TodoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      dateTime: {
        date: undefined,
        time: "",
      },
    },
  });

  const create = useCreateTodo();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const format = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(data.dateTime.date);

    const payload = {
      ...data,
      datetime: format + " " + data.dateTime.time,
    };
    await create.mutateAsync(payload);
    onSuccess();
    form.reset();
    console.log("✅ Todo created successfully");
  };

  useEffect(() => {
    if (create.isSuccess) form.reset();
  }, [create.isSuccess, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* <div className=""> */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateTime.date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) => date < new Date("1900-01-01")}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateTime.time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a description"
                  type="time"
                  {...field}
                  className="hover:cursor-pointer w-[120px]"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-between">
          <Button type="submit" className="flex-1">
            Submit
          </Button>
          <Button
            variant="outline"
            onClick={onSuccess}
            type="button"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
