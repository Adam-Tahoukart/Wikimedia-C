using DAL;
using System;

namespace Models
{
    public class Like : Record
    {
        public int MediaId { get; set; }
        public int UserId { get; set; }
    }
}