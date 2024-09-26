using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProdutosApi.Data;
using ProdutosApi.Services;

namespace ProdutosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private IProductService _productService;
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Product>>> GetProducts()
        {
            try
            {
                var products = await _productService.GetProducts();
                return Ok(products);
            }
            catch
            {
                return BadRequest("Invalid request.");
            }
        }

        [HttpGet("ProductByName")]
        public async Task<ActionResult<IAsyncEnumerable<Product>>> GetProductsByName([FromQuery] string name)
        {
            try
            {
                var products = await _productService.GetProductsByName(name);

                if (products == null)
                {
                    return NotFound($"Não existem produtos cadastrados.");
                }
                else
                {
                    return Ok(products);
                }

            }
            catch
            {
                return BadRequest("Invalid request.");
            }
        }

        [HttpGet("{id:int}", Name = "GetProduct")]
        public async Task<ActionResult<IAsyncEnumerable<Product>>> GetProduct([FromQuery] int id)
        {
            try
            {
                var product = await _productService.GetProduct(id);

                if (product == null)
                {
                    return NotFound($"Produto não cadastrado.");
                }
                else
                {
                    return Ok(product);
                }

            }
            catch
            {
                return BadRequest("Invalid request.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Product product)
        {
            try
            {

                await _productService.CreateProduct(product);
                return CreatedAtRoute(nameof(GetProduct), new { id = product.Id }, product);
            }
            catch
            {
                return BadRequest("Invalid request.");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Product product)
        {
            try
            {
                if(product.Id == id)
                {
                    await _productService.UpdateProduct(product);
                    //return NoContent();
                    return Ok($"Produto id={id} foi atualizado com sucesso.");
                }
                else
                {
                    return BadRequest("Dados inconsistentes.");
                }
            }
            catch
            {
                return BadRequest("Invalid request.");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var product = await _productService.GetProduct(id);

                if(product != null)
                {
                    await _productService.DeleteProduct(product);
                    return Ok($"Produto {id} deletado com sucesso.");
                }
                else
                {
                    return BadRequest($"Produto {id} não encontrado.");
                }
            }
            catch
            {
                return BadRequest("Invalid request.");
            }
        }
    }
}
