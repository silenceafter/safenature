using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly EcodbContext _context;

        public UserRepository(EcodbContext context)
        {
            _context = context;
        }

        public async Task<int> Create(string encrypt)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    //добавить пользователя
                    var user = new User() { Encrypt = encrypt, RoleId = 2 };
                    await _context.Users.AddAsync(user);
                    await _context.SaveChangesAsync();

                    //добавить транзакцию
                    var userTransaction = new Transaction()
                    {
                        UserId = user.Id,
                        TypeId = 5,
                        Date = DateTime.UtcNow.ToUniversalTime(),
                        BonusesStart = user.Bonuses,
                        BonusesEnd = user.Bonuses
                    };
                    await _context.Transactions.AddAsync(userTransaction);
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                    return user.Id;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return 0;
                }
            }
            return 0;
        }

        public bool Update()
        {
            return true;
        }

        public bool Delete()
        {
            return true;
        }

        public Task<User>? GetUserById(int id)
        {
            return null;
        }

        public async Task<User>? GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Encrypt == email);
        }
    }
}
