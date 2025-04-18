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
import { User } from "@/lib/types";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFetch } from "@/hooks/use-fetch";
import { plainToInstance } from "class-transformer";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string(),
  password: z.string(),
  role: z.string(),
});

export default function CreateUserForm({
  companyId,
  addUserToState,
}: {
  companyId: string;
  addUserToState: (user: User) => void;
}) {
  const customFetch = useFetch();
  const role = useSelector((state: RootState) => state?.auth?.user?.data.role);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });


const createUser = async (
  companyId: string,
  data: { name: string; email: string; password: string }
) => {
    const res = await customFetch(`/user/create`, {
      method: "POST",
      body: { ...data, company: companyId },
    });

    if (res.statusCode < 200 || res.statusCode >= 400)
      throw new Error(
        Array.isArray(res.message) ? res.message[0] : res.message
      );
    return res;
};


  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(createUser(companyId, values), {
      loading: "Creating user...",
      success: (res)=>{
        form.resetField("name");
        form.resetField("email");
        form.resetField("password");
        form.resetField('role');
        addUserToState(plainToInstance(User, res.data) as unknown as User);
        return res.message;
      },
      error:(err)=>err.message || 'Something went wrong.'
    })
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-green-500 text-white  rounded-sm py-2 px-8 font-bold my-2">
        Create User
      </DialogTrigger>
      <DialogContent className={"px-10 bg-green-50"}>
        <DialogHeader>
          <DialogTitle className="text-green-600 text-2xl font-sans">
            {" "}
            Add User
          </DialogTitle>
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

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {role==='SUPERADMIN' && <SelectItem value="ADMIN">Admin</SelectItem>}
                          <SelectItem value="CLIENT">Client</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-green-600 hover:bg-green-700 px-5"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
