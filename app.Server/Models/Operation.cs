using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class Operation
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public int? Type { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<TechnologiesOperation> TechnologiesOperations { get; set; } = new List<TechnologiesOperation>();
}
