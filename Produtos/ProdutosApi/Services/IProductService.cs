using ProdutosApi.Data;

namespace ProdutosApi.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetProduct(int id);
        Task<IEnumerable<Product>> GetProductsByName(string name);
        Task CreateProduct(Product product);
        Task UpdateProduct(Product product);
        Task DeleteProduct(Product product);
    }
}
