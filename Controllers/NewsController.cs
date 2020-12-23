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

        [HttpGet("list/{start}/{end}")]
        public ActionResult<Models.Parse.News[]> GetList(int start, int end)
        {
            Logger.LogInformation(
                "Get news list started from {0} and ended to {1}", start, end);
            Models.Parse.News[] arr = 
                (new NewsRepository(Db).GetBetween(start, end));
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

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            Logger.LogInformation("Delete news with id {0}", id);

            (new NewsRepository(Db)).DeleteEntityFromDatabase(id);
            return new JsonResult(new { id = id });
        }

        [HttpGet("count")]
        public JsonResult Count()
        {
            Logger.LogInformation("Get news count");

            var count = (new NewsRepository(Db)).Count();
            return new JsonResult(new { count = count });
        }
    }
}
