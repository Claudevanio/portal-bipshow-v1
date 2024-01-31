/* eslint-disable radix */
export function validateCPF(cpf: string) {
  let sum = 0;
  let remainder;
  let isCpf = cpf;

  isCpf = isCpf.replace('.', '')
    .replace('.', '')
    .replace('-', '')
    .trim();

  let allEqual = true;
  for (let i = 0; i < isCpf.length - 1; i += 1) {
    if (isCpf[i] !== isCpf[i + 1]) { allEqual = false; }
  }
  if (allEqual) { return false; }

  for (let i = 1; i <= 9; i += 1) sum += parseInt(isCpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) { remainder = 0; }
  if (remainder !== parseInt(isCpf.substring(9, 10))) { return false; }

  sum = 0;
  for (let i = 1; i <= 10; i += 1) sum += parseInt(isCpf.substring(i - 1, i)) * (12 - i); remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) { remainder = 0; }
  if (remainder !== parseInt(isCpf.substring(10, 11))) { return false; }

  return true;
}
