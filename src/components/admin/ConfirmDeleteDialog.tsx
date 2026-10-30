"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { adminDangerButtonClass, adminSecondaryButtonClass } from "./styles";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
}

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(next) => !isDeleting && onOpenChange(next)}>
      <AlertDialogContent className="border-hr-white/15 bg-hr-green-dark text-hr-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-hr-white">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-hr-gray">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <button
            type="button"
            className={adminSecondaryButtonClass}
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${adminDangerButtonClass} flex items-center justify-center gap-2`}
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
