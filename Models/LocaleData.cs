using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class LocaleData : DatabaseEntity
    {
        public int Id { get; set; }

        public RuData Ru { get; set; }

        public BeData Be { get; set; }

        public LocaleData()
        {
            Ru = new RuData();
            Be = new BeData();
        }

        public void SetFromParse(Parse.ParseLocaleData value)
        {
            Ru.Text = value.Ru;
            Be.Text = value.Be;
        }
    }
}
