using app.Server.Models;

namespace app.Server.Repositories.Interfaces
{
    public interface IPointRepository
    {
        Task<IEnumerable<Point>>? GetPointsAll();
    }
}
