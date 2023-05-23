export function throwWarning(...args: any[]): void;
/***
 Throw a console error with the passed arguments
 ***/
export function throwError(...args: any[]): void;
/***
 Generates an universal unique identifier
 ***/
export function generateUUID(): string;
/***
 Check whether a number is power of 2

 params:
 @value (float): number to check
 ***/
export function isPowerOf2(value: any): boolean;
/***
 Linear interpolation between two numbers

 params:
 @start (float): value to lerp
 @end (float): end value to use for lerp
 @amount (float): amount of lerp
 ***/
export function lerp(start: any, end: any, amount: any): number;
