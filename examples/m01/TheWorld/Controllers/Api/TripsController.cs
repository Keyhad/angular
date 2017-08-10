using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheWorld.Models;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Api
{
    [Route("/api/trips")]
    public class TripsController: Controller
    {
        private IWorldRepository _repository;
        private ILogger<TripsController> _logger;

        public TripsController(IWorldRepository repository, ILogger<TripsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]TripViewModel theTrip)
        {
            if (ModelState.IsValid)
            {
                var newTrip = Mapper.Map<Trip>(theTrip);

                _repository.AddTrip(newTrip);
                if (await _repository.SaveChangesAsync())
                {
                    return Created($"api/trips/{theTrip.Name}", Mapper.Map<TripViewModel>(newTrip));
                }
                return BadRequest();
            }

            return BadRequest(ModelState /* "Failed to save changes to the database" */);
        }

        [HttpGet("")]
        public IActionResult Get()
        {
            try
            {
                var results = _repository.GetAllTrips();

                return Ok(Mapper.Map<IEnumerable<TripViewModel>>(results));

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get our trips: {ex}");

                return BadRequest($"Error : {ex.Message}");
            }
        }

        [HttpGet("old2")]
        public IActionResult Get3()
        {
            Boolean error = false;
            if (error)
            {
                return BadRequest("Bad request");
            }

            return Ok(new Trip() { Name = "My Trip2" }); 
        }

        [HttpGet("old3")]
        public JsonResult Get2()
        {
            return Json(new Trip() { Name = "My Trip3" });
        }
    }
}
