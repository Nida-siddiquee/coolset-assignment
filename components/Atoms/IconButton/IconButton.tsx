import React, { forwardRef } from "react";
import { BUTTON_SIZE_MAP, IconButtonProps } from "./types";



const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            icon,
            label,
            size = "md",
            variant = "ghost",
            className = "",
            children,
            style,
            type = "button",
            disabled,
            ...rest
        },
        ref
    ) => {
        const ariaLabel = (rest as React.AriaAttributes)["aria-label"] || label || undefined;

        const sizePx = BUTTON_SIZE_MAP[size] ?? BUTTON_SIZE_MAP.md;
        const baseStyles: React.CSSProperties = {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: sizePx,
            height: sizePx,
            padding: 0,
            borderRadius: 6,
            border: "none",
            background: "transparent",
            cursor: disabled ? "not-allowed" : "pointer",
            transition: "background 150ms, transform 100ms",
            color: "currentColor",
            ...style,
        };

        if (variant === "solid") {
            baseStyles.background = disabled ? "#e6e6e6" : "#111827";
            baseStyles.color = disabled ? "#9ca3af" : "#fff";
        } else if (variant === "outline") {
            baseStyles.border = "1px solid rgba(0,0,0,0.08)";
            baseStyles.background = disabled ? "transparent" : "transparent";
        } else {
            // ghost
            baseStyles.background = "transparent";
        }

        return (
            <button
                ref={ref}
                type={type}
                aria-label={ariaLabel}
                title={ariaLabel}
                disabled={disabled}
                className={className}
                style={baseStyles}
                {...rest}
            >
                {icon ?? children}
            </button>
        );
    }
);

IconButton.displayName = "IconButton";

export default IconButton;