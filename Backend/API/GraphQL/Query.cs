using Core.Entities;
using Core.Interfaces;

namespace API.GraphQL;

public class Query(ICustomerService customerService, IOrderService orderService)
{
    [UseFiltering]
    [UseSorting]
    public async Task<List<Customer>> GetCustomers()
    {
        return await customerService.GetCustomersAndOrders();
    }

    [UseFiltering]
    [UseSorting]
    public async Task<List<Order>> GetOrders()
    {
        return await orderService.GetAllOrders();
    }
}