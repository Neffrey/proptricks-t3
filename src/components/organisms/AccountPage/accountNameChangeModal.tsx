// LIBRARIES
import { FC, useRef } from "react";
import { User } from "next-auth";
import { trpc } from "utils/trpc";
import * as z from "zod";
import { RiErrorWarningFill } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";

// COMPONENTS
import { useNameChangeFormStore } from "components/stores/nameChangeFormStore";
import { useUserDataStore } from "components/stores/userDataStore";
import useOnClickOutside from "components/hooks/useOnClickOutside";

// PROPS
interface AccountNameChangeModalProps {
  user: User;
}

// FC
const AccountNameChangeModal: FC<AccountNameChangeModalProps> = ({ user }) => {
  // STATE
  const { setUser } = useUserDataStore();
  const {
    nameInput,
    setNameInput,
    nameError,
    setNameError,
    formError,
    setFormError,
    isModalOpen,
    toggleIsModalOpen,
  } = useNameChangeFormStore();

  // tRPC
  const changeName = trpc.useMutation(["public.changeName"], {
    onSuccess(newName) {
      setUser(newName);
    },
  });

  // HANDLE CLICK OUTSIDE OF MODAL TO CLOSE
  const modalRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = () => {
    if (isModalOpen) toggleIsModalOpen();
  };
  useOnClickOutside(modalRef, () => handleClickOutside());

  // VALIDATION
  const nameSchema = z
    .string()
    .min(3, "Name needs to be at least 3 characters long")
    .max(20, "Name can't be longer than 20 characters");
  const validate = nameSchema.safeParse(nameInput);
  const handleValidation = () => {
    if (!validate.success) setNameError(validate.error.message);
    if (validate.success) setNameError("");
  };

  // HANDLE NAME CHANGE
  const handleNameChange = () => {
    if (validate.success) {
      changeName.mutate({
        name: nameInput,
      });
      toggleIsModalOpen();
    }
    if (changeName.error) {
      setFormError(changeName.error.message);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="account-name-change-modal"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => toggleIsModalOpen()}
      />
      <div className="modal w-full flex-col items-center justify-center">
        <div className="modal-box relative p-7" ref={modalRef}>
          <label
            htmlFor="account-name-change-modal"
            className="btn-sm btn-circle btn absolute right-2 top-2 hover:bg-error"
          >
            ✕
          </label>
          <h3 className="text-xl font-bold">Enter New Name</h3>
          <div className="p-2" />
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <input
                defaultValue={user?.name ? user.name : ""}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={() => handleValidation()}
                className="text-md h-full w-full rounded-md bg-neutral-content p-2 text-neutral"
              />
            </div>
            <div className="col-span-1">
              <button
                className="btn-xl btn-primary btn h-full w-full rounded-md"
                onClick={() => handleNameChange()}
              >
                Save
              </button>
            </div>
          </div>
          {(nameError || formError) && <div className="p-2" />}
          {nameError && (
            <div className="alert alert-warning shadow-lg">
              <span>
                <RiErrorWarningFill />
                {JSON.parse(nameError)[0].message
                  ? JSON.parse(nameError)[0].message
                  : "There was an error with the name you entered"}
              </span>
            </div>
          )}
          {formError && (
            <div className="alert alert-error shadow-lg">
              <span>
                <TiWarning /> Warning formError: {formError}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountNameChangeModal;
