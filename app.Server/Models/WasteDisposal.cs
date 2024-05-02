using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class WasteDisposal
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int HazardousWasteId { get; set; }

    public DateTime? Date { get; set; }

    public int? Bonuses { get; set; }

    public virtual HazardousWaste HazardousWaste { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
