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
        News[] Entity;

        public NewsRepository(DatabaseContext db)
        {
            Db = db;
        }

        public void Update(Models.Parse.News parseResult)
        {
            GetEntityFromDatabase(parseResult.Id);
            Entity[0].PreviewImage = parseResult.PreviewImage;
            Entity[0].Content.SetFromParse(parseResult.Content);
            Entity[0].Title.SetFromParse(parseResult.Title);
            Db.SaveChanges();
        }

        public int Add(Models.Parse.News parseResult)
        {
            Entity = new News[]{ new News() };
            FillEntityForAdd(parseResult);
            Db.Add(Entity[0]);
            Db.SaveChanges();
            return Entity[0].Id;
        }

        private void FillEntityForAdd(Models.Parse.News parseResult)
        {
            Entity[0].Content.SetFromParse(parseResult.Content);
            Entity[0].Title.SetFromParse(parseResult.Title);
            Entity[0].PreviewImage = parseResult.PreviewImage;
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

            return Entity[0];
        }

        public Models.Parse.News[] GetBetween(int start, int end)
        {
            GetEntitiesBetween(start, end);
            var parseArray = 
                Array.ConvertAll<News, Models.Parse.News>(Entity, (elem) => elem);
            return parseArray;
        }

        public void DeleteEntityFromDatabase(int id)
        {
            GetEntityFromDatabase(id);
            (new LocaleDataRepository(Db, Entity[0].Title)).CascadeDelete();
            (new LocaleDataRepository(Db, Entity[0].Content)).CascadeDelete();
            Db.Remove<Models.News>(Entity[0]);
            Db.SaveChanges();
        }

        private void GetEntitiesBetween(int start, int end)
        {
            Entity = 
                Db.News
                    .Include(news => news.Title)
                    .Include(news => news.Title.Ru)
                    .Include(news => news.Title.Be)
                    .OrderByDescending(news => news.CreatedDate)
                    .Skip(start)
                    .Take(end - start + 1)
                    .ToArray();
        }

        private void GetEntityFromDatabase(int id)
        {
            Entity = new News[]
            {
                Db.News
                    .Include(news => news.Content)
                    .Include(news => news.Content.Ru)
                    .Include(news => news.Content.Be)
                    .Include(news => news.Title)
                    .Include(news => news.Title.Ru)
                    .Include(news => news.Title.Be)
                    .First(news => news.Id == id),
            };
        }
    }
}
