import { AlertDialog } from "radix-ui";
import React, { MouseEventHandler } from "react";

interface props {
  heading: string;
  message: string;
  agreeTitle: string;
  disagreeTitle: string;
  onAgree: MouseEventHandler<HTMLButtonElement>;
  onDisagree: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

const ConfirmDialog: React.FC<props> = ({
  heading,
  message,
  agreeTitle,
  disagreeTitle,
  onAgree,
  onDisagree,
  isOpen,
}) => (
  <AlertDialog.Root open={isOpen}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="z-50 fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
      <AlertDialog.Content className="z-50 fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
        <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
          {heading}
        </AlertDialog.Title>
        <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
          {message}
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button onClick={onDisagree} className="inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none outline-offset-1 hover:bg-mauve5 focus-visible:outline-2 focus-visible:outline-mauve7 select-none">
              {disagreeTitle}
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={onAgree}
              className="inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red5 focus-visible:outline-2 focus-visible:outline-red7 select-none"
            >
              {agreeTitle}
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default ConfirmDialog;
