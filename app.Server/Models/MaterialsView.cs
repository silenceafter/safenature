using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class MaterialsView
{
    public long? Cnt { get; set; }

    public int? Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public DateOnly? DateInput { get; set; }

    public DateOnly? DateOutput { get; set; }
}
