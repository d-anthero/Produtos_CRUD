using Microsoft.EntityFrameworkCore;
using ProdutosApi.Data;

namespace ProdutosApi.Services
{
    public class ProductsService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductsService(AppDbContext context)
        {
            _context = context;
        }


        private async Task ValidateProduct(Product product)
        {
            var existingProduct = await _context.Products.FindAsync(product.Id);
            if (existingProduct != null)
            {
                throw new InvalidOperationException($"Produto com {product.Id} já existe.");
            }
            if (string.IsNullOrEmpty(product.Name))
            {
                throw new ArgumentException("Nome do produto não pode ser nulo ou vazio.");
            }
            if (product.Price <= 0)
            {
                throw new ArgumentException("Preço precisa ser maior que 0.");
            }
        }

        public async Task CreateProduct(Product product)
        {
            await ValidateProduct(product);

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProduct(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            try
            {
                return await _context.Products.ToListAsync();
            }
            catch
            {
                throw;
            }

        }

        public async Task<IEnumerable<Product>> GetProductsByName(string name)
        {
            IEnumerable<Product> products;
            if (!string.IsNullOrEmpty(name))
            {
                products = await _context.Products.Where(n => n.Name.StartsWith(name)).ToListAsync();
            }
            else
            {
                products = await GetProducts();
            }
            return products;
        }

        public async Task UpdateProduct(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
