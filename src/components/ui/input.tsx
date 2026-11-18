import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
  "flex h-11 w-full rounded-lg border border-input bg-transparent px-3.5 py-2 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  className
)}
      {...props}
    />
  )
}

export { Input }
