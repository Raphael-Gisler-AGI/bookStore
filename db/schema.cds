using {
    managed,
    cuid
} from '@sap/cds/common';

namespace db;

entity Books : cuid, managed {
    title   : String                    @mandatory;
    genre   : Association to one Genres @mandatory;
    storage : Integer default 1         @assert.range: [
        0,
        100
    ]
}

entity Genres : cuid, managed {
    name  : String @mandatory;
    books : Composition of many Books
                on books.genre = $self
}
