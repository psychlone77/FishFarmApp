using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.AppConfigManager
{
    public interface IAppConfigManager
    {
        public void ValidateConfiguration();
        public string GetDatabaseConnectionString();
        public string GetJwtKey();
        public string GetJwtIssuer();
        public string GetJwtAudience();
        public string GetJwtExpiryTime();
        public string GetRefreshTokenExpiryTime();
        public string GetBlobStorageConnectionString();
        public string GetFishFarmContainerName();
        public string GetEmployeeContainerName();
        public string GetFailedLoginAttempts();
        public string GetLockoutTime();
    }
}
