using System;

namespace Models
{
    namespace Parse
    {
        public class News
        {
            public int Id { get; set; }

            public ParseLocaleData Content { get; set; }

            public ParseLocaleData Title { get; set; }

            public string PreviewImage { get; set; }

            public static implicit operator Parse.News(Models.News news)
            {
                return new Parse.News
                {
                    Id = news.Id,
                    Content = news.Content,
                    Title = news.Title,
                    PreviewImage = news.PreviewImage,
                };
            }
        }

    }
}
