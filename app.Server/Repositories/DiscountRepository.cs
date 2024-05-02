using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Repositories
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly EcodbContext _context;

        public DiscountRepository(EcodbContext context)
        {
            _context = context;
        }

        public async Task<int> RegisterDiscountReserve(DiscountRequest request)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    //добавить запись о добавлении купона
                    await _context.DiscountsHistories.AddAsync(new DiscountsHistory()
                    {
                        UserId = request.UserId,
                        DiscountId = request.DiscountId,
                        Date = DateTime.Now.ToUniversalTime()
                    });

                    //количество добавленных строк
                    int addedRows = _context.ChangeTracker.Entries().Count(e => e.State == EntityState.Added);

                    //списать бонусы у пользователя
                    /*var user = await _context.Users.FindAsync(request.UserId);
                    var discount = await _context.Discounts.FindAsync(request.DiscountId);
                    user.Bonuses -= discount.;*/

                    //сохранить
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                    return addedRows;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return 0;
                }
            }
        }

        public async Task<IEnumerable<Discount>>? GetDiscountsAll()
        {
            return await _context.Discounts.ToListAsync();
        }
    }
}
