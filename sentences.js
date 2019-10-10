var ALLOWED_SENTENCES = [
    'I log into AZOP as the user "username" which belongs to "groupName"',
    'The element "parentLabel;target" exists "boolean"',
    'I click the element "parentLabel;target"',
    'I set the value "value" into the field related to "parentLabel;target"',
    'I click the button "buttonLabel"'
];


for (var i = 0; i < ALLOWED_SENTENCES.length; i++) {
    ALLOWED_SENTENCES[i] = ALLOWED_SENTENCES[i].replace("<", "&lt;").replace(">", "&gt;");
}

var NEW_SENTENCES =
    {
        main: [
            {
                content: 'Open url "anyUrl"',
                category: "Global",
                addition: [
                    {key: "IS_WORKING", type: "settings"},
                    {key: "RETRY_INTERVAL", type: "settings"},
                    {key: "TIMEOUT", type: "settings"}
                ]
            },
            {
                content: 'Click',
                group: 'Click',
                category: "Global",
                addition: [
                    {key: "ON_ELEMENT", type: "identification"},
                    {key: "NEXT_TO_ELEMENT", type: "identification"},
                    {key: "ON_PAGE_POSITION", type: "identification"},
                    {key: "ON_ELEMENT_POSITION", type: "identification"},
                    {key: "INSIDE_OF_ELEMENT", type: "identification"},
                    {key: "IS_WORKING", type: "settings"},
                    {key: "RETRY_INTERVAL", type: "settings"},
                    {key: "TIMEOUT", type: "settings"},
                    {key: "SHOW_DETAILS", type: "settings"}
                ]
            },
            {
                content: 'Right-Click',
                group: 'Click',
                category: "Global",
                addition: [
                    {key: "ON_ELEMENT", type: "identification"},
                    {key: "NEXT_TO_ELEMENT", type: "identification"},
                    {key: "ON_PAGE_POSITION", type: "identification"},
                    {key: "ON_ELEMENT_POSITION", type: "identification"},
                    {key: "INSIDE_OF_ELEMENT", type: "identification"},
                    {key: "IS_WORKING", type: "settings"},
                    {key: "RETRY_INTERVAL", type: "settings"},
                    {key: "TIMEOUT", type: "settings"},
                    {key: "SHOW_DETAILS", type: "settings"}
                ]
            },
            {
                content: 'Double-Click',
                group: 'Click',
                category: "Global",
                addition: [
                    {key: "ON_ELEMENT", type: "identification"},
                    {key: "NEXT_TO_ELEMENT", type: "identification"},
                    {key: "ON_PAGE_POSITION", type: "identification"},
                    {key: "ON_ELEMENT_POSITION", type: "identification"},
                    {key: "INSIDE_OF_ELEMENT", type: "identification"},
                    {key: "IS_WORKING", type: "settings"},
                    {key: "RETRY_INTERVAL", type: "settings"},
                    {key: "TIMEOUT", type: "settings"},
                    {key: "SHOW_DETAILS", type: "settings"}
                ]
            },
            {
                content: 'Set value "anyValue"',
                category: "Global",
                addition: [
                    {key: "ON_ELEMENT_POSITION", type: "identification"},
                    {key: "NEXT_TO_ELEMENT", type: "identification"},
                    {key: "ON_PAGE_POSITION", type: "identification"},
                    {key: "INSIDE_OF_ELEMENT", type: "identification"},
                    {key: "IS_WORKING", type: "settings"},
                    {key: "RETRY_INTERVAL", type: "settings"},
                    {key: "TIMEOUT", type: "settings"},
                    {key: "SHOW_DETAILS", type: "settings"}
                ]
            },
            {
                content: 'Verify value "targetValue"',
                category: "Global",
                group: "Verify",
                addition: [
                    {key: "NEXT_TO_ELEMENT", type: "identification"},
                    {key: "ON_PAGE_POSITION", type: "identification"},
                    {key: "ON_ELEMENT_POSITION", type: "identification"},
                    {key: "INSIDE_OF_ELEMENT", type: "identification"},
                    {key: "IS_WORKING", type: "settings"},
                    {key: "RETRY_INTERVAL", type: "settings"},
                    {key: "TIMEOUT", type: "settings"},
                    {key: "SHOW_DETAILS", type: "settings"}
                ]
            },
            {
                content: 'Verify values in row "targetValue1;targetValue2"',
                category: "Global",
                group: "Verify",
                addition: [
                    {key: "NEXT_TO_ELEMENT", type: "identification"},
                    {key: "ON_PAGE_POSITION", type: "identification"},
                    {key: "ON_ELEMENT_POSITION", type: "identification"},
                    {key: "INSIDE_OF_ELEMENT", type: "identification"},
                    {key: "IS_WORKING", type: "settings"},
                    {key: "RETRY_INTERVAL", type: "settings"},
                    {key: "TIMEOUT", type: "settings"},
                    {key: "SHOW_DETAILS", type: "settings"}
                ]
            },
            {
                content: 'Verify values in column "targetValue1;targetValue2"',
                category: "Global",
                group: "Verify",
                addition: [
                    {key: "NEXT_TO_ELEMENT", type: "identification"},
                    {key: "ON_PAGE_POSITION", type: "identification"},
                    {key: "INSIDE_OF_ELEMENT", type: "identification"},
                    {key: "IS_WORKING", type: "settings"},
                    {key: "RETRY_INTERVAL", type: "settings"},
                    {key: "TIMEOUT", type: "settings"},
                    {key: "SHOW_DETAILS", type: "settings"}
                ]
            },
            {
                category: "§AZO",
                content: "§AZO Connect with login \"azoLogin\""
            },
            {
                category: "§AZO",
                content: "§AZO Start a new process \"Process Name\""
            },
            {
                category: "§CMC",
                content: "§CMC Change Manager Code by BP \"133\""
            }
        ],
        secondary: [
            {key: 'ON_ELEMENT', value: 'on "target" element', tags: ["Global"]},
            {key: 'NEXT_TO_ELEMENT', value: 'next to "target" element', tags: ["Global"]},
            {key: 'ON_PAGE_POSITION', value: 'on the "top-right" of the page', tags: ["Global"]},
            {key: 'ON_ELEMENT_POSITION', value: 'on the "strict-right" of "target" element', tags: ["Global"]},
            {key: 'IS_WORKING', value: 'and it works "false"', tags: ["Global"]},
            {key: 'RETRY_INTERVAL', value: 'with "10" retry max within "100"ms interval', tags: ["Global"] },
            {key: 'TIMEOUT', value: 'and timeout after "10000"ms', tags: ["Global"]},
            {key: 'SHOW_DETAILS', value: 'and show details "screenshotName"', tags: ["Global"]}
        ]
    };
