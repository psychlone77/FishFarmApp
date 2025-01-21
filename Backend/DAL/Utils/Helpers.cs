using DAL.Entities;

namespace DAL.Utils
{
    public class Helpers
    {
        public static bool CheckPermission(int permissionLevel, PermissionLevel requiredPermission)
        {
            return (permissionLevel & (int)requiredPermission) == (int)requiredPermission;
        }
    }
}
