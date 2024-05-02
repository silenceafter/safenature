using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class Partner
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();
}
