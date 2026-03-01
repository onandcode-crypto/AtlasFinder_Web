import React from 'react';
import Link from 'next/link';
import { UrlObject } from 'url';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    href?: string | UrlObject;
    target?: string;
    rel?: string;
}

export function Button({ variant = 'primary', href, className = '', target, rel, children, ...props }: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-medium rounded-[4px] transition-all duration-300 ease-out";
    const primaryStyles = "bg-coral text-white hover:bg-red-600";
    const secondaryStyles = "bg-transparent border border-charcoal text-charcoal hover:bg-charcoal hover:text-white";

    const styles = `${baseStyles} ${variant === 'primary' ? primaryStyles : secondaryStyles} ${className}`;

    if (href) {
        return (
            <Link href={href as any} target={target} rel={rel} className={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button className={styles} {...props}>
            {children}
        </button>
    );
}
