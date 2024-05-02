using app.Server.Controllers.Requests;
using app.Server.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace app.Server.Repositories.Interfaces
{
    public interface IWasteDisposalRepository
    {
        public Task<bool> RegisterDispose(WasteDisposalRequest wasteDisposal);
        public bool UpdateDispose();
        public bool DeleteDispose();
        public Task<WasteDisposal>? GetDispose(int id);
        public Task<IEnumerable<WasteDisposal>>? GetDisposeAll();
    }
}
