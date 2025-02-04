using System.ComponentModel.DataAnnotations;
using System.Reflection;
using DAL.Entities;

namespace BLL.Utils
{
    public class Helpers
    {
        public static string GenerateRandomString(string id)
        {
            return string.Concat(id, Guid.NewGuid().ToString().AsSpan(0, 8));
        }
        public static string GetEnumDisplayName(Enum enumValue)
        {
            return enumValue.GetType()
                            .GetMember(enumValue.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()?
                            .GetName() ?? enumValue.ToString();
        }

        public static TEnum? GetEnumValueFromDisplayName<TEnum>(string displayName) where TEnum : struct, Enum
        {
            return Enum.GetValues(typeof(TEnum))
                       .Cast<TEnum>()
                       .FirstOrDefault(e => GetEnumDisplayName(e) == displayName);
        }

        public static bool CompareEnumDisplayName<TEnum>(string displayName, TEnum enumValue) where TEnum : struct, Enum
        {
            return GetEnumDisplayName(enumValue) == displayName;
        }

        public static string GetPermissionsString(int permissionLevel)
        {
            var permissions = Enum.GetValues(typeof(PermissionLevel))
                                  .Cast<PermissionLevel>()
                                  .Where(p => (permissionLevel & (int)p) != 0)
                                  .Select(p => GetEnumDisplayName(p))
                                  .ToArray();
            return string.Join(", ", permissions);
        }
    }
}
