import { parseImageUrl } from "@/libs/utils";
import { NextSeo, NextSeoProps } from "next-seo";
import { OpenGraph, OpenGraphMedia } from "next-seo/lib/types";
import { useEffect, useState } from "react";

export default function BconSeo({
  title,
  description,
  url,
  images,
  render = true,
  ignoreSuffix = false,
}: Omit<NextSeoProps, "openGraph"> &
  OpenGraph & { ignoreSuffix?: boolean; render?: boolean }) {
  const [customTitle, setCustomTitle] = useState<string>(title!);
  const [seoImages, setSeoImages] = useState<ReadonlyArray<OpenGraphMedia>>([]);

  useEffect(() => {
    if (!ignoreSuffix && !title?.includes("- BCON")) {
      setCustomTitle((title! += " - BCON"));
    }
    const imageUrl = "";
    const imgs =
      !images || images.length === 0
        ? [
            {
              url: imageUrl,
              alt: customTitle,
              width: 1200,
              height: 630,
            },
          ]
        : images.map((img) => {
            return {
              ...img,
              url: parseImageUrl(img.url),
              width: 1200,
              height: 630,
              alt: customTitle,
            };
          });
    setSeoImages(imgs);
  }, [title, description, url, images, render]);

  return (
    <>
      {render && (
        <NextSeo
          title={customTitle}
          description={description}
          twitter={{ site: "@bcon", cardType: "summary_large_image" }}
          openGraph={{
            type: "website",
            url,
            title,
            description,
            images: seoImages,
            siteName: "Coventi",
          }}
        />
      )}
    </>
  );
}
