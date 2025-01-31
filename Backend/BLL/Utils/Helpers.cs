using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace BLL.Utils
{
    public class Helpers
    {
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
    }
}
