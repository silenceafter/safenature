namespace app.Server.Models
{
    public class ReceivingProduct
    {
        public int Id { get; set; }

        public int TransactionId { get; set; }

        public int ProductId { get; set; }

        public DateTime Date { get; set; }

        public virtual Product Product { get; set; } = null!;

        public virtual Transaction Transaction { get; set; } = null!;
    }
}
