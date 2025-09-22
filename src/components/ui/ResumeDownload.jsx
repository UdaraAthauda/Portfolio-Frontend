import { Button } from "@chakra-ui/react";
import React from "react";
import { RxDownload } from "react-icons/rx";
import resume from "../../assets/Udara_Athauda_Resume.pdf";

export default function ResumeDownload() {
  return (
    <Button
      as={"a"}
      href={resume}
      download="Udara_Athauda_Resume.pdf"
      variant={"subtle"}
      colorPalette={"purple"}
      loading={loading}
      loadingText="Downloading..."
    >
      <RxDownload /> Download Resume
    </Button>
  );
}
