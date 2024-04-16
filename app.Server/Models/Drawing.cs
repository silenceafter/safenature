using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class Drawing
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string ExCode { get; set; } = null!;

    public string InCode { get; set; } = null!;

    public virtual ICollection<DrawingsTechnology> DrawingsTechnologies { get; set; } = new List<DrawingsTechnology>();
}
