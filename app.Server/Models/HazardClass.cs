using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class HazardClass
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<HazardousWaste> HazardousWastes { get; set; } = new List<HazardousWaste>();
}
