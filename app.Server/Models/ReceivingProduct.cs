using System;
using System.Collections.Generic;

namespace app.Server.Models;

public partial class ReceivingProduct
{
    public int Id { get; set; }

    public int TransactionId { get; set; }

    public int ProductId { get; set; }

    public DateTime Date { get; set; }

    public virtual Transaction Id1 { get; set; } = null!;

    public virtual Product IdNavigation { get; set; } = null!;
}
