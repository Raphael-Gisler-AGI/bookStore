using AdminService as service from '../../srv/admin-service';

annotate service.Books with
@(
    UI: {
        SelectionFields: [title],
        LineItem       : [
            {Value: title},
            {Value: genre.name}
        ],
    },
    UI: {FieldGroup #Details: {Data: [
        {
            $Type: 'UI.DataField',
            Value: title,
        },
        {
            $Type: 'UI.DataField',
            Value: genre.name,
        },
    ]}}
) {
    title @(title: '{i18n>title}')
};

annotate service.Genres with
@(UI: {
    SelectionFields: [name],
    LineItem       : [{Value: name}],
}) {
    name @(title: '{i18n>genreName}')
};
