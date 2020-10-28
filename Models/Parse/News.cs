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
        }

    }
}
