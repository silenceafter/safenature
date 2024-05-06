using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class ReceivingDiscount
{
    public int Id { get; set; }

    public int TransactionId { get; set; }

    public int DiscountId { get; set; }

    public DateTime Date { get; set; }

    public virtual Discount Discount { get; set; } = null!;

    public virtual Transaction Transaction { get; set; } = null!;
}
