﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IFishFarmsRepository
    {
        Task<ICollection<FishFarmEntity>> GetAllFishFarms();
    }
}
