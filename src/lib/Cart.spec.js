import { Cart } from './Cart';

describe('Cart', () => {
  let cart = new Cart();
  let product;
  let product2;

  beforeEach(() => {
    cart = new Cart();
    product = { title: 'Tênis Adidas', price: 35388 };
    product2 = { title: 'Tênis Nike', price: 41872 };
  });

  describe('getTotal()', () => {
    it('deve retornar 0 quando getTotal() é executado em um carrinho recem criado.', () => {
      expect(cart.getTotal().getAmount()).toBe(0);
    });

    it('deve multiplicar a quantidade e o preço e retornar o valor total.', () => {
      const item = { product, quantity: 2 };
      cart.add(item);
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('deve garantir que apenas um produto (do mesmo) exista por vez.', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product, quantity: 1 });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('deve atualizar o total quando adiciona ou remove o produto.', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product: product2, quantity: 1 });

      expect(cart.getTotal().getAmount()).toEqual(112648);
      cart.remove(product);
      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe('checkout()', () => {
    it('deve retornar um objeto com o total e uma lista de itens.', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product: product2, quantity: 3 });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('deve esvaziar o carrinho quando checkout() é chamado.', () => {
      cart.add({ product: product2, quantity: 3 });
      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('summary()', () => {
    it('deve retornar um objeto com o total e uma lista de itens.', () => {
      cart.add({ product, quantity: 5 });
      cart.add({ product: product2, quantity: 3 });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('deve conter o valor formatado em summary()', () => {
      cart.add({ product, quantity: 5 });
      cart.add({ product: product2, quantity: 3 });
      expect(cart.summary().formatted).toEqual('R$3,025.56');
    });
  });

  describe('condições de desconto', () => {
    it('deve aplicar um porcentual de desconto quando a quantidade minima é cumprida.', () => {
      const condition = { percentage: 30, minimum: 2 };
      cart.add({ product, condition, quantity: 3 });
      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it('deve aplicar um desconto para quantidades pares.', () => {
      const condition = { quantity: 2 };
      cart.add({ product, condition, quantity: 4 });
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('deve aplicar um desconto diferente para quantidades impares.', () => {
      const condition = { quantity: 2 };
      cart.add({ product, condition, quantity: 5 });
      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('não deve aplicar um porcentual de desconto quando a quantidade minima não é cumprida.', () => {
      const condition = { percentage: 30, minimum: 2 };
      cart.add({ product, condition, quantity: 2 });
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('não deve aplicar desconto de quantidade.', () => {
      const condition = { quantity: 2 };
      cart.add({ product, condition, quantity: 2 });
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('deve receber duas ou mais condições e aplicar o melhor desconto. Primeiro caso.', () => {
      const condition1 = { percentage: 30, minimum: 2 };
      const condition2 = { quantity: 2 };
      cart.add({ product, condition: [condition1, condition2], quantity: 5 });
      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('deve receber duas ou mais condições e aplicar o melhor desconto. Segundo caso.', () => {
      const condition1 = { percentage: 80, minimum: 2 };
      const condition2 = { quantity: 2 };
      cart.add({ product, condition: [condition1, condition2], quantity: 5 });
      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
  });
});
