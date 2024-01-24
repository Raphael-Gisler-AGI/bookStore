using {db} from '../db/schema';

service BatchService {
    entity Books  as
        projection on db.Books {
            ID,
            title,
            genre
        };

    @readonly
    entity Genres as projection on db.Genres {
        ID,
        name,
        books,
    };
}
