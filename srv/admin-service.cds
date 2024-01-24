using {db} from '../db/schema';

service AdminService {
    entity Books  as projection on db.Books
    entity Genres as projection on db.Genres;
}
