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
            ILogger<NewsController> logger
        )
        {
            Db = db;
            Logger = logger;
        }

        [HttpPost]
        public IActionResult Add(Models.Parse.News news)
        {
            Logger.LogInformation("Create new news");
            var id = new Models.News(Db).Add(news);
            return new CreatedAtActionResult(
                nameof(Get), "news", new { id = id }, new { id = id });
        }

        [HttpPut]
        public IActionResult Update(Models.Parse.News news)
        {
            Logger.LogInformation("Update news {0}", news.Id);
            new Models.News(Db).Update(news);
            return new OkResult();
        }

        [HttpGet("{id}")]
        public ActionResult<Models.Parse.News> Get(int id)
        {
            Logger.LogInformation("Get news {0}", id);
            Logger.LogInformation("Path {0}", Request.Headers[":authority"].ToString());
            return new Models.News(Db).Get(id);
        }
    }
}
