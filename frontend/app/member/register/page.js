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
import { Checkbox } from "@/components/ui/checkbox";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/store/zustand";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const formSchema = z
  .object({
    memberTitle: z.string().min(2, {
      message: "Member title must be at least 2 characters.",
    }),
    firstName: z.string().min(5, {
      message: "First name must be at least 5 characters.",
    }),
    lastName: z.string().min(5, {
      message: "Last name must be at least 5 characters.",
    }),
    email: z.string().email({
      message: "Email must be a valid email address.",
    }),
    username: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
    password: z.string().min(10, {
      message: "Password must be at least 10 characters.",
    }),
    confirmPassword: z.string().min(10, {
      message: "Confirm password must be at least 10 characters.",
    }),
    addressLineOne: z.string().min(5, {
      message: "Address line one must be at least 5 characters.",
    }),
    addressLineTwo: z.string().optional(),
    addressLineThree: z.string().optional(),
    postalCode: z.string().min(4, {
      message: "Postal code must be at least 4 characters.",
    }),
    residentialArea: z.string().optional(),
    preferredContactNumber: z.string().min(10, {
      message: "Preferred contact number must be at least 10 characters.",
    }),
    membershipType: z.string(),
    idPassportNumber: z
      .string()
      .max(13, {
        message: "ID/Passport number must be no more than 13 characters.",
      })
      .min(13, {
        message: "ID/Passport number must be at least 13 characters.",
      }),
    nextOfKin: z.string().min(5, {
      message: "Next of kin must be at least 5 characters.",
    }),
    nextOfKinContactNumber: z.string().min(10, {
      message: "Next of kin contact number must be at least 10 characters.",
    }),
    nextOfKinAddress: z.string().min(5, {
      message: "Next of kin address must be at least 5 characters.",
    }),
    medicalIssuesAllergies: z.string().optional(),
    medicalAid: z.string().optional(),
    medicalAidNumber: z.string().optional(),
    agreeToCodeOfConduct: z.boolean(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match.",
      });
    }
  });

export default function SignInPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberTitle: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      addressLineOne: "",
      addressLineTwo: "",
      addressLineThree: "",
      postalCode: "",
      residentialArea: "",
      preferredContactNumber: "",
      membershipType: "",
      idPassportNumber: "",
      nextOfKin: "",
      nextOfKinContactNumber: "",
      nextOfKinAddress: "",
      medicalIssuesAllergies: "",
      medicalAid: "",
      medicalAidNumber: "",
      agreeToCodeOfConduct: false,
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

    if (values.agreeToCodeOfConduct === false) {
      setError("You must agree to the code of conduct.");

      setTimeout(() => {
        setError(undefined);
      }, 5000);

      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("The passwords do not match.");

      setTimeout(() => {
        setError(undefined);
      }, 5000);

      return;
    }

    axios
      .post(apiUrl + "/auth/local/register", {
        memberTitle: values.memberTitle,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
        addressLineOne: values.addressLineOne,
        addressLineTwo: values.addressLineTwo,
        addressLineThree: values.addressLineThree,
        postalCode: values.postalCode,
        residentialArea: values.residentialArea,
        preferredContactNumber: values.preferredContactNumber,
        membershipType: values.membershipType,
        idPassportNumber: values.idPassportNumber,
        nextOfKin: values.nextOfKin,
        nextOfKinContact: values.nextOfKinContactNumber,
        nextOfKinAddress: values.nextOfKinAddress,
        medicalIssues: values.medicalIssuesAllergies,
        medicalAid: values.medicalAid,
        medicalAidNumber: values.medicalAidNumber,
        agreeToCodeOfConduct: values.agreeToCodeOfConduct,
      })
      .then((_) => {
        setSuccess("Successfully registered new membership.");

        form.reset();

        redirect("/member/confirm-email");

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full p-5 space-y-10 lg:w-1/4"
          >
            <div className="flex flex-col space-y-5">
              <div className="font-bold text-black">Member Details</div>

              <FormField
                control={form.control}
                name="memberTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Member Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Member title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="First name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Last name"
                      />
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
                    <FormLabel className="font-bold text-black">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Member email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Confirm member password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-5">
              <div className="font-bold text-black">Member Contact</div>

              <FormField
                control={form.control}
                name="addressLineOne"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Address Line One
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Address line one"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLineTwo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Address Line Two
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Address line two"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLineThree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Address Line Three
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Address line three"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Postal Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Postal code"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="residentialArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Residential Area
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Residential area"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredContactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Preferred Contact Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Preferred contact number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-5">
              <div className="font-bold text-black">Membership Info</div>

              <FormField
                control={form.control}
                name="membershipType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Membership Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50">
                        <SelectTrigger>
                          <SelectValue
                            className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                            placeholder="Select a membership type"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full h-auto border border-orange-600 outline-none bg-lime-50">
                        <SelectItem value="single" className="bg-lime-50">
                          Single
                        </SelectItem>
                        <SelectItem value="family" className="bg-lime-50">
                          Family
                        </SelectItem>
                        <SelectItem
                          value="principleFamily"
                          className="bg-lime-50 hover:bg-lime-50"
                        >
                          Principle Family
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idPassportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      ID/Passport Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="ID/Passport number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-5">
              <div className="font-bold text-black">Safety Info</div>

              <FormField
                control={form.control}
                name="nextOfKin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Next of Kin
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Next of kin"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nextOfKinContactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Next of Kin Contact Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Next of kin contact number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nextOfKinAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Next of Kin Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Next of kin address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicalIssuesAllergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Medical Issues/Allergies
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Medical issues/allergies"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicalAid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Medical Aid
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Medical aid"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicalAidNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-black">
                      Medical Aid Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                        placeholder="Medical aid number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="agreeToCodeOfConduct"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      I agree to the{" "}
                      <Link
                        href="/code-of-conduct"
                        className="font-bold text-orange-600"
                      >
                        Code of Conduct
                      </Link>
                    </FormLabel>
                  </FormItem>
                );
              }}
            />

            <Button type="submit">
              <CheckIcon className="w-4 h-4 mr-2" />
              Join
            </Button>

            <div className="flex items-center justify-center space-x-1">
              <p className="text-black">Already a member?</p>
              <Link href="/member/login" className="font-bold text-orange-600">
                Authenticate
              </Link>
            </div>
          </form>
        </Form>

        <div
          className="flex flex-col w-full p-3 space-y-10 lg:w-1/4"
          id="alert"
        >
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

        <Footer />
      </div>
    </div>
  );
}
