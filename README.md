# ui-field-finder

```javascript

(function () {

        var INPUT_FIELD_CSS_QUERY_SELECTOR = "select,textarea,input:not([type]),input[type=text],input[type=number],input[type=password],input[type=date],input[type=color],input[type=file],input[type=email],input[type=url],input[type=week],input[type=time],input[type=search],input[type=range],input[type=month],input[type=datetime-local]";
        var CHECK_FIELD_CSS_QUERY_SELECTOR = "input[type=checkbox],input[type=radio]";

        var DEFAULT_NEXT_DISTANCE = 300;

        function xpathStringLiteral(s) {
            if (s.indexOf('"') === -1)
                return '"' + s + '"';
            if (s.indexOf("'") === -1)
                return "'" + s + "'";
            return 'concat("' + s.replace(/"/g, '",\'"\',"') + '")';
        }

        var getInputsByVisualValue = function (label) {
            var resultList = [];
            var inputs = document.querySelectorAll(INPUT_FIELD_CSS_QUERY_SELECTOR);
            if (inputs && inputs.length > 0) {
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].value.includes(label)) {
                        resultList.push(inputs[i]);
                    }
                }
            }
            return resultList;
        };

        var getCandidatesByXPathLabel = function (label) {
            return document.getElementsByXpath("//*[not(self::script) and contains(text()," + xpathStringLiteral(label) + ")]");
        };

        //NEW FORMAT


        document.getLabelElements = function (label, closests, distance) {
            distance = distance ? distance : DEFAULT_NEXT_DISTANCE;
            var nextLabel = null;
            if (label.includes(";")) {
                var split = label.split(/;(.+)/);
                label = split[0];
                nextLabel = split[1];
            }
            var candidates = getCandidatesByXPathLabel(label).concat(getInputsByVisualValue(label));

            console.log("CANDIDATES");
            console.log(candidates);
            var result = getMostSignificantsClosestsLabel(candidates, closests, distance);
            console.log("CLOSEST");
            console.log(result);
            if (nextLabel) {
                return document.getLabelElements(nextLabel, result, distance);
            } else {
                return result;
            }
        };


        var getMostSignificantsClosestsLabel = function (candidates, closests, distance) {
            distance = distance ? distance : DEFAULT_NEXT_DISTANCE;
            if (!closests) {
                closests = initClosestsCandidatesArray(candidates);
            } else {
                closests = fillClosestsCandidatesArray(candidates, closests, distance);
            }
            return closests;
        };

        var isVisible = function (element) {
            return (window.getComputedStyle(element).getPropertyValue('display') !== "none");
        };

        var fillClosestsCandidatesArray = function (candidates, closests, maxDistance) {
            maxDistance = maxDistance ? maxDistance : DEFAULT_NEXT_DISTANCE;
            for (var i = 0; i < closests.length; i++) {
                var closest = closests[i][closests[i].length - 1];
                var closestArray = closests[i];
                var bestCandidate = null;
                var bestDistance = null;
                for (var j = 0; j < candidates.length; j++) {
                    var candidate = candidates[j];
                    if (isVisible(candidate)) {
                        var distance = document.getDistanceBetweenElement(candidate, closest);
                        if (distance <= maxDistance && (bestCandidate === null || distance < bestDistance)) {
                            bestCandidate = candidate;
                            bestDistance = distance;
                        }
                    }
                }
                if (bestCandidate) closestArray.push(bestCandidate);
            }
            return closests;
        };

        var initClosestsCandidatesArray = function (candidates) {
            var closests = [];
            for (var i = 0; i < candidates.length; i++) {
                if (isVisible(candidates[i])) {
                    closests.push([candidates[i]]);
                }
            }
            return closests;
        };

        var getRectangleDistanceX = function (source, target) {
            return source.left > target.right ? source.left - target.right :
                target.left > source.right ? target.left - source.right : 0;
        };

        var getRectangleDistanceY = function (source, target) {
            return source.top > target.bottom ? source.top - target.bottom :
                target.top > source.bottom ? target.top - source.bottom : 0;
        };

        var getRectangleDistance = function (source, target) {
            var width = getRectangleDistanceX(source, target);
            var height = getRectangleDistanceY(source, target);
            return Math.sqrt((width * width) + (height * height));
        };

        var getRootInnerText = function (element) {
            if (element) {
                var child = element.firstChild;
                var texts = [];
                while (child) {
                    if (child.nodeType == 3) {
                        texts.push(child.data);
                    }
                    child = child.nextSibling;
                }
                var text = texts.join("");
                return text && text.trim() ? text.trim() : null;
            }
            return null;
        };

        var getXPathWithOccurrenceIndex = function (element, xPath) {
            var elements = document.getElementsByXpath(xPath);
            for (var i = 0; i < elements.length; i++) {
                if (elements[i] == element)
                    return "(" + xPath + ")[" + (i + 1) + "]";
            }
            return "error, element not found from the following XPath : " + xPath;
        };

        document.getElementsByXpath = function (xpath) {
            var xpathResult = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var array = [];
            for (var i = 0; i < xpathResult.snapshotLength; i++)
                array.push(xpathResult.snapshotItem(i));
            return array;
        };

        document.getDistanceBetweenElement = function (e1, e2) {
            if (e1 && e2) {
                var rect1 = e1.getBoundingClientRect();
                var rect2 = e2.getBoundingClientRect();
                return getRectangleDistance(rect1, rect2);
            }
            return null;
        };

        document.getElementUniqueXPath = function (element) {
            if (element) {
                var innerText = getRootInnerText(element);
                var attribute = element.id ? "@id='" + element.id + "' and " : "";
                attribute += element.className ? "@class='" + element.className + "' and " : "";
                attribute += element.type ? "@type='" + element.type + "' and " : "";
                attribute += element.name ? "@name='" + element.name + "' and " : "";
                attribute += innerText ? "contains(text()," + xpathStringLiteral(innerText) + ")" : "";
                attribute = attribute.endsWith(" and ") ? attribute.slice(0, -5) : attribute;
                return getXPathWithOccurrenceIndex(element, "//" + element.tagName + (attribute ? "[" + attribute + "]" : ""));
            }
            return null;
        };

        document.getElementByOption = function (options, showAlgorithm) {
            var r = document.getLabelElements(options["label"]); //TODO CLEAN RESULT
            console.log("FINAL");
            console.log(r);
            if (showAlgorithm) {
                drawAlgorithmSelection(r);
            }
        };

        var getDrawingArea = function () {
            var drawingArea = document.getElementById("drawingArea___");
            if (!drawingArea) {
                drawingArea = document.createElement("DIV");
                drawingArea.id = "drawingArea___";
                drawingArea.style.position = "fixed";
                drawingArea.style.top = "0";
                drawingArea.style.bottom = "0";
                drawingArea.style.left = "0";
                drawingArea.style.right = "0";
                drawingArea.style.zIndex = "99999";
                document.body.appendChild(drawingArea);
            }
            return drawingArea;
        };

        var drawElementsArray = function (elements, border, background) {
            for (var i = 0; i < elements.length; i++) {
                for (var j = 0; j < elements[i].length; j++) {
                    drawElement(elements[i][j], border, background)
                }
            }

        };

        var drawElement = function (element, border, background) {
            var area = getDrawingArea();
            var e = area.appendChild(document.createElement("DIV"));
            var r = element.getBoundingClientRect();
            e.style.color = "#333";
            e.style.border = "2px " + border + " solid";
            e.style.backgroundColor = background;
            e.style.position = "absolute";
            e.style.top = r.top + "px";
            e.style.height = (r.bottom - r.top) + "px";
            e.style.left = r.left + "px";
            e.style.width = (r.right - r.left) + "px";
            e.style.boxSizing = "border-box";
        };

        var drawZone = function (zone, border) {
            var area = getDrawingArea();
            var e = area.appendChild(document.createElement("DIV"));
            e.style.color = "#333";
            e.style.border = "1px " + border + " solid";
            e.style.background = "radial-gradient(at "+ (zone.source.x - zone.left) +"px "+ (zone.source.y - zone.top) +"px,"+ border +"FF,"+ border +"55,"+ border +"22,"+ border +"11)";
            e.style.position = "absolute";
            e.style.top = zone.top + "px";
            e.style.height = zone.height + "px";
            e.style.left = zone.left + "px";
            e.style.width = zone.width + "px";
            e.style.boxSizing = "border-box";
        };

        var drawAlgorithmSelection = function (choices, finalResult) {
            drawZone(getPageZone("left"),"#0000FF");
            drawElementsArray(choices, "#ffee00", "#ffee0011");
            drawElement(choices[0][choices[0].length - 1], "#00FF00", "#00FF0077");
        };

        var getPageZone = function (label) {
            var zone = {top:0,left:0,width:window.innerWidth,height:window.innerHeight,source:{x:window.innerWidth/2,y:window.innerHeight/2}};
            if(label.includes("top")){
                zone.top = 0;
                zone.source.y = 0;
                zone.height = window.innerHeight / 2;
            }else if(label.includes("bottom")){
                zone.top = window.innerHeight / 2;
                zone.source.y = window.innerHeight / 2;
                zone.height = window.innerHeight / 2;
            }
            if(label.includes("left")){
                zone.left = 0;
                zone.source.x = 0;
                zone.width = window.innerWidth / 2;
            }else if(label.includes("right")){
                zone.left = window.innerWidth / 2;
                zone.source.x = window.innerWidth / 2;
                zone.width = window.innerWidth / 2;
            }
            return zone;
        };

    }()
);

var area = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    source: {x: 0, y: 0}
};
var options = {
    "label": "Hello;Categories",
    "tag": null,
    "precisions": [{label: "settings;insight", position: "top-left", distance: null}],
    "pagePosition": "top-left",
    "record": true
};

document.getElementByOption(options, true);


```
