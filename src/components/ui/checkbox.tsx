"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (error) {
      console.error("Checkbox error:", error)
    }
  }, [error])

  return (
    <React.Fragment>
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className
        )}
        {...props}
        onCheckedChange={(checked) => {
          try {
            if (props.onCheckedChange) {
              props.onCheckedChange(checked)
            }
          } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)))
          }
        }}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          An error occurred. Please try again.
        </p>
      )}
    </React.Fragment>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }