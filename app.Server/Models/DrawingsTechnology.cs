using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class DrawingsTechnology
{
    public int Id { get; set; }

    public int DrawingId { get; set; }

    public int TechnologyId { get; set; }

    public virtual Drawing Drawing { get; set; } = null!;

    public virtual ICollection<TechnologiesOperation> TechnologiesOperations { get; set; } = new List<TechnologiesOperation>();

    public virtual Technology Technology { get; set; } = null!;
}
