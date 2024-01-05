"use client";

import apiKey from "@/app/apiKey";
import apiUrl from "@/app/apiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./footer";

export default function Page({ url }) {
  const [page, setPage] = useState("");

  useEffect(() => {
    const disposeableTimeout = setTimeout(async () => {
      if (url) {
        await getHomePage(url);
      } else {
        await getHomePage("");
      }
    }, 0);

    return () => clearTimeout(disposeableTimeout);
  }, [url]);

  const getHomePage = async (url = "") => {
    const response = await axios.get(
      apiUrl + "/pages?filters[Link][$eq]=/" + url,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (response.status === 200) {
      setPage(response.data.data[0].attributes.content);
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full overflow-y-auto">
      <div
        className="flex flex-col w-full mx-auto prose lg:prose-2xl prose-figure:max-w-[50px] prose-headings:m-0 prose-p:m-0 prose-headings:my-3 prose-p:my-2 prose-a:text-orange-600 marker:text-orange-600 prose-headings:text-orange-600"
        dangerouslySetInnerHTML={{ __html: page }}
      ></div>

      <Footer />
    </div>
  );
}
