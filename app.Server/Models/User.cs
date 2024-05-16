using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class User
{
    public int Id { get; set; }
    public string Encrypt { get; set; }

    public int Bonuses { get; set; }

    public int RoleId { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
