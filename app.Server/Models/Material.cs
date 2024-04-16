using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class Material
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateOnly DateInput { get; set; }

    public DateOnly DateOutput { get; set; }
}
