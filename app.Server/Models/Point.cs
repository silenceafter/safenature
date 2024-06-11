using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class Point
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;
}
