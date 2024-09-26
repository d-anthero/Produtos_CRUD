using Microsoft.CodeAnalysis;
using Moq;
using ProdutosApi.Data;
using ProdutosApi.Services;
using System;
using System.Net.WebSockets;

namespace ProductApi.Test
{
    public class ProductTests
    {

        [Fact]
        public async Task GetProduct_ShouldReturnProduct_WhenProductExists()
        {
            // Arrange
            var mockProductService = new Mock<IProductService>();
            int productId = 1;

            var expectedProduct = new Product
            {
                Id = productId,
                Name = "Banana",
                Price = 100.00,
                Description = "It's a banana."
            };

            mockProductService.Setup(service => service.GetProduct(productId))
                              .ReturnsAsync(expectedProduct);

            // Act
            var result = await mockProductService.Object.GetProduct(productId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedProduct.Id, result.Id);
            Assert.Equal(expectedProduct.Name, result.Name);
            Assert.Equal(expectedProduct.Price, result.Price);
            Assert.Equal(expectedProduct.Description, result.Description);
        }

        [Fact]
        public async Task CreateProduct_ShouldCreate_WhenAllInfoGiven()
        {
            //Arrange
            var mockProductService = new Mock<IProductService>();

            var validProduct = new Product { Id = 1, Name = "Banana", Price = 1.00, Description = "It's a banana" };

            mockProductService.Setup(service => service.CreateProduct(validProduct));

            //Act
            await mockProductService.Object.CreateProduct(validProduct);

            // Assert
            mockProductService.Verify(service => service.CreateProduct(It.Is<Product>
                (p =>
                p.Id == validProduct.Id &&
                p.Name == validProduct.Name &&
                p.Price == validProduct.Price &&
                p.Description == validProduct.Description)), Times.Once);

        }

        [Fact]
        public async Task CreateProduct_ShouldThrowInvalidOperationException_WhenProductNameIsNull()
        {

            //Arrange
            var mockProductService = new Mock<IProductService>();

            var product = new Product { Id = 3, Name = "Banana", Price = 100.00, Description = "It's a banana!" };
            var productSameId = new Product { Id = 3, Name = "Banana", Price = 100.00, Description = "It's a banana!" };

            mockProductService.Setup(service => service.CreateProduct(product));
            mockProductService.Setup(service => service.CreateProduct(It.IsAny<Product>())).ThrowsAsync(new InvalidOperationException($"Produto com {productSameId.Id} já existe."));

            // Act & Assert
            var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => mockProductService.Object.CreateProduct(productSameId));

            Assert.Equal($"Produto com {productSameId.Id} já existe.", exception.Message);
        }

        [Fact]
        public async Task CreateProduct_ShouldThrowArgumentException_WhenProductNameIsNull()
        {

            //Arrange
            var mockProductService = new Mock<IProductService>();
            var productNoName = new Product { Id = 2, Name = "", Price = 100.00 };

            mockProductService.Setup(service => service.CreateProduct(It.IsAny<Product>())).ThrowsAsync(new ArgumentException("Nome do produto não pode ser nulo ou vazio."));

            // Act & Assert
            var exception = await Assert.ThrowsAsync<ArgumentException>(() => mockProductService.Object.CreateProduct(productNoName));

            Assert.Equal("Nome do produto não pode ser nulo ou vazio.", exception.Message);
        }

        [Fact]
        public async Task CreateProduct_ShouldThrowArgumentException_WhenProductPriceIsNull()
        {
            //Arrange
            var mockProductService = new Mock<IProductService>();
            var productNoName = new Product { Id = 2, Name = "Banana", Price = 0 };

            mockProductService.Setup(service => service.CreateProduct(It.IsAny<Product>())).ThrowsAsync(new ArgumentException("Preço precisa ser maior que 0."));

            // Act & Assert
            var exception = await Assert.ThrowsAsync<ArgumentException>(() => mockProductService.Object.CreateProduct(productNoName));

            Assert.Equal("Preço precisa ser maior que 0.", exception.Message);
        }
    }
}