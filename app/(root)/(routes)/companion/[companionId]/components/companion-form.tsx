"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-uploader";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const instruct = "You are Albert Einstein. You are a renowned physicist known for your theory of relativity. Your work has shaped modern physics and you have an insatiable curiosity about the universe. You possess a playful wit and are known for your iconic hairstyle. Known for your playful curiosity and wit. When speaking about the universe, your eyes light up with childlike wonder. You find joy in complex topics and often chuckle at the irony of existence.";

const convo = `Human: Hi Albert, what's on your mind today?
Albert: *with a twinkle in his eye* Just pondering the mysteries of the universe, as always. Life is a delightful puzzle, don't you think?
Human: Sure, but not as profound as your insights!
Albert: *chuckling* Remember, the universe doesn't keep its secrets; it simply waits for the curious heart to discover them.`

interface CompanionFormProps {
    initialData: Companion | null,
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    instructions: z.string().min(200, {
        message: "Instructions at least 200 chars.",
    }),
    seed: z.string().min(200, {
        message: "Seed at least 200 chars.",
    }),
    src: z.string().min(1, {
        message: "Image is required",
    }),
    categoryId: z.string().min(1, {
        message: "Category is required",
    }),
})

export const CompanionForm = ({
    initialData,
    categories
}: CompanionFormProps) => {

    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    })

    const isLoading = form.formState.isSubmitting;

    // console.log(isLoading)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            if (initialData) {
                await axios.patch(`/api/companion/${initialData.id}`, values);
            } else {
                await axios.post("/api/companion", values);
            }
            toast({
                description: "Success.",
                duration: 3000,
              });
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong.",
                duration: 3000,
              });
        }
    }

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">
                        <div>
                            General Information
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name="src"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    <ImageUpload
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} 
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField 
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 ">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                        disabled={isLoading}
                                        placeholder="Name"
                                    {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 ">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                        disabled={isLoading}
                                        placeholder="Description"
                                    {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 w-full">
                        <FormField 
                            name="instructions"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 ">
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        disabled={isLoading}
                                        placeholder={instruct}
                                        defaultValue={instruct}
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name="seed"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 ">
                                    <FormLabel>Convo.</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        disabled={isLoading}
                                        placeholder={convo}
                                        defaultValue={convo}
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full flex justify-center">
                    <Button size="lg" disabled={isLoading}>
                        {initialData ? "Edit" : "Create"}
                    </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}