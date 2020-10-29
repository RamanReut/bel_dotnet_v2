using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Database;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            //var news = new News(Db);
            //news.Add(newsData);
            return new OkResult();
        }

        [HttpPut]
        public IActionResult Update(
            Models.Parse.News news)
        {
            new Models.News(Db).Add(news);
            return new OkResult();
        }

        [HttpGet("{id}")]
        public ActionResult<Models.Parse.News> Get(int id)
        {
            Logger.LogInformation("Get news {0}", id);
            return new Models.News(Db).Get(id);
        }
    }
}
