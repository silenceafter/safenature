using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class HazardousWaste
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int HazardClassId { get; set; }

    public int? Bonuses { get; set; }

    public virtual HazardClass HazardClass { get; set; } = null!;

    public virtual ICollection<WasteDisposal> WasteDisposals { get; set; } = new List<WasteDisposal>();
}
