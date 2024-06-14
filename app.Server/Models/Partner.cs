﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace app.Server.Models;

public partial class Partner
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();
}
