import { sum } from './calculator';
describe('Método soma', () => {
  it('deve somar 2 mais 2 e receber 4 ', () => {
    expect(sum(2, 2)).toBe(4);
  });

  it('deve somar 2 mais 2 mesmo que um deles seja string', () => {
    expect(sum('2', '2')).toBe(4);
  });

  it('deve emitir um erro caso seja passado dados que não pode ser somada', () => {
    expect(() => sum('', 2)).toThrowError();
    expect(() => sum([2, 2])).toThrowError();
    expect(() => sum({})).toThrowError();
    expect(() => sum()).toThrowError();
  });
});
