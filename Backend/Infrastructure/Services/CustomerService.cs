using Core.Entities;
using Core.Enums;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class CustomerService(IDbContextFactory<AppDbContext> dbContextFactory) : ICustomerService
{
    public async Task<List<Customer>> GetCustomersAndOrders()
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();

        return await context
            .Customers.Where(c => !c.IsDelete)
            .Include(o => o.Orders)
            .Include(a => a.Address).ToListAsync();
    }

    public async Task<Customer> AddOrUpdateCustomerAsync(CustomerModel customerModel)
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();
        Customer customer;

        if (customerModel.Id == null || customerModel.Id == 0)
        {
            customer = new Customer
            {
                FirstName = customerModel.FirstName,
                LastName = customerModel.LastName,
                Email = customerModel.Email,
                ContactNumber = customerModel.ContactNumber,
                Address = new Address
                {
                    AddressLine1 = customerModel.AddressLine1,
                    AddressLine2 = customerModel.AddressLine2,
                    City = customerModel.City,
                    State = customerModel.State,
                    Country = customerModel.Country,
                },
            };

            context.Customers.Add(customer);
        }
        else
        {
            customer = await context.Customers
                .Include(c => c.Address)
                .FirstOrDefaultAsync(c => c.Id == customerModel.Id);

            if (customer == null)
            {
                throw new KeyNotFoundException($"Customer with ID {customerModel.Id} not found.");
            }

            customer.FirstName = customerModel.FirstName;
            customer.LastName = customerModel.LastName;
            customer.Email = customerModel.Email;
            customer.ContactNumber = customerModel.ContactNumber;

            if (customer.Address != null)
            {
                customer.Address.AddressLine1 = customerModel.AddressLine1;
                customer.Address.AddressLine2 = customerModel.AddressLine2;
                customer.Address.City = customerModel.City;
                customer.Address.State = customerModel.State;
                customer.Address.Country = customerModel.Country;
            }
            else
            {
                customer.Address = new Address
                {
                    AddressLine1 = customerModel.AddressLine1,
                    AddressLine2 = customerModel.AddressLine2,
                    City = customerModel.City,
                    State = customerModel.State,
                    Country = customerModel.Country,
                };
            }

            context.Customers.Update(customer);
        }

        await context.SaveChangesAsync();

        return customer;
    }

    public async Task<bool> DeleteCustomerAsync(int id)
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();
        var customer = await context.Customers.Where(c => c.Id == id).Include(c => c.Orders).FirstOrDefaultAsync();

        if (customer == null)
        {
            throw new KeyNotFoundException($"Customer with ID {id} not found.");
        }

        customer.IsDelete = true;

        foreach (var order in customer.Orders)
        {
            order.IsDeleted = true;
        }

        return await context.SaveChangesAsync() > 0;
    }

    public async Task<StatsModel> GetCustomerAndOrderStatsAsync()
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();
        var totalCustomer = await context.Customers.Where(c => !c.IsDelete).CountAsync();

        var orders = await context.Orders.Where(o => !o.IsDeleted).ToListAsync();

        return new StatsModel
        {
            TotalCustomers = totalCustomer,
            TotalOrders = orders.Count,
            PendingOrders = orders.Count(o => o.Status == OrderStatus.Pending),
            DraftOrders = orders.Count(o => o.Status == OrderStatus.Draft),
            CompletedOrders = orders.Count(o => o.Status == OrderStatus.Completed),
            ShippedOrders = orders.Count(o => o.Status == OrderStatus.Shipped),
        };


    }
}