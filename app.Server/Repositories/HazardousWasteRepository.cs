using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace app.Server.Repositories
{
    public class HazardousWasteRepository : IHazardousWasteRepository
    {
        private readonly EcodbContext _context;

        public HazardousWasteRepository(EcodbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HazardousWaste>>? GetHazardousWasteAll()
        {
            return await _context.HazardousWastes.ToListAsync();
        }
    }
}
