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
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    //добавить запись о приеме отходов
                    await _context.WasteDisposals.AddAsync(new WasteDisposal()
                    {
                        UserId = wasteDisposal.UserId,
                        HazardousWasteId = wasteDisposal.HazardousWasteId,
                        Date = DateTime.Now.ToUniversalTime()
                    });

                    //количество добавленных строк
                    int addedRows = _context.ChangeTracker.Entries().Count(e => e.State == EntityState.Added);

                    //добавить бонусы пользователю
                    var user = await _context.Users.FindAsync(wasteDisposal.UserId);
                    var hazardousWaste = await _context.HazardousWastes.FindAsync(wasteDisposal.HazardousWasteId);
                    user.Bonuses += hazardousWaste.Bonuses;
                    
                    //сохранить
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                    return addedRows;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return 0;
                }
            }
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
