using Core.Entities;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class OrderService(IDbContextFactory<AppDbContext> dbContextFactory) : IOrderService
{
    public async Task<List<Order>> GetAllOrders()
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();

        return await context.Orders.Where(o => !o.IsDeleted).Include(c => c.Customer).ToListAsync();
    }

    public async Task<Order> AddOrUpdateOrderAsync(OrderModel orderModel)
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();
        Order order;

        if (orderModel.Id == null || orderModel.Id == 0)
        {
            order = new Order
            {
                CustomerId = orderModel.CustomerId,
                OrderDate = orderModel.OrderDate ?? DateTime.UtcNow,
                Description = orderModel.Description,
                TotalAmount = orderModel.TotalAmount,
                DepositAmount = orderModel.DepositAmount,
                IsDelivery = orderModel.IsDelivery,
                Status = orderModel.Status,
                OtherNotes = orderModel.OtherNotes
            };

            context.Orders.Add(order);
        }
        else
        {
            order = await context.Orders
                .FirstOrDefaultAsync(o => o.Id == orderModel.Id);

            if (order == null)
            {
                throw new KeyNotFoundException($"Order with ID {orderModel.Id} not found.");
            }

            order.CustomerId = orderModel.CustomerId;
            order.OrderDate = orderModel.OrderDate ?? order.OrderDate;
            order.Description = orderModel.Description;
            order.TotalAmount = orderModel.TotalAmount;
            order.DepositAmount = orderModel.DepositAmount;
            order.IsDelivery = orderModel.IsDelivery;
            order.Status = orderModel.Status;
            order.OtherNotes = orderModel.OtherNotes;

            context.Orders.Update(order);
        }

        await context.SaveChangesAsync();

        return order;
    }

    public async Task<bool> DeleteOrderAsync(int id)
    {
        var context = await dbContextFactory.CreateDbContextAsync();
        var order = await context.Orders.Where(o => o.Id == id).FirstOrDefaultAsync();
        if (order == null)
        {
            throw new Exception("Order not found.");
        }

        order.IsDeleted = true;
        return await context.SaveChangesAsync() > 0;
    }
}