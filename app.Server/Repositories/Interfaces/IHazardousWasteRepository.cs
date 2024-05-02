using app.Server.Controllers.Requests;
using app.Server.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace app.Server.Repositories.Interfaces
{
    public interface IHazardousWasteRepository
    {
        public Task<IEnumerable<HazardousWaste>>? GetHazardousWasteAll();
    }
}
