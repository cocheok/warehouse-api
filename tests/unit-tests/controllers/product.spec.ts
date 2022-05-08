import 'jest';
import Product from '../../../src/controllers/product';

describe('Product', () => {
   

    const testProduct = {
        name: "Dining Chair",
        contain_articles: [
            {
                amount_of: 1,
                article: {
                    art_id: 1,
                    name: "table",
                    stock: 3,
                }
            },
            {
                amount_of: 6,
                article: {
                    art_id: 2,
                    name: "chair",
                    stock: 11,
             
                }
            }
        ]
      };
    
    describe('calculateQty', () => {

        it('should have one product', async () => {
            expect(Product.calculateQty(testProduct.contain_articles)).toBe(1);
        });
        it('should have three products when the required amount of chairs is 0', async () => {
            let testNoProduct = testProduct;
            testNoProduct.contain_articles[1].amount_of = 0;
            expect(Product.calculateQty(testProduct.contain_articles)).toBe(3);
        });
        it('should have no products when the stock of an article is 0', async () => {
            let testNoProduct = testProduct;
            testNoProduct.contain_articles[1].article.stock = 0;
            expect(Product.calculateQty(testProduct.contain_articles)).toBe(0);
        });
        it('should have no products when the required amount of an article is bigger than the stock', async () => {
            let testNoProduct = testProduct;
            testNoProduct.contain_articles[1].amount_of = 12;
            expect(Product.calculateQty(testProduct.contain_articles)).toBe(0);
        });
    })
    
    describe('calculateQty', () => {
    
    });
});