using app.Server.Controllers.Requests;
using app.Server.Models;

namespace app.Server.Repositories.Interfaces
{
    public interface IPartnerRepository
    {
        public Task<IEnumerable<Partner>>? GetPartnersAll();
    }
}