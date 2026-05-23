"use client"

import * as React from "react"
import { Menu } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"

type DropdownMenuTriggerProps = Menu.Trigger.Props & {
  asChild?: boolean
}

type DropdownMenuContentProps = Menu.Popup.Props &
  Pick<
    Menu.Positioner.Props,
    | "align"
    | "alignOffset"
    | "collisionBoundary"
    | "collisionPadding"
    | "side"
    | "sideOffset"
  >

function DropdownMenu(props: Menu.Root.Props) {
  return <Menu.Root {...props} />
}

function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <Menu.Trigger
      render={asChild && React.isValidElement(children) ? children : undefined}
      {...props}
    >
      {asChild ? undefined : children}
    </Menu.Trigger>
  )
}

function DropdownMenuContent({
  className,
  align = "center",
  alignOffset,
  collisionBoundary,
  collisionPadding,
  side = "bottom",
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        align={align}
        alignOffset={alignOffset}
        className="z-[100]"
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        side={side}
        sideOffset={sideOffset}
      >
        <Menu.Popup
          className={cn(
            "z-[100] min-w-32 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
            "data-[starting-style]:scale-95 data-[ending-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            className
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function DropdownMenuItem({
  className,
  ...props
}: Menu.Item.Props) {
  return (
    <Menu.Item
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

const DropdownMenuSeparator = Menu.Separator

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
}
