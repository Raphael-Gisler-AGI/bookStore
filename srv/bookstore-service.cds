using {db} from '../db/schema';

service bookstore {
    @odata.draft.enabled
    entity Books  as projection on db.Books;

    entity Genres as projection on db.Genres;
}