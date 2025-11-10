'use client';
import React, { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/common/utils/cn";

const Input = React.forwardRef(({
    className,
    type = "text",
    label,
    description,
    error,
    required = false,
    id,
    value,
    onChange,
    countryCode = "+91",
    onCountryCodeChange,
    showCountryCode = false,
    countryCodeOptions = [], 
    ...props
}, ref) => {
    const inputId = id || useId();
    const [showPassword, setShowPassword] = useState(false);

    const baseInputClasses =
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm " +
        "ring-offset-background placeholder:text-muted-foreground " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
        "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    // ---------- Password Input ----------
    if (type === "password") {
        return (
            <div className="space-y-2">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "text-sm font-medium leading-none",
                            error ? "text-destructive" : "text-foreground"
                        )}
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    <input
                        id={inputId}
                        ref={ref}
                        type={showPassword ? "text" : "password"}
                        value={value}
                        onChange={onChange}
                        className={cn(
                            baseInputClasses,
                            error && "border-destructive focus-visible:ring-destructive",
                            "pr-10",
                            className
                        )}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
        );
    }

    // ---------- Mobile Input with Country Code ----------
    if (showCountryCode) {
        return (
            <div className="space-y-2">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "text-sm font-medium leading-none",
                            error ? "text-destructive" : "text-foreground"
                        )}
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}

                <div className="flex items-center gap-2">
                    <select
                        value={countryCode}
                        onChange={(e) => onCountryCodeChange?.(e.target.value)}
                        className="h-10 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        {countryCodeOptions.length > 0 ? (
                            countryCodeOptions.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))
                        ) : (
                            <option value="+91">+91</option> // fallback
                        )}
                    </select>

                    <input
                        id={inputId}
                        ref={ref}
                        type="tel"
                        value={value}
                        onChange={onChange}
                        placeholder="Enter mobile number"
                        className={cn(
                            baseInputClasses,
                            error && "border-destructive focus-visible:ring-destructive",
                            className
                        )}
                        {...props}
                    />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
        );
    }

    // ---------- Default Input ----------
    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        "text-sm font-medium leading-none",
                        error ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}
            <input
                id={inputId}
                ref={ref}
                type={type}
                value={value}
                onChange={onChange}
                className={cn(
                    baseInputClasses,
                    error && "border-destructive focus-visible:ring-destructive",
                    className
                )}
                {...props}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
});

Input.displayName = "Input";
export default Input;
