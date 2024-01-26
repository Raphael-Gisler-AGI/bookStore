sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'fpm/test/integration/FirstJourney',
		'fpm/test/integration/pages/BooksMain'
    ],
    function(JourneyRunner, opaJourney, BooksMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('fpm') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksMain: BooksMain
                }
            },
            opaJourney.run
        );
    }
);