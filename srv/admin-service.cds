using {db} from '../db/schema';

service AdminService {
    entity Genres as projection on db.Genres;
    entity Books  as projection on db.Books;
}
