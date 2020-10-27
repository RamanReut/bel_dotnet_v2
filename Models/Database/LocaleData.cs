using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    namespace Database
    {
        public class LocaleData : DatabaseEntity
        {
            public int Id { get; set; }

            public RuData Ru { get; set; }

            public BeData Be { get; set; }

            public void SetFromParse(Parse.ParseLocaleData value)
            {
                Ru.Text = value.Ru;
                Be.Text = value.Be;
            }
        }
    }
}