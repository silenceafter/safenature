using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly EcodbContext _context;

        public ProductRepository(EcodbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>>? GetProductsAll()
        {
            try
            {
                return await _context.Products.ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }            
        }

        public async Task<int> BuyProducts(List<ProductRequest> productsRequest, User user)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    if (productsRequest.Count > 0)
                    {
                        //1 создать транзакцию о приобретении товара
                        var userTransaction = new Transaction()
                        {
                            UserId = user.Id,
                            TypeId = 8,
                            Date = DateTime.UtcNow.ToUniversalTime()
                        };
                        await _context.Transactions.AddAsync(userTransaction);

                        //сохранить
                        await _context.SaveChangesAsync();
                        var userTransactionId = userTransaction.Id;
                    }

                    //коллекция
                    foreach(var productRequest in productsRequest)
                    {
                        var product = await _context.Products.FindAsync(productRequest.Id);
                        var bonusesEnd = user.Bonuses - product.Bonus;
                    
                        //пользователю не хватает бонусов для покупки товара
                        if (bonusesEnd < 0)
                        {
                            transaction.Rollback();
                            return 0;
                        }                        

                        //2 добавить запись о приобретении товара
                        /*await _context.Re.AddAsync(new ReceivingDiscount()
                        {
                            TransactionId = userTransactionId,
                            DiscountId = request.DiscountId,
                            Date = DateTime.UtcNow.ToUniversalTime()
                        });*/

                    }
                    

                    
                }
                catch (Exception ex)
                {

                }
            }

                    return 0;
        }
    }
}
