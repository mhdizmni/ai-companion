"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

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
                                    Img Upload
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} 
                    />
                </form>
            </Form>
        </div>
    )
}