using {db} from '../db/schema';

service batch {
    entity Books  as
        projection on db.Books {
            ID,
            title,
            genre
        };

    @readonly
    entity Genres as projection on db.Genres;
}
