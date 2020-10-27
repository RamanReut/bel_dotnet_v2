using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    namespace Database
    {
        public interface IDatabaseEntity
        {
            DateTime CreatedDate { get; set; }

            DateTime UpdatedDate { get; set; }
        }

        abstract public class DatabaseEntity : IDatabaseEntity
        {

            public DateTime CreatedDate { get; set; }

            public DateTime UpdatedDate { get; set; }
        }
    }
}
