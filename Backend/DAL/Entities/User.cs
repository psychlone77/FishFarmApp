using Microsoft.AspNetCore.Identity;

namespace DAL.Entities
{
    public class User : IdentityUser
    {
        public IList<FishFarmEntity>? FishFarms { get; set; }
    }
}
