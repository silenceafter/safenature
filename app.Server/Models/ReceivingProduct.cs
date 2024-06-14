using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace app.Server.Models;

public partial class ReceivingProduct
{
    public int Id { get; set; }

    public int TransactionId { get; set; }

    public int ProductId { get; set; }

    public DateTime Date { get; set; }

    [JsonIgnore]
    public virtual Transaction Id1 { get; set; } = null!;

    [JsonIgnore]
    public virtual Product IdNavigation { get; set; } = null!;
}
