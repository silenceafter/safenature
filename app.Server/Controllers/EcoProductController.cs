using app.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace app.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class EcoProductController : Controller
    {
        private readonly ILogger<EcoProductController> _logger;
        /*private readonly OgtContext _context;*/

        public EcoProductController(ILogger<EcoProductController> logger/*, OgtContext context*/)
        {
            _logger = logger;
            /*_context = context;*/
        }

        //действие по умолчанию при обращении к ecoproducts/, например, список товаров
        //выдать карточку конкретного товара
        //CRUD для товара
        //возможно, CRUD для категорий товара
        //"приобрести" товар за бонусы
        //какие еще действия могут быть с товарами?

        /*public IActionResult Index()
        {
            return View();
        }*/
    }
}
