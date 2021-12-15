using HotelAPI.Interface;
using HotelAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelAPI.Controllers
{
    public class HotelAdapter : IHotel
    {
        private readonly HotelDBContext _context;
        readonly HotelController _hotel;

        public HotelAdapter() => _hotel = new HotelController(_context);

        public Task<ActionResult<Hotel>> DeleteHotel(int id) => _hotel.DeleteHotel(id);

        public Task<ActionResult<Hotel>> GetHotel(int id) => _hotel.GetHotel(id);

        public Task<ActionResult<Hotel>> PostHotel(Hotel dHotel) => _hotel.PostHotel(dHotel);

        public Task<IActionResult> PutHotel(int id, Hotel dHotel) => _hotel.PutHotel(id, dHotel);
    }
}
