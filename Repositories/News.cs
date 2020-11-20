using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Models;
using Database;

namespace Repositories
{
    public class NewsRepository
    {
        DatabaseContext Db;
        News Entity;

        public NewsRepository(DatabaseContext db)
        {
            Db = db;
        }

        public void Update(Models.Parse.News parseResult)
        {
            GetEntityFromDatabase(parseResult.Id);
            Entity.PreviewImage = parseResult.PreviewImage;
            Entity.Content.SetFromParse(parseResult.Content);
            Entity.Title.SetFromParse(parseResult.Title);
            Db.SaveChanges();
        }

        public int Add(Models.Parse.News parseResult)
        {
            Entity = new News();
            FillEntityForAdd(parseResult);
            Db.Add(Entity);
            Db.SaveChanges();
            return Entity.Id;
        }

        private void FillEntityForAdd(Models.Parse.News parseResult)
        {
            Entity.Content.SetFromParse(parseResult.Content);
            Entity.Title.SetFromParse(parseResult.Title);
            Entity.PreviewImage = parseResult.PreviewImage;
        }

        public Models.Parse.News Get(int id)
        {
            try
            {
                GetEntityFromDatabase(id);
            }
            catch (InvalidOperationException)
            {
                throw new NotFoundException(id);
            }

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
