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

        public async Task<int> Create(string encrypt, string emailHash)
        {
            await using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    //добавить пользователя
                    var user = new User() { Encrypt = encrypt, EmailHash = emailHash, RoleId = 2 };
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
                    await transaction.CommitAsync();
                    return user.Id;
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
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

        public async Task<User>? GetUserByEmail(string emailHash)
        {            
            return await _context.Users.FirstOrDefaultAsync(u => u.EmailHash == emailHash);
        }
    }
}
