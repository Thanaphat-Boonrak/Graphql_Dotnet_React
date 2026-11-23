using Core.Entities;
using Core.Interfaces;
using Core.Models;

namespace API.GraphQL;

public class Mutation(ICustomerService customerService, IOrderService orderService)
{
    public async Task<Customer> AddOrUpdateCustomer(CustomerModel customer)
    {
        return await customerService.AddOrUpdateCustomerAsync(customer);
    }

    public async Task<Order> AddOrUpdateOrder(OrderModel order)
    {
        return await orderService.AddOrUpdateOrderAsync(order);
    }


    public async Task<bool> DeleteCustomer(int customerId)
    {
        return await customerService.DeleteCustomerAsync(customerId);
    }

    public async Task<bool> DeleteOrder(int orderId)
    {
        return await orderService.DeleteOrderAsync(orderId);
    }
}