using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories.Interfaces;

namespace app.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly EcodbContext _context;

        public UserRepository(EcodbContext context)
        {
            _context = context;
        }

        public Task<int> Register(UserRequest request)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                { 
                    _context.Users.AddAsync(new User()
                    {
                        e
                    })
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

        public Task<User>? GetUserByEmail(string email)
        {
            return null;
        }
    }
}
