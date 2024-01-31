import React from "react";
import Image from "next/image";

export const Logo: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  return (
    <Image
      src="/assets/logo-SynPass-06.svg"
      layout="fixed"
      width={width}
      height={height}
      alt="SynPass"
    />
  );
};
