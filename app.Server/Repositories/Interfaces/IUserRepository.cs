using app.Server.Controllers.Requests;
using app.Server.Models;

namespace app.Server.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<int> Create(string encrypt);
        public bool Update();
        public bool Delete();
        public Task<User>? GetUserById(int id);
        public Task<User>? GetUserByEmail(string email);
        //public Task<IEnumerable<Acceptance>>? GetDisposeAll();
    }
}
