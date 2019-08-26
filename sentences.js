

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

