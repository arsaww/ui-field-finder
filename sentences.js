

var ALLOWED_SENTENCES = [

    'I log into AZOP as the user "username" which belongs to "groupName"',
    'The element "parentLabel;targetLabel" exists "boolean"',
    'I click the element "parentLabel;targetLabel"',
    'I set the value "value" into the field related to "parentLabel;targetLabel"',
    'I click the button "buttonLabel"'
];


for(var i = 0; i < ALLOWED_SENTENCES.length; i++){
    ALLOWED_SENTENCES[i] = ALLOWED_SENTENCES[i].replace("<","&lt;").replace(">","&gt;");
}


/*

 {
        category : 'OPEN',
        sentence : 'Open the url "google.com" ',
        resolution : 'in "1920x1080" ',
        working : 'and it works "true" ',
        retry : 'with "5" max retry and "8000"ms max wait ',
        details : 'and show algorithm details "details1" '
    },
    {
        category : 'SET',
        sentence : 'Set the value "myValue" ',
        next : 'next to "parentLabel;label" ',
        positionPage : 'on the "top-left" of the page ',
        positionElement : 'on the "top-left" of "parentLabel;label" ',
        working : 'and it works "true" ',
        retry : 'with "5" max retry and "8000"ms max wait ',
        details : 'and show details "d1" '
    },
    {
        category : 'CLICK',
        sentence : 'Click "div" element ',
        next : 'next to "parentLabel;label" ',
        positionPage : 'on the "top-left" of the page ',
        positionElement : 'on the "top-left" of "parentLabel;label" ',
        working : 'and it works "true" ',
        retry : 'with "5" max retry and "8000"ms max wait ',
        details : 'and show details "d1" '
    },
    {
        category : 'CLICK',
        sentence : 'Click "parentLabel;label" ',
        positionPage : 'on the "top-left" of the page ',
        positionElement : 'on the "top-left" of "parentLabel;label" ',
        working : 'and it works "true" ',
        retry : 'with "5" max retry and "8000"ms max wait ',
        details : 'and show details "d1" '
    },
    {
        category : 'RIGHT-CLICK',
        sentence : 'Right-Click "div" element ',
        next : 'next to "parentLabel;label" ',
        positionPage : 'on the "top-left" of the page ',
        positionElement : 'on the "top-left" of "parentLabel;label" ',
        working : 'and it works "true" ',
        retry : 'with "5" max retry and "8000"ms max wait ',
        details : 'and show details "d1" '
    },
    {
        category : 'RIGHT-CLICK',
        sentence : 'Right-Click "parentLabel;label" ',
        positionPage : 'on the "top-left" of the page ',
        positionElement : 'on the "top-left" of "parentLabel;label" ',
        working : 'and it works "true" ',
        retry : 'with "5" max retry and "8000"ms max wait ',
        details : 'and show details "d1" '
    },
    {
        category : 'DOUBLE-CLICK',
        sentence : 'Double-Click "div" element ',
        next : 'next to "parentLabel;label" ',
        positionPage : 'on the "top-left" of the page ',
        positionElement : 'on the "top-left" of "parentLabel;label" ',
        working : 'and it works "true" ',
        retry : 'with "5" max retry and "8000"ms max wait ',
        details : 'and show details "d1" '
    },
    {
        category : 'DOUBLE-CLICK',
        sentence : 'Double-Click "parentLabel;label" ',
        positionPage : 'on the "top-left" of the page ',
        positionElement : 'on the "top-left" of "parentLabel;label" ',
        working : 'and it works "true" ',
        retry : 'with "5" max retry and "8000"ms max wait ',
        details : 'and show details "d1" '
    },
*/
