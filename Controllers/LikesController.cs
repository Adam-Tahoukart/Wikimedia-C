using DAL;
using Models;
using System.Web.Mvc;

public class LikesController : Controller
{
    [HttpPost]
    public JsonResult Toggle(int mediaId)
    {
        Models.User currentUser = Models.User.ConnectedUser;    
        if (currentUser == null)
            return Json(new { success = false });

        Like existingLike = DB.Likes.GetLike(mediaId, currentUser.Id);

        if (existingLike != null)
        {
            DB.Likes.Delete(existingLike.Id);
        }
        else
        {
            DB.Likes.Add(new Like { MediaId = mediaId, UserId = currentUser.Id });
        }

        DB.Events.MarkHasChanged();

        return Json(new { success = true });
    }
}