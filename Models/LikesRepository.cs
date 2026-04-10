using DAL;
using System.Collections.Generic;
using System.Linq;

namespace Models
{
    public class LikesRepository : Repository<Like>
    {
        public List<Like> LikesOfMedia(int mediaId)
        {
            return ToList().Where(l => l.MediaId == mediaId).ToList();
        }

        public bool UserAlreadyLiked(int mediaId, int userId)
        {
            return ToList().Any(l => l.MediaId == mediaId && l.UserId == userId);
        }

        public Like GetLike(int mediaId, int userId)
        {
            return ToList().FirstOrDefault(l => l.MediaId == mediaId && l.UserId == userId);
        }
    }
}