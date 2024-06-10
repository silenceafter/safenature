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
    }
}
