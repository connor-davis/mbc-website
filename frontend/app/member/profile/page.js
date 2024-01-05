"use client";

import apiUrl from "@/app/apiUrl";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/store/zustand";
import { CheckIcon, Pencil2Icon } from "@radix-ui/react-icons";
import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { jwt } = useAuth();

  const [editingProfile, setEditingProfile] = useState(false);

  const [memberState, setMemberState] = useState({
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
    nextOfKinContact: "",
    nextOfKinAddress: "",
    medicalIssues: "",
    medicalAid: "",
    medicalAidNumber: "",
    interestedInBackpacking: false,
    interestedInDayHikes: false,
  });

  useEffect(() => {
    if (!jwt) {
      redirect("/member/login");
    }

    return () => {};
  }, [jwt]);

  useEffect(() => {
    const disposeableTimeout = setTimeout(async () => {
      await getProfile();
    }, 100);

    return () => clearTimeout(disposeableTimeout);
  }, []);

  const getProfile = async () => {
    const response = await axios.get(apiUrl + "/users/me?populate=role", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.status === 200) {
      setMemberState(response.data);
    }
  };

  const saveProfile = async () => {
    axios
      .put(
        apiUrl + "/users/" + memberState.id,
        { ...memberState, role: undefined, id: undefined },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        (async () => {
          setEditingProfile(false);

          await getProfile();

          toast("Profile updated.", {
            type: "success",
          });
        })();
      })
      .catch((error) => {
        toast("Profile update failed.", {
          type: "error",
          description: error.response.data.error.message,
        });
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
        <div className="flex flex-col w-full h-full mt-10 lg:w-1/3">
          <Tabs defaultValue="member-details" className="w-full bg-lime-50">
            <TabsList className="w-full h-auto p-0 bg-lime-50">
              <TabsTrigger
                value="member-details"
                className="w-full data-[state=active]:bg-orange-600 data-[state=active]:text-black shadow-none rounded-none p-3"
              >
                Member Details
              </TabsTrigger>
              <TabsTrigger
                value="contact-details"
                className="w-full data-[state=active]:bg-orange-600 data-[state=active]:text-black shadow-none rounded-none p-3"
              >
                Contact Details
              </TabsTrigger>
              <TabsTrigger
                value="membership-details"
                className="w-full data-[state=active]:bg-orange-600 data-[state=active]:text-black shadow-none rounded-none p-3"
              >
                Membership Details
              </TabsTrigger>
              <TabsTrigger
                value="safety-details"
                className="w-full data-[state=active]:bg-orange-600 data-[state=active]:text-black shadow-none rounded-none p-3"
              >
                Safety Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="member-details" className="p-3">
              <div className="grid w-full h-full grid-cols-2 gap-5">
                <div className="px-3 py-2 text-sm font-bold text-black">
                  Title
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member title"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.memberTitle}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        memberTitle: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.memberTitle || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  First Name
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member first name"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.firstName}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        firstName: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.firstName || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Last Name
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member last name"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.lastName}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        lastName: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.lastName || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Username
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member username"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.username}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        username: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.username || "N/A"}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="contact-details" className="p-3">
              <div className="grid w-full h-full grid-cols-2 gap-5">
                <div className="px-3 py-2 text-sm font-bold text-black">
                  {!editingProfile ? "Address" : "Address Line One"}
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member address line one"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.addressLineOne}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        addressLineOne: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.addressLineOne || "N/A"}
                    {memberState.addressLineTwo &&
                      ", " + memberState.addressLineTwo}
                    {memberState.addressLineThree &&
                      ", " + memberState.addressLineThree}
                  </div>
                )}

                {editingProfile && (
                  <div className="px-3 py-2 text-sm font-bold text-black">
                    Address Line Two
                  </div>
                )}
                {editingProfile && (
                  <Input
                    type="text"
                    placeholder="Member address line two"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.addressLineTwo}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        addressLineTwo: event.target.value,
                      })
                    }
                  />
                )}

                {editingProfile && (
                  <div className="px-3 py-2 text-sm font-bold text-black">
                    Address Line Three
                  </div>
                )}
                {editingProfile && (
                  <Input
                    type="text"
                    placeholder="Member address line three"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.addressLineThree}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        addressLineThree: event.target.value,
                      })
                    }
                  />
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Residential Area
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member residential area"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.residentialArea}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        residentialArea: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.residentialArea || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Area Code
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member postal code"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.postalCode}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        postalCode: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.postalCode || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Contact Number
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member preffered contact number"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.preferredContactNumber}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        preferredContactNumber: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.preferredContactNumber || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Email
                </div>
                {editingProfile ? (
                  <Input
                    type="email"
                    placeholder="Member email"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.email}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        email: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.email || "N/A"}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="membership-details" className="p-3">
              <div className="grid w-full h-full grid-cols-2 gap-5">
                <div className="px-3 py-2 text-sm font-bold text-black">
                  Interested In Day Hikes?
                </div>
                {editingProfile ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="border border-orange-600 outline-none bg-lime-50 data-[state=checked]:bg-orange-600 data-[state=checked]:text-white"
                      checked={memberState.interestedInDayHikes}
                      onCheckedChange={(checked) =>
                        setMemberState({
                          ...memberState,
                          interestedInDayHikes: checked,
                        })
                      }
                    />

                    <div className="text-sm">
                      Are you interested in day hikes?
                    </div>
                  </div>
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.interestedInDayHikes ? "Yes" : "No"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Interested In Backpacking?
                </div>
                {editingProfile ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="border border-orange-600 outline-none bg-lime-50 data-[state=checked]:bg-orange-600 data-[state=checked]:text-white"
                      checked={memberState.interestedInBackpacking}
                      onCheckedChange={(checked) =>
                        setMemberState({
                          ...memberState,
                          interestedInBackpacking: checked,
                        })
                      }
                    />

                    <div className="text-sm">
                      Are you interested in backpacking?
                    </div>
                  </div>
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.interestedInBackpacking ? "Yes" : "No"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  ID/Passport Number
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member ID/Passport number"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.idPassportNumber}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        idPassportNumber: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.idPassportNumber || "N/A"}
                  </div>
                )}

                {!editingProfile && (
                  <div className="px-3 py-2 text-sm font-bold text-black">
                    Leader
                  </div>
                )}
                {!editingProfile && (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {(memberState.role &&
                      memberState.role.type === "leader" &&
                      "Yes") ||
                      "No"}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="safety-details" className="p-3">
              <div className="grid w-full h-full grid-cols-2 gap-5">
                <div className="px-3 py-2 text-sm font-bold text-black">
                  Next Of Kin
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member next of kin"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.nextOfKin}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        nextOfKin: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.nextOfKin || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Next Of Kin Contact Number
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member next of kin contact number"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.nextOfKinContact}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        nextOfKinContact: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.nextOfKinContact || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Next Of Kin Address
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member next of kin address"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.nextOfKinAddress}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        nextOfKinAddress: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.nextOfKinAddress || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Medical Issues/Allergies
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member medical issues/allergies"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.medicalIssues}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        medicalIssues: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.medicalIssues || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Medical Aid
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member medical aid"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.medicalAid}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        medicalAid: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.medicalAid || "N/A"}
                  </div>
                )}

                <div className="px-3 py-2 text-sm font-bold text-black">
                  Medical Aid Number
                </div>
                {editingProfile ? (
                  <Input
                    type="text"
                    placeholder="Member medical aid number"
                    className="w-full h-auto px-3 py-2 border border-orange-600 outline-none bg-lime-50"
                    value={memberState.medicalAidNumber}
                    onChange={(event) =>
                      setMemberState({
                        ...memberState,
                        medicalAidNumber: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="w-full px-3 py-2 text-sm truncate">
                    {memberState.medicalAidNumber || "N/A"}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          {!editingProfile && (
            <Button
              className="flex items-center justify-center w-full h-auto px-3 py-2 mt-5 text-white bg-orange-600 rounded-none shadow-none"
              onClick={() => setEditingProfile(true)}
            >
              <Pencil2Icon className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
          {editingProfile && (
            <Button
              className="flex items-center justify-center w-full h-auto px-3 py-2 mt-5 text-white bg-orange-600 rounded-none shadow-none"
              onClick={() => saveProfile()}
            >
              <CheckIcon className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
