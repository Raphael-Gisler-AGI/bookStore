using {db} from '../db/schema';

service DraftService {
    @odata.draft.enabled
    entity Books  as
        projection on db.Books;

    @readonly
    entity Genres as projection on db.Genres {
        ID,
        name,
        books,
    };
}
