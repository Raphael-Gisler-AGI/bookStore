using {db} from '../db/schema';

@Capabilities.KeyAsSegmentSupported : true
service RestService {
    @readonly
    entity Comments as projection on db.Comments;
}

// With the KeyAsSegmentSupported capability, the service accepts requests to get single resources with the ID provided as path segment,
// for example GET /weather/CurrentWeather/12345. This is a more REST-like way of reading resources by key,
// in contrast to OData’s special syntax (GET /weather/CurrentWeather(12345)).