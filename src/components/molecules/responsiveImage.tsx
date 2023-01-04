// LIBRARIES
import React from "react";
import Image from "next/image";

// COMPONENTS
import addClassName from "components/helpers/addClassName";

// PROPS
type ObjectFitEnum = "contain" | "cover" | "fill" | "none" | "scale-down";
interface responsiveImageProps {
  alt: string;
  src: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: ObjectFitEnum | undefined;
  parentPosition?: string;
}

// FC
const ResponsiveImage = ({
  alt,
  className = "",
  src,
  width = 0,
  height = 0,
  objectFit,
  parentPosition = "relative",
}: responsiveImageProps) => {
  return (
    <div
      className={
        "block h-full w-full" +
        addClassName(className) +
        (parentPosition ? " relative" : "") +
        (objectFit === "cover" ? " overflow-hidden" : "")
      }
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={objectFit ? { objectFit: objectFit } : undefined}
      />
    </div>
  );
};

export default ResponsiveImage;
