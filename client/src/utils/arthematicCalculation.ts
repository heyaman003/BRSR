 function calculateSum(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}
 function calculateProduct(...numbers: number[]): number {
    return numbers.reduce((product, num) => product * num, 1);
}
 function calculateAverage(...numbers: number[]): number {
    return calculateSum(...numbers) / numbers.length;
}
 function divideNumbers(dividend: number, divisor: number): number {
    return dividend / divisor;
}
export  const arthematicCalculator = {
    calculateSum,
    calculateProduct,
    calculateAverage,
    divideNumbers,
}
