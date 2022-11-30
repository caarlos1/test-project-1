import { queryString, parse } from './queryString';

describe('Objeto para query string', () => {
  it('deve criar uma query string valida quando é passado um objeto', () => {
    const obj = {
      name: 'Fabio',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Fabio&profession=developer');
  });

  it('deve criar uma query string valida quando é passado um objeto com array', () => {
    const obj = {
      name: 'Fabio',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Fabio&abilities=JS,TDD');
  });

  it('deve ocorrer um erro quando passado um objeto com objetos dentro', () => {
    const obj = {
      name: 'Fabio',
      abilities: { first: 'JS', second: 'TDD' },
    };

    expect(() => queryString(obj)).toThrowError();
  });
});
describe('Query string', () => {
  it('deve converter uma query string para um objeto', () => {
    const qs = 'name=Fabio&profession=developer';
    expect(parse(qs)).toEqual({ name: 'Fabio', profession: 'developer' });
  });

  it('deve converter uma query string de um item para objeto', () => {
    const qs = 'name=Fabio';
    expect(parse(qs)).toEqual({ name: 'Fabio' });
  });

  it('deve converter uma query string com lista para um objeto', () => {
    const qs = 'name=Fabio&abilities=JS,TDD';
    expect(parse(qs)).toEqual({ name: 'Fabio', abilities: ['JS', 'TDD'] });
  });
});
