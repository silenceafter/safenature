using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Repositories
{
    public class PartnerRepository : IPartnerRepository
    {
        private readonly EcodbContext _context;

        public PartnerRepository(EcodbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Partner>>? GetPartnersAll()
        {
            return await _context.Partners.ToListAsync();
        }
    }
}
