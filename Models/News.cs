using System;

namespace Models
{
    public class News : DatabaseEntity
    {
        public int Id { get; set; }

        public LocaleData Content { get; set; }

        public LocaleData Title { get; set; }

        public String PreviewImage { get; set; }

        public News()
        {
            Content = new LocaleData();
            Title = new LocaleData();
        }
    }
}
