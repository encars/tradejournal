"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

export const Auth = () => {
    const router = useRouter();

    const [action, setAction] = useState<"sign-in" | "sign-up">("sign-in");
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            toast({
                title: "Error",
                description: "Please fill out all fields",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        if (action === "sign-in") {
            signIn("credentials", {
                username,
                password,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast({
                            title: "Error",
                            description: "Invalid username or password",
                            variant: "destructive",
                        });
                    }

                    if (callback?.ok && !callback.error) {
                        toast({
                            title: "Success",
                            description: "Successfully logged in",
                            variant: "success",
                        });
                        router.push("/dashboard");
                    }
                })
                .finally(() => setIsLoading(false));
        } else {
            axios.post("/api/auth/register", {
                username,
                password,
            })
                .then(() => signIn("credentials", {
                    username,
                    password,
                    callbackUrl: "/dashboard",
                }))
                .catch(() => toast({
                    title: "Error",
                    description: "An error occurred while registering",
                    variant: "destructive",
                }))
                .finally(() => setIsLoading(false));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border p-10 border-muted-foreground rounded-md shadow-md">
            {action === "sign-in" ? (
                <>
                    <div className="flex flex-col space-y-2 mb-4">
                        <div className="flex flex-col items-center justify-between mb-4">
                            <h1 className="text-primary-foreground text-3xl">
                                Trade Journal
                            </h1>
                            <small className="text-muted-foreground">
                                Please sign in to continue
                            </small>
                        </div>
                        <Label className="sr-only" htmlFor="username">
                            Username
                        </Label>
                        <Input
                            id="username"
                            placeholder="Username"
                            type="text"
                            disabled={isLoading}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-primary-foreground placeholder:text-muted-foreground"
                        />
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            disabled={isLoading}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-primary-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                    <Button variant="secondary" className="w-full mb-4">
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In
                    </Button>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Need an account?
                        </p>
                        <Button type="button" variant="link" onClick={() => setAction("sign-up")} className="text-primary-foreground">
                            Sign Up
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col space-y-2 mb-4">
                        <div className="flex flex-col items-center justify-between mb-4">
                            <h1 className="text-primary-foreground text-3xl">
                                Trade Journal
                            </h1>
                            <small className="text-muted-foreground">
                                Sign up for a new account
                            </small>
                        </div>
                        <Label className="sr-only" htmlFor="username">
                            Username
                        </Label>
                        <Input
                            id="username"
                            placeholder="Username"
                            type="text"
                            disabled={isLoading}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-primary-foreground placeholder:text-muted-foreground"
                        />
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            disabled={isLoading}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-primary-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                    <Button variant="secondary" className="w-full mb-4">
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign Up
                    </Button>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?
                        </p>
                        <Button type="button" variant="link" onClick={() => setAction("sign-in")} className="text-primary-foreground">
                            Sign In
                        </Button>
                    </div>
                </>
            )}
        </form>
    )
}