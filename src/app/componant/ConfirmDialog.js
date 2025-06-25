"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { X } from "lucide-react";

const ConfirmDialog = ({ open, onConfirm, onCancel, message }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 fixed inset-0 z-40" />
        <Dialog.Content className="bg-white rounded-xl p-6 shadow-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold">تأكيد الإجراء</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-red-600">
                <X />
              </button>
            </Dialog.Close>
          </div>
          <div className="text-gray-700 mb-6">{message}</div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              إلغاء
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
            >
              تأكيد
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
