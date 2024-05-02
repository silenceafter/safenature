using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace app.Server.Repositories
{
    public class WasteDisposalRepository : IWasteDisposalRepository
    {
        private readonly EcodbContext _context;

        public WasteDisposalRepository(EcodbContext context)
        {
            _context = context;
        }

        public async Task<int> RegisterDispose(WasteDisposalRequest wasteDisposal)
        {
            await _context.WasteDisposals.AddAsync(new WasteDisposal()
            {
                UserId = wasteDisposal.UserId,
                HazardousWasteId = wasteDisposal.HazardousWasteId,
                Date = DateTime.Now.ToUniversalTime()
            });
            /*var random = new Random();
            int randomNumber = random.Next(1, 100);
            return await Task.FromResult(randomNumber);*///
            return await _context.SaveChangesAsync();
        }

        public bool UpdateDispose()
        {
            throw new NotImplementedException();
        }

        public bool DeleteDispose()
        {
            throw new NotImplementedException();
        }

        public async Task<WasteDisposal>? GetDispose(int id)
        {
            return await _context.WasteDisposals
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<WasteDisposal>>? GetDisposeAll()
        {
            return await _context.WasteDisposals.ToListAsync();
            /*return await _context.WasteDisposals
                .Include(p => p.HazardousWaste)
                .ToListAsync();*/
        }
    }
}
