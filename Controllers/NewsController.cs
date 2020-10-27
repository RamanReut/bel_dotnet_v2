using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Database;

namespace Controllers
{
    [ApiController]
    public class NewsController : ControllerBase
    {
        private DatabaseContext Db;
        private readonly ILogger<NewsController> Logger;

        public NewsController(
            DatabaseContext db,
            ILogger<NewsController> logger)
        {
            Db = db;
            Logger = logger;
        }

        [HttpPost]
        public IActionResult Add(Models.Parse.News newsData)
        {
            var news = new News(Db);
            news.Add(newsData);
            return new OkResult();
        }

        [HttpPut]
        public IActionResult Update()
        {
            return new OkResult();
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new OkResult();
        }
    }
}