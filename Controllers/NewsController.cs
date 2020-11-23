using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Repositories;
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
            var id = new NewsRepository(Db).Add(news);
            return new CreatedAtActionResult(
                nameof(Get), "news", new { id = id }, new { id = id });
        }

        [HttpPut]
        public IActionResult Update(Models.Parse.News news)
        {
            Logger.LogInformation("Update news {0}", news.Id);
            new NewsRepository(Db).Update(news);
            return new OkResult();
        }

        [HttpGet("list/{count}")]
        public ActionResult<Models.Parse.News[]> GetList(int count)
        {
            Logger.LogInformation("Get news list with length {0}", count);
            Models.Parse.News[] arr = (new NewsRepository(Db).GetLast(count));
            return arr;
        }

        [HttpGet("{id}")]
        public ActionResult<Models.Parse.News> Get(int id)
        {
            Models.Parse.News news;

            Logger.LogInformation("Get news {0}", id);

            try 
            {    
                news = (new NewsRepository(Db)).Get(id);
            }
            catch (NotFoundException ex)
            {
                Logger.LogError("News page with id {0}", ex.Id);
                return new NotFoundObjectResult(new { id = ex.Id });
            }

            return news;
        }
    }
}
