using AdminService as service from '../../srv/admin-service';

annotate service.Books with
@(UI: {
    SelectionFields: [title],
    LineItem       : [
        {Value: title},
        {Value: genre.name}
    ],
}) {
    title @(title: '{i18n>title}')
};

annotate service.Genres with
@(

) {
    name @(title: '{i18n>name}')
};
