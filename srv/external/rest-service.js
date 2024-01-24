cds.service.impl(function () {
    const { CurrentWeather } = this.entities;
  
    this.on("READ", CurrentWeather, async (req) => {
      const openWeatherApi = await cds.connect.to("OpenWeatherApi");
      return openWeatherApi.tx(req).run(req.query);
    });
  });