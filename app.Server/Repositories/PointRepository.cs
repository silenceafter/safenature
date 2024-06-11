using app.Server.Models;
using app.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Repositories
{
    public class PointRepository: IPointRepository
    {
        private readonly EcodbContext _context;

        public PointRepository(EcodbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Point>>? GetPointsAll()
        {
            try
            {
                return await _context.Points.ToListAsync();
            }
            catch(Exception ex)
            {
                return null;
            }       
        }
    }
}
