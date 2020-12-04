using System;
using Models;
using Database;

namespace Repositories 
{
    public class LocaleDataRepository
    {
        private DatabaseContext DbContext;
        private Models.LocaleData LocaleData ;

        public LocaleDataRepository(
            DatabaseContext dbContext, Models.LocaleData localeData)
        {
            DbContext = dbContext;
            LocaleData = localeData;
        }

        public void CascadeDelete()
        {
            DbContext.Remove<Models.BeData>(LocaleData.Be);
            DbContext.Remove<Models.RuData>(LocaleData.Ru);
            DbContext.Remove<Models.LocaleData>(LocaleData);
        }

    }
}