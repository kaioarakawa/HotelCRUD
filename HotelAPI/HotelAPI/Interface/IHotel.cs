using HotelAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelAPI.Interface
{
    public interface IHotel
    {
        public Task<ActionResult<Hotel>> GetHotel(int id);

        public Task<ActionResult<Hotel>> PostHotel(Hotel dHotel);

        public Task<ActionResult<Hotel>> DeleteHotel(int id);

        public Task<IActionResult> PutHotel(int id, Hotel dHotel);
    }
}
