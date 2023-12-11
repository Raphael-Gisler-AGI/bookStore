using {db} from '../db/schema';

service admin {
    @odata.draft.enabled
    entity Books  as
        projection on db.Books excluding {
            storage
        }

    entity Genres as projection on db.Genres;

    function getStorage(book : UUID) returns Integer;
}
