

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

var NEW_SENTENCES =
    {
        main: [
            {
                content: 'Open url "www"',
                category: "Global",
                addition: [
                    {key: "IS_WORKING", cursor: "6", required:"0"},
                    {key: "RETRY_INTERVAL", cursor: "7", required:"0"},
                    {key: "TIMEOUT", cursor: "8", required:"0"},
                    {key: "SHOW_DETAILS", cursor:"9", required:"0"}
                ]
            },
            {
                content: 'Set value "anyValue"',
                category: "Global",
                addition: [
                    {key: "NEXT_TO_ELEMENT", cursor : "2", required : "0"},
                    {key: "ON_PAGE_POSITION", cursor : "3", required : "0"},
                    {key: "ON_ELEMENT_POSITION", cursor : "4", required : "0"},
                    {key: "INSIDE_OF_ELEMENT", cursor : "5", required : "0"},
                    {key: "IS_WORKING", cursor: "6", required : "1"},
                    {key: "RETRY_INTERVAL", cursor: "7", required : "1"},
                    {key: "TIMEOUT", cursor: "8", required : "1"},
                    {key: "SHOW_DETAILS", cursor:"9", required : "1"}
                ]
            },
            {
                content: 'Click value',
                category: "Global",
                addition: [
                    {key: "ON_ELEMENT", cursor : "1", required : "0"},
                    {key: "NEXT_TO_ELEMENT", cursor : "2", required : "0"},
                    {key: "ON_PAGE_POSITION", cursor : "3", required : "0"},
                    {key: "ON_ELEMENT_POSITION", cursor : "4", required : "0"},
                    {key: "INSIDE_OF_ELEMENT", cursor : "5", required : "0"},
                    {key: "IS_WORKING", cursor: "6", required : "1"},
                    {key: "RETRY_INTERVAL", cursor: "7", required : "1"},
                    {key: "TIMEOUT", cursor: "8", required : "1"},
                    {key: "SHOW_DETAILS", cursor:"9", required : "1"}
                ]
            },
            {
                content: 'Right Click',
                category: "Global",
                addition: [
                    {key: "ON_ELEMENT", cursor : "1", required : "0"},
                    {key: "NEXT_TO_ELEMENT", cursor : "2", required : "0"},
                    {key: "ON_PAGE_POSITION", cursor : "3", required : "0"},
                    {key: "ON_ELEMENT_POSITION", cursor : "4", required : "0"},
                    {key: "INSIDE_OF_ELEMENT", cursor : "5", required : "0"},
                    {key: "IS_WORKING", cursor: "6", required : "1"},
                    {key: "RETRY_INTERVAL", cursor: "7", required : "1"},
                    {key: "TIMEOUT", cursor: "8", required : "1"},
                    {key: "SHOW_DETAILS", cursor:"9", required : "1"}
                ]
            },
            {
                content: 'Double Click',
                category: "Global",
                addition: [
                    {key: "ON_ELEMENT", cursor : "1", required : "0"},
                    {key: "NEXT_TO_ELEMENT", cursor : "2", required : "0"},
                    {key: "ON_PAGE_POSITION", cursor : "3", required : "0"},
                    {key: "ON_ELEMENT_POSITION", cursor : "4", required : "0"},
                    {key: "INSIDE_OF_ELEMENT", cursor : "5", required : "0"},
                    {key: "IS_WORKING", cursor: "6", required : "1"},
                    {key: "RETRY_INTERVAL", cursor: "7", required : "1"},
                    {key: "TIMEOUT", cursor: "8", required : "1"},
                    {key: "SHOW_DETAILS", cursor:"9", required : "1"}
                ]
            },
            {
                content: 'Verify existence "true"',
                category: "Global",
                addition: [
                    {key: "ON_ELEMENT", cursor : "1", required : "0"},
                    {key: "NEXT_TO_ELEMENT", cursor : "2", required : "0"},
                    {key: "ON_PAGE_POSITION", cursor : "3", required : "0"},
                    {key: "ON_ELEMENT_POSITION", cursor : "4", required : "0"},
                    {key: "INSIDE_OF_ELEMENT", cursor : "5", required : "0"},
                    {key: "IS_WORKING", cursor: "6", required : "1"},
                    {key: "RETRY_INTERVAL", cursor: "7", required : "1"},
                    {key: "TIMEOUT", cursor: "8", required : "1"},
                    {key: "SHOW_DETAILS", cursor:"9", required : "1"}
                ]
            },
            {
                content: 'Verify value "anyValue"',
                category: "Global",
                addition: [
                    {key: "NEXT_TO_ELEMENT", cursor : "2", required : "0"},
                    {key: "ON_PAGE_POSITION", cursor : "3", required : "0"},
                    {key: "ON_ELEMENT_POSITION", cursor : "4", required : "0"},
                    {key: "INSIDE_OF_ELEMENT", cursor : "5", required : "0"},
                    {key: "IS_WORKING", cursor: "6", required : "1"},
                    {key: "RETRY_INTERVAL", cursor: "7", required : "1"},
                    {key: "TIMEOUT", cursor: "8", required : "1"},
                    {key: "SHOW_DETAILS", cursor:"9", required : "1"}
                ]
            },
            {
                category: "§AZO",
                content: "§AZO Connect with login \"azoLogin\""
            }
        ],
        secondary: [
            {key: 'ON_LABEL', value: 'on "parentLabel;target"', repeat: false, tags: ["Global"]},
            {key: 'ON_ELEMENT', value: 'on "target|div.main:nth-of-type(1)" element', repeat: false, tags: ["Global"]},
            {key: 'NEXT_TO_LABEL', value: 'next to "parentLabel;target"', repeat: false, tags: ["Global"]},
            {key: 'NEXT_TO_ELEMENT', value: 'next to "div.main:nth-of-type(1)" element', repeat: false, tags: ["Global"]},
            {key: 'ON_PAGE_POSITION', value: 'on the "top-left" of the page', repeat: false, tags: ["Global"]},
            {key: 'ON_LABEL_POSITION', value: 'on the "top-left" of "parentLabel;target"', repeat: true, tags: ["Global"]},
            {key: 'ON_ELEMENT_POSITION', value: 'on the "top-left" of "div.main:nth-of-type(1)" element', repeat: true, tags: ["Global"]},
            {key: 'IS_WORKING', value: 'and it works "true"', repeat: false, tags: ["Global"]},
            {key: 'RETRY_INTERVAL', value: 'with "10" retry max within "100"ms interval', repeat: false, tags: ["Global"]},
            {key: 'TIMEOUT', value: 'and timeout after "10000"ms', repeat: false, tags: ["Global"]},
            {key: 'SHOW_DETAILS', value: 'and show details "details1"', repeat: false, tags: ["Global"]}
        ]
    };


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
