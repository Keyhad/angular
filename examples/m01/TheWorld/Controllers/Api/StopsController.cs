using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheWorld.Models;
using TheWorld.Services;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Api
{
    [Route("/api/trips/{tripName}/stops")]
    public class StopsController: Controller
    {
        private IWorldRepository _repository;
        private ILogger<StopsController> _logger;
        private GeoCoordsService _coordsService;

        public StopsController(IWorldRepository repository, 
            GeoCoordsService coordsService,
            ILogger<StopsController> logger)
        {
            _repository = repository;
            _logger = logger;
            _coordsService = coordsService;
        }

        [HttpGet("")]
        public IActionResult Get(string tripName)
        {
            try
            {
                var trip = _repository.GetTripByName(tripName);
                var stops = trip.Stops.OrderBy(s => s.Order).ToList();

                return base.Ok(Mapper.Map<List<StopViewModel>>(stops));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get our trips: {ex}");

                return BadRequest($"Error : {ex.Message}");
            }
        }

        [HttpPost("")]
        public async Task<IActionResult> Post(string tripName, [FromBody]StopViewModel theStop)
        {
            if (ModelState.IsValid)
            {
                var newStop = Mapper.Map<Stop>(theStop);

                // Lookup the GeoCodes
                var result = await _coordsService.GetCoordsAsync(newStop.Name);

                if (!result.Success)
                {
                    _logger.LogError(result.Message); 
                }
                else
                {
                    newStop.Latitude = result.Latitude;
                    newStop.Longitude = result.Longitude;

                    // Save to the database
                    _repository.AddStop(tripName, newStop);
                    if (await _repository.SaveChangesAsync())
                    {
                        return Created($"api /trips/{tripName}/stops/{theStop.Name}", Mapper.Map<StopViewModel>(newStop));
                    }
                }
             }

            return BadRequest(ModelState /* "Failed to save changes to the database" */);
        }

    }
}
