using System;
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

        public void Add(Parse.News parseResult)
        {
            Entity = new Database.News();
            FillEntityForAdd(parseResult);
        }

        private void FillEntityForAdd(Parse.News parseResult)
        {
            Entity.Content.SetFromParse(parseResult.Content);
            Entity.Title.SetFromParse(parseResult.Title);
            Entity.PreviewImage = parseResult.PreviewImage;
        }
    }
}
