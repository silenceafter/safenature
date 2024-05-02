using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class DiscountsHistory
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int DiscountId { get; set; }

    public DateTime? Date { get; set; }

    public virtual Discount Discount { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
