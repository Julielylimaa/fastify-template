import type React from "react"
import { forwardRef } from "react"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-[#33276d] mb-2">{label}</label>}
      <input
        ref={ref}
        className={`w-full px-4 py-3 border border-[#76549e]/30 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#76549e] focus:border-[#76549e] bg-white text-[#33276d] placeholder-[#76549e]/60 transition-all duration-200 ${
          error ? "border-red-500 focus:ring-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
    </div>
  )
})

FormInput.displayName = "FormInput"

export default FormInput
