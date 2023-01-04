// LIBRARIES
import { type KeyboardEvent, useCallback, useEffect } from "react";

// TYPES
interface Props {
  callback: () => void;
  // addedCondition?: () => boolean;
}

// FC
const CallOnEnter = ({
  /*, addedCondition = () => false */
  callback,
}: Props) => {
  const handler = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        // console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener("keydown", () => handler);
    return () => {
      document.removeEventListener("keydown", () => handler);
    };
  }, [handler]);

  return <></>;
};

export default CallOnEnter;
