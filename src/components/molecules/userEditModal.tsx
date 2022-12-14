// LIBRARIES
import { FC, useRef } from "react";
import { trpc } from "utils/trpc";
import * as z from "zod";
import { RiErrorWarningFill } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";

// COMPONENTS
import { useUserEditModalStore } from "components/stores/userEditModalStore";
import { useAllUsersDataStore } from "components/stores/allUsersDataStore";
import useOnClickOutside from "components/hooks/useOnClickOutside";

// FC
const UserEditModal: FC = () => {
  // STATE
  const { allUsers, setAllUsers } = useAllUsersDataStore();
  const {
    userId,
    formError,
    setFormError,
    isModalOpen,
    toggleIsModalOpen,
    createdInput,
    setCreatedInput,
    createdError,
    setCreatedError,
    nameInput,
    setNameInput,
    nameError,
    setNameError,
    emailInput,
    setEmailInput,
    emailError,
    setEmailError,
    roleInput,
    setRoleInput,
    roleError,
    setRoleError,
  } = useUserEditModalStore();

  // tRPC
  const { mutate, error } = trpc.useMutation(["admin.updateUser"], {
    onSuccess: (user) => {
      if (allUsers)
        setAllUsers(
          allUsers?.map((u) => {
            if (u.id === user.id) {
              return user;
            }
            return u;
          })
        );
      toggleIsModalOpen();
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
  const validateName = nameSchema.safeParse(nameInput);
  const handleValidateName = () => {
    if (!validateName.success) setNameError(validateName.error.message);
    if (validateName.success) setNameError("");
  };

  const emailSchema = z
    .string()
    .email("Invalid Email")
    .min(3, "Email needs to be at least 3 characters long")
    .max(30, "Email can't be longer than 30 characters");
  const validateEmail = emailSchema.safeParse(emailInput);
  const handleValidateEmail = () => {
    if (!validateEmail.success) setEmailError(validateEmail.error.message);
    if (validateEmail.success) setEmailError("");
  };

  const roleSchema = z
    .string()
    .min(3, "Role needs to be at least 3 characters long")
    .max(15, "Role can't be longer than 15 characters");
  const validateRole = roleSchema.safeParse(roleInput);
  const handleValidateRole = () => {
    if (!validateRole.success) setRoleError(validateRole.error.message);
    if (validateRole.success) setRoleError("");
  };

  // HANDLE NAME CHANGE
  const handleMutation = () => {
    if (validateName.success && validateEmail.success && validateRole.success) {
      mutate({
        id: userId,
        name: nameInput,
        email: emailInput,
        role: roleInput,
      });
      //toggleIsModalOpen();
    } else if (error) {
      setFormError(error.message);
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
          <h2 className="text-3xl font-bold">Update User</h2>
          <div className="p-2" />
          <div className="flex flex-col items-start gap-2">
            <label className="w-full text-start text-xl">
              Name
              <input
                defaultValue={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={() => handleValidateName()}
                className="text-md mt-1 h-full w-full rounded-md bg-neutral-content p-2 text-neutral"
              />
            </label>
            <label className="w-full text-start text-xl">
              Email
              <input
                defaultValue={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onBlur={() => handleValidateEmail()}
                className="text-md mt-1 h-full w-full rounded-md bg-neutral-content p-2 text-neutral"
              />
            </label>
            <label className="w-full text-start text-xl">
              Role
              <input
                defaultValue={roleInput}
                onChange={(e) => setRoleInput(e.target.value.toLowerCase())}
                onBlur={() => handleValidateRole()}
                className="text-md mt-1 h-full w-full rounded-md bg-neutral-content p-2 text-neutral"
              />
            </label>
            <div className="w-full">
              <button
                className="btn-xl btn-primary btn mt-2 h-full w-full rounded-md"
                onClick={() => handleMutation()}
              >
                Save
              </button>
            </div>
          </div>
          {(formError || nameError || emailError || roleError) && (
            <div className="p-2" />
          )}
          {nameError && (
            <div className="alert alert-warning shadow-lg">
              <span>
                <RiErrorWarningFill />
                {JSON.parse(nameError)[0].message
                  ? JSON.parse(nameError)[0].message
                  : "Invalid name entered"}
              </span>
            </div>
          )}
          {emailError && (
            <div className="alert alert-warning shadow-lg">
              <span>
                <RiErrorWarningFill />
                {JSON.parse(emailError)[0].message
                  ? JSON.parse(emailError)[0].message
                  : "Invalid name entered"}
              </span>
            </div>
          )}
          {roleError && (
            <div className="alert alert-warning shadow-lg">
              <span>
                <RiErrorWarningFill />
                {JSON.parse(roleError)[0].message
                  ? JSON.parse(roleError)[0].message
                  : "Invalid name entered"}
              </span>
            </div>
          )}
          {formError && (
            <div className="alert alert-error shadow-lg">
              <span>
                <TiWarning />
                Error submitting form: {formError}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserEditModal;
