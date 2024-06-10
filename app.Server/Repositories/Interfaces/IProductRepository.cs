using app.Server.Models;

namespace app.Server.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>>? GetProductsAll();
    }
}
