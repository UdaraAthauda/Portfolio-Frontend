import { Button, DownloadTrigger } from "@chakra-ui/react";
import React, { useState } from "react";
import { RxDownload } from "react-icons/rx";

export default function ResumeDownload({ resumeUrl }) {
  const [loading, setLoading] = useState(false);

  const dataPromise = async () => {
    setLoading(true);

    try {
      const res = await fetch(resumeUrl);
      if (!res.ok) throw new Error("Failed to fetch resume");
      return res.blob();
    } catch (error) {
      console.error("Error fetching resume:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DownloadTrigger
      data={dataPromise}
      fileName="Udara_Athauda_Resume.pdf"
      mimeType="application/pdf"
      asChild
    >
      <Button
        variant={"subtle"}
        colorPalette={"purple"}
        loading={loading}
        loadingText="Downloading..."
      >
        <RxDownload /> Download Resume
      </Button>
    </DownloadTrigger>
  );
}
