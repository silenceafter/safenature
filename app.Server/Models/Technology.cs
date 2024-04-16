using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class Technology
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public virtual ICollection<DrawingsTechnology> DrawingsTechnologies { get; set; } = new List<DrawingsTechnology>();
}
