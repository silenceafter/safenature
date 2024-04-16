using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class TechnologiesOperation
{
    public int Id { get; set; }

    public int TechnologyId { get; set; }

    public int OperationId { get; set; }

    public virtual Operation Operation { get; set; } = null!;

    public virtual DrawingsTechnology Technology { get; set; } = null!;
}
