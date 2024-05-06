using app.Server.Controllers.Requests;
using app.Server.Models;

namespace app.Server.Repositories.Interfaces
{
    public interface IReceivingDiscountRepository
    {
        public Task<int> RegisterDiscountReserve(ReceivingDiscountRequest discount);
        public Task<IEnumerable<Discount>>? GetDiscountsAll();
    }
}
