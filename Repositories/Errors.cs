using System;

namespace Repositories
{
    public class NotFoundException: InvalidOperationException
    {
        public int Id { get;}
        public NotFoundException(int id)
            : base($"Cannot get page with id {id}")
        { 
            Id = id;
        }
    }
}