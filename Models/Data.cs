using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    abstract public class Data : DatabaseEntity
    {
        public int Id { get; set; }

        public string Text { get; set; }
    }
}
