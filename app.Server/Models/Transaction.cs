using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class Transaction
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int TypeId { get; set; }

    public DateTime Date { get; set; }

    public int BonusesStart { get; set; }

    public int BonusesEnd { get; set; }

    public virtual ICollection<Acceptance> Acceptances { get; set; } = new List<Acceptance>();

    public virtual ICollection<ReceivingDiscount> ReceivingDiscounts { get; set; } = new List<ReceivingDiscount>();

    public virtual ReceivingProduct? ReceivingProduct { get; set; }

    public virtual TransactionType Type { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
