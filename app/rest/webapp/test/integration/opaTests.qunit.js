sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'rest/test/integration/FirstJourney',
		'rest/test/integration/pages/CommentsList',
		'rest/test/integration/pages/CommentsObjectPage'
    ],
    function(JourneyRunner, opaJourney, CommentsList, CommentsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('rest') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCommentsList: CommentsList,
					onTheCommentsObjectPage: CommentsObjectPage
                }
            },
            opaJourney.run
        );
    }
);