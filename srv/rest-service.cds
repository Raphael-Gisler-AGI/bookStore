using {db} from '../db/schema';

@Capabilities.KeyAsSegmentSupported : true
service RestService {
    @readonly
    entity Comments as projection on db.Comments
}