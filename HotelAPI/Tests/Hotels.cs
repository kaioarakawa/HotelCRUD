using HotelAPI.Controllers;
using HotelAPI.Interface;
using HotelAPI.Models;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Tests
{
    public class Hotels
    {
        [Fact]
        public async void Create()
        {
            var mock = new Mock<IHotel>();
            
            mock.Setup(e => e.PostHotel(It.IsAny<Hotel>()));

            Hotel hotel = new Hotel
            {
                Id = 1,
                Name = "Hotel Teste",
                HotelResume = "A nice resume",
                Rate = "5",
                Amenities = "Pool",
                Address = "Some place here"
            };

            await mock.Object.PostHotel(hotel);
            mock.Verify(e => e.PostHotel(It.IsAny<Hotel>()), Times.AtLeastOnce);
        }

        [Fact]
        public async void Update()
        {
            var mock = new Mock<IHotel>();

            mock.Setup(e => e.PutHotel(It.IsAny<int>(), It.IsAny<Hotel>()));

            Hotel hotel = new Hotel
            {
                Id = 1,
                Name = "Hotel Teste",
                HotelResume = "A nice resume",
                Rate = "5",
                Amenities = "Pool",
                Address = "Some place here"
            };

            await mock.Object.PutHotel(1, hotel);
            mock.Verify(e => e.PutHotel(It.IsAny<int>(), It.IsAny<Hotel>()), Times.AtLeastOnce);
        }

        [Fact]
        public async void Delete()
        {
            var mock = new Mock<IHotel>();

            mock.Setup(e => e.DeleteHotel(It.IsAny<int>()));


            await mock.Object.DeleteHotel(1);
            mock.Verify(e => e.DeleteHotel(It.IsAny<int>()), Times.AtLeastOnce);
        }

        [Fact]
        public async void GetId()
        {
            var mock = new Mock<IHotel>();

            mock.Setup(e => e.GetHotel(It.IsAny<int>()));


            await mock.Object.GetHotel(1);
            mock.Verify(e => e.GetHotel(It.IsAny<int>()), Times.AtLeastOnce);
        }

    }
}
