using System;

namespace Models
{
    namespace Parse
    {
        public class ParseLocaleData
        {
            public string Ru { get; set; }

            public string Be { get; set; }

            public static implicit operator ParseLocaleData(Database.LocaleData locale)
            {
                return new ParseLocaleData
                {
                    Ru = locale?.Ru?.Text,
                    Be = locale?.Be?.Text
                };
            }
        }
    }
}
