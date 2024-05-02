using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class Discount
{
    public int Id { get; set; }

    public int PartnerId { get; set; }

    public string? Terms { get; set; }

    public DateTime? DateStart { get; set; }

    public DateTime? DateEnd { get; set; }

    public virtual ICollection<DiscountsHistory> DiscountsHistories { get; set; } = new List<DiscountsHistory>();

    public virtual Partner Partner { get; set; } = null!;
}
