"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Dialog = ({
  children,
  className,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  if (open === false) return null;

  return (
    <div
      className={cn(
        "bg-[rgba(0,0,0,0.4)] fixed inset-0 overflow-auto z-[700] flex items-center justify-center",
        `${className}`,
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onOpenChange?.(false);
        }
      }}
    >
      {children}
    </div>
  );
};

export const DialogHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-between", className)}>{children}</div>
  );
};

export const DialogClose = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      className={cn("select-none", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const DialogTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "font-gorditta text-[#111111] text-2xl font-medium",
        className,
      )}
      onClick={() => {}}
    >
      {children}
    </h1>
  );
};

export const DialogDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(className)} onClick={() => {}}>
      {children}
    </div>
  );
};

export const DialogContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-8", className)} onClick={() => {}}>
      {children}
    </div>
  );
};

export const DialogFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-between gap-6", className)}>
      {children}
    </div>
  );
};

Dialog.DialogHeader = DialogHeader;
Dialog.DialogTitle = DialogTitle;
Dialog.DialogClose = DialogClose;
Dialog.DialogContent = DialogContent;
Dialog.DialogFooter = DialogFooter;
