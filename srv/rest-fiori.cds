using RestService from './rest-service';

annotate RestService.Comments with
@(UI: {
    SelectionFields: [
        ID,
        postId,
        email,
        name,
        body,
    ],
    LineItem       : [
        {
            Value: ID,
            Label: '{i18n>ID}'
        },
        {
            Value: postId,
            Label: '{i18n>postId}'
        },
        {
            Value: email,
            Label: '{i18n>email}'
        },
        {
            Value: name,
            Label: '{i18n>name}'
        },
        {
            Value: body,
            Label: '{i18n>body}'
        }
    ]
});