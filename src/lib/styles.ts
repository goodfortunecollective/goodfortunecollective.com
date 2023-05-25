import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export function cls(...classes: (string | boolean | null | undefined)[]) {
    return twMerge(clsx(classes));
}