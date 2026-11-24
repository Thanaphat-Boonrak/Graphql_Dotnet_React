
namespace Core.Models;

public class StatsModel
{
    public int TotalCustomers { get; set; }
    public int TotalOrders { get; set; }
    public int PendingOrders { get; set; }
    public int DraftOrders { get; set; }
    public int CompletedOrders { get; set; }
    public int ShippedOrders { get; set; }
}