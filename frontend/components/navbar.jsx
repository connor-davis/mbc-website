"use client";

import apiKey from "@/app/apiKey";
import apiUrl from "@/app/apiUrl";
import axios from "axios";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useAuth } from "@/store/zustand";

export default function Navbar() {
  const [navigationItems, setNavigationItems] = useState([]);
  const { jwt, clear } = useAuth();

  useEffect(() => {
    const disposeableTimeout = setTimeout(async () => {
      const response = await axios.get(
        apiUrl + "/navigation-items?populate=*",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (response.status === 200) {
        setNavigationItems(response.data.data);
      }
    }, 0);

    return () => clearTimeout(disposeableTimeout);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center h-16 p-0 bg-neutral-900">
        <div className="flex items-center">
          {navigationItems.map((navigationItem, index) =>
            navigationItem.attributes.navigation_subitems.data.length === 0 ? (
              <Link
                key={index}
                href={navigationItem.attributes.Link}
                className="px-3 py-4 text-white hover:text-neutral-100 hover:bg-neutral-800"
              >
                {navigationItem.attributes.Displayname}
              </Link>
            ) : (
              <Popover key={index}>
                <PopoverTrigger>
                  <div className="px-3 py-4 text-white hover:text-neutral-100 hover:bg-neutral-800">
                    {navigationItem.attributes.Displayname}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="text-white bg-neutral-900">
                  <div className="flex flex-col">
                    {navigationItem.attributes.navigation_subitems.data.map(
                      (navigationSubitem, index) => (
                        <Link
                          key={index}
                          href={navigationSubitem.attributes.Link}
                          className="px-3 py-2 text-white hover:text-neutral-100 hover:bg-neutral-800"
                        >
                          {navigationSubitem.attributes.Displayname}
                        </Link>
                      )
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )
          )}
          <Popover>
            <PopoverTrigger>
              <div className="px-3 py-4 text-white hover:text-neutral-100 hover:bg-neutral-800">
                Member
              </div>
            </PopoverTrigger>
            <PopoverContent className="text-white bg-neutral-900">
              {jwt && (
                <div className="flex flex-col">
                  <Link
                    href="/member/profile"
                    className="px-3 py-2 text-white hover:text-neutral-100 hover:bg-neutral-800"
                  >
                    Profile
                  </Link>
                  <div
                    onClick={() => clear()}
                    className="px-3 py-2 text-white hover:text-neutral-100 hover:bg-neutral-800"
                  >
                    Logout
                  </div>
                </div>
              )}

              {!jwt && (
                <div className="flex flex-col">
                  <Link
                    href="/member/login"
                    className="px-3 py-2 text-white hover:text-neutral-100 hover:bg-neutral-800"
                  >
                    Authenticate
                  </Link>
                  <Link
                    href="/join-the-club"
                    className="px-3 py-2 text-white hover:text-neutral-100 hover:bg-neutral-800"
                  >
                    Join
                  </Link>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Suspense>
  );
}
