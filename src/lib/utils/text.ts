export const zeroPad = (n: number) => {
    if (n < 10) return `0${n}`;
    return n;
}