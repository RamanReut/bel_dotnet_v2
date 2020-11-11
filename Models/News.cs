using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Database;

namespace Models
{
    public class News
    {
        DatabaseContext Db;
        Database.News Entity;

        public News(DatabaseContext db)
        {
            Db = db;
        }

        public void Update(Parse.News parseResult)
        {
            GetEntityFromDatabase(parseResult.Id);
            Entity.PreviewImage = parseResult.PreviewImage;
            Entity.Content.SetFromParse(parseResult.Content);
            Entity.Title.SetFromParse(parseResult.Title);
            Db.SaveChanges();
        }

        public void Add(Parse.News parseResult)
        {
            Entity = new Database.News();
            FillEntityForAdd(parseResult);
            Db.Add(Entity);
            Db.SaveChanges();
        }

        private void FillEntityForAdd(Parse.News parseResult)
        {
            Entity.Content.SetFromParse(parseResult.Content);
            Entity.Title.SetFromParse(parseResult.Title);
            Entity.PreviewImage = parseResult.PreviewImage;
        }

        public Parse.News Get(int id)
        {
            GetEntityFromDatabase(id);
            return Entity;
        }

        private void GetEntityFromDatabase(int id)
        {
            Entity = Db.News
                .Include(news => news.Content)
                .Include(news => news.Content.Ru)
                .Include(news => news.Content.Be)
                .Include(news => news.Title)
                .Include(news => news.Title.Ru)
                .Include(news => news.Title.Be)
                .First(news => news.Id == id);
        }
    }
}
