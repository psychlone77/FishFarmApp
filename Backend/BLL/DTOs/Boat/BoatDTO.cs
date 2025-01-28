﻿using DAL.Entities;

namespace BLL.DTOs.Boat
{
    public class BoatDTO
    {
        public required string Id { get; set; }
        public required string Model { get; set; }
        public required string BoatType { get; set; }
    }
}
