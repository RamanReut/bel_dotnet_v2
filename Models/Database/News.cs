using System;

namespace Models
{
    namespace Database
    {
        public class News : DatabaseEntity
        {
            public int Id { get; set; }

            public LocaleData Content { get; set; }

            public LocaleData Title { get; set; }

            public String PreviewImage { get; set; }

        }
    }
}