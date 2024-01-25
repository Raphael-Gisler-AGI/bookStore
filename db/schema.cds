using {
    managed,
    cuid
} from '@sap/cds/common';

namespace db;

entity Books : cuid, managed {
    title : String;
    genre : Association to one Genres;
}

entity Genres : cuid, managed {
    name  : String @mandatory;
    books : Association to many Books
                on books.genre = $self
}

@readonly
entity Comments {
        postId : Integer;
    key ID     : Integer;
        name   : String;
        email  : String;
        body   : String;
}
