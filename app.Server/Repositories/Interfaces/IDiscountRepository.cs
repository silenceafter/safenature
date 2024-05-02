using app.Server.Controllers.Requests;
using app.Server.Models;

namespace app.Server.Repositories.Interfaces
{
    public interface IDiscountRepository
    {
        public Task<int> RegisterDiscountReserve(DiscountRequest discount);
        public Task<IEnumerable<Discount>>? GetDiscountsAll();
    }
}
