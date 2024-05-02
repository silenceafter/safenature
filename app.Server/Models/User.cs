using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class User
{
    public int Id { get; set; }

    public int? Bonuses { get; set; }

    public int RoleId { get; set; }

    public virtual ICollection<DiscountsHistory> DiscountsHistories { get; set; } = new List<DiscountsHistory>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<WasteDisposal> WasteDisposals { get; set; } = new List<WasteDisposal>();
}
