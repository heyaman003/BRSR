import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string(),
  password: z.string(),
});

export default function CreateUserForm({ companyId }: { companyId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
      createClient(companyId, values).then((res)=>{
        form.resetField("name")
        form.resetField("email")
        form.resetField("password")
      });
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-green-500 text-white  rounded-sm py-2 px-8 font-bold my-2">Create User</DialogTrigger>
      <DialogContent className={"px-10 bg-green-50"}>
        <DialogHeader>
          <DialogTitle className="text-green-600 text-2xl font-sans"> Add User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-3xl w-full mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type={"email"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                    className={"outline-green-100 outline-1"}
                      placeholder={"Password"}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-green-600 hover:bg-green-700 px-5" type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const createClient = async (
  companyId: string,
  data: { name: string; email: string; password: string }
) => {
  try {
    const raw = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/create/client`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''
      },
      body: JSON.stringify({ ...data, company: companyId }),
      credentials: 'include'
    });

    const res = await raw.json();

    if (raw.status < 200 || raw.status >= 400) throw new Error(Array.isArray(res.message)?res.message[0]: res.message);
    toast.success(res.message)
    return res.data
  } catch (e) {
    if (e instanceof Error) toast.error(e.message);
  }
};
