"use client";

import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import {
	type ButtonProps as ButtonPrimitiveProps,
	Button as ButtonPromitive,
} from "react-aria-components";

import { cn } from "@/lib/utils";
import { buttonStyles } from "./button-styles";

export interface ButtonProps
	extends ButtonPrimitiveProps,
		VariantProps<typeof buttonStyles> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<ButtonPromitive
			className={cn(buttonStyles({ variant, size, className }))}
			{...props}
		/>
	);
}
