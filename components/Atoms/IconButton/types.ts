export type Size = "sm" | "md" | "lg";
export type Variant = "ghost" | "solid" | "outline";

export interface IconButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    label?: string;
    size?: Size;
    variant?: Variant;
    className?: string;
}

export const BUTTON_SIZE_MAP: Record<Size, number> = {
    sm: 28,
    md: 36,
    lg: 44,
};