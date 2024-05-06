using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class Acceptance
{
    public int Id { get; set; }

    public int TransactionId { get; set; }

    public int HazardousWasteId { get; set; }

    public DateTime Date { get; set; }

    public virtual HazardousWaste HazardousWaste { get; set; } = null!;

    public virtual Transaction Transaction { get; set; } = null!;
}
