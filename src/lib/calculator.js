export function sum(n1, n2) {
  const num1 = parseFloat(n1);
  const num2 = parseFloat(n2);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    throw new Error('Please check your input');
  }

  return num1 + num2;
}
