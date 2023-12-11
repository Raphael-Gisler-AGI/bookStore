using {db} from '../db/schema';

service bookstore {
    entity Books as projection on db.Books;
    entity Genres as projection on db.Genres;
}