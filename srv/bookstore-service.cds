using {db} from '../db/schema';

service bookstore {
    @odata.draft.enabled
    entity Books  as
        projection on db.Books {
            title,
            genre
        };

    @readonly
    entity Genres as projection on db.Genres;

    function getStorage(book : UUID) returns Integer;
}
