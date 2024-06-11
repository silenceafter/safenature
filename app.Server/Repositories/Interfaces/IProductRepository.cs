using app.Server.Controllers.Requests;
using app.Server.Models;

namespace app.Server.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>>? GetProductsAll();
        Task<int> BuyProducts(List<ProductRequest> products, User user);
    }
}
