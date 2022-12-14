import addClassName from "components/helpers/addClassName";
import { FC, ChangeEvent } from "react";

const inputTypes = {
  text: ["text", "email", "password", "number", "tel", "url", "textarea"],
  checkbox: ["checkbox", "radio"],
};

interface Props {
  inputName?: string;
  label?: string | (() => string);
  labelPosition?: "left" | "right" | "top" | "bottom";
  type?:
    | "text"
    | "textarea"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "checkbox"
    | "radio";
  inputClassName?: string;
  labelClassName?: string;
  value: string;
  setValue: (name: string) => void;
}

const Input: FC<Props> = ({
  inputName,
  label,
  labelPosition = "top",
  type = "text",
  inputClassName,
  labelClassName,
  value,
  setValue,
}) => {
  const onChangeHelper = (e: ChangeEvent<HTMLInputElement>) => {
    // If the input type is a checkbox or radio, then the value is the checked state else it is the value of the input
    if (inputTypes.checkbox.includes(type)) {
      setValue(e.target.checked ? "true" : "false");
    } else if (inputTypes.text.includes(type)) {
      setValue(e.target.value);
    }
    // else throw error
  };
  return (
    <label
      className={
        "flex min-w-full cursor-pointer" +
        (labelPosition === "top" || labelPosition === "bottom"
          ? " flex-col"
          : "") +
        addClassName(labelClassName)
      }
    >
      <>
        {label && (labelPosition === "top" || labelPosition === "left")
          ? label
          : ""}
        {type === "textarea" ? (
          <textarea
            name={inputName ? inputName : ""}
            value={value}
            className={"p-2" + addClassName(inputClassName)}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <input
            name={inputName ? inputName : ""}
            type={type ? type : "text"}
            value={value}
            className={"p-2" + addClassName(inputClassName)}
            onChange={(e) => onChangeHelper(e)}
            checked={
              inputTypes.checkbox.includes(type) ? value === "true" : false
            }
          />
        )}
        {label && (labelPosition === "bottom" || labelPosition === "right")
          ? label
          : ""}
      </>
    </label>
  );
};

export default Input;
