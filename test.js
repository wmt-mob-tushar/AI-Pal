const BitManipulation = (n) => {
    return Math.pow(2, n >> 2) == n;
}

console.log(4 >> 2);