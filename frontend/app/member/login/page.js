"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import apiUrl from "@/app/apiUrl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useAuth } from "@/store/zustand";
import {
  ExclamationTriangleIcon,
  LockClosedIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(10, {
    message: "Password must be at least 10 characters.",
  }),
});

export default function SignInPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { jwt, update } = useAuth();

  const [success, setSuccess] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (jwt) {
      redirect("/");
    }
  }, [jwt]);

  const onSubmit = async (values) => {
    setSuccess(undefined);
    setError(undefined);

    axios
      .post(apiUrl + "/auth/local", {
        identifier: values.username,
        password: values.password,
      })
      .then((response) => {
        setSuccess("Successfully logged in.");

        form.reset();

        update(response.data.jwt);

        setTimeout(() => {
          setSuccess(undefined);
        }, 5000);
      })
      .catch((error) => {
        setError(
          error.response.data.error.message.replace("identifier", "username")
        );

        setTimeout(() => {
          setError(undefined);
        }, 5000);
      });
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-lime-100">
      <div className="flex items-center justify-center bg-white">
        <Image
          src="/logo-default.jpg"
          alt="Mountain Backpackers Club"
          width={180}
          height={140}
        />

        <Image
          src="/header27.jpg"
          alt="Mountain Backpackers Club"
          className="w-auto h-full"
          width={820}
          height={140}
        />
      </div>
      <Navbar />

      <div className="flex flex-col items-center justify-between w-full h-full overflow-y-auto">
        <div className="flex flex-col w-full p-3 lg:w-1/4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full h-full p-5 space-y-5"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Member username"
                      />
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
                    <FormLabel className="font-bold text-black">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Member password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                <LockClosedIcon className="w-4 h-4 mr-2" />
                Authenticate
              </Button>

              <div className="flex items-center justify-center space-x-1">
                <p className="text-black">Not a member yet?</p>
                <Link
                  href="/join-the-club"
                  className="font-bold text-orange-600"
                >
                  Join
                </Link>
              </div>
            </form>
          </Form>

          <div className="flex flex-col w-full p-3 space-y-10" id="alert">
            {success && (
              <Alert variant="success" className="bg-lime-50">
                <RocketIcon className="w-4 h-4" />
                <AlertTitle>Authentication Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="bg-lime-50">
                <ExclamationTriangleIcon className="w-4 h-4" />
                <AlertTitle>Authentication Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
