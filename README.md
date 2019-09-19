# ui-field-finder

```javascript
(function () {
        var INPUT_FIELD_CSS_QUERY_SELECTOR = "select,textarea,input:not([type]),input[type=text],input[type=number],input[type=password],input[type=date],input[type=color],input[type=file],input[type=email],input[type=url],input[type=week],input[type=time],input[type=search],input[type=range],input[type=month],input[type=datetime-local]";
        var DRAW_UTIL = {
            ARROW_COUNTER : 0,
            drawElementsArray: function (elements, border, background, link) {
                if (elements && elements.length > 0) {
                    for (var i = 0; i < elements.length; i++) {
                        for (var j = 0; j < elements[i].length; j++) {
                            DRAW_UTIL.drawElement(elements[i][j], border, background);
                            if (j > 0) {
                                DRAW_UTIL.drawLineBetweenElements(elements[i][j - 1], elements[i][j], link);
                            }
                        }
                    }
                }
            },
            drawElement: function (element, border, background) {
                var area = DRAW_UTIL.getDrawingArea();
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
            },
            drawLineBetweenElements: function (e1, e2, color) {
                DRAW_UTIL.ARROW_COUNTER = DRAW_UTIL.ARROW_COUNTER+1;
                var rect1 = e1.getBoundingClientRect();
                var rect2 = e2.getBoundingClientRect();
                var area = DRAW_UTIL.getDrawingArea();
                var e = area.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "svg"));
                e.setAttributeNS(null, "height", "" + window.innerHeight);
                e.setAttributeNS(null, "width", "" + window.innerWidth);
                e.style.position = "absolute";
                e.innerHTML = "" +
                    "<defs>\n" +
                    "    <marker id=\"arrow-"+ DRAW_UTIL.ARROW_COUNTER +"\" markerWidth=\"10\" markerHeight=\"10\" refX=\"6\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\" viewBox=\"0 0 15 15\">\n" +
                    "      <path d=\"M0,0 L0,6 L9,3 z\" fill=\"" + color + "\" />\n" +
                    "    </marker>\n" +
                    "</defs>\n";
                var line = e.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "line"));
                line.setAttributeNS(null, "x1", "" + (rect1.x + (rect1.width / 2)));
                line.setAttributeNS(null, "y1", "" + (rect1.y + (rect1.height / 2)));
                line.setAttributeNS(null, "x2", "" + (rect2.x + (rect2.width / 2)));
                line.setAttributeNS(null, "y2", "" + (rect2.y + (rect2.height / 2)));
                line.setAttributeNS(null, "marker-end", "url(#arrow-"+DRAW_UTIL.ARROW_COUNTER+")");
                line.style.stroke = color;
                line.style.strokeWidth = "2";
            },
            getDrawingArea: function () {
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
            },
            drawZone: function (zone, border, coverage, distance) {
                var area = DRAW_UTIL.getDrawingArea();
                var e = area.appendChild(document.createElement("DIV"));
                e.style.color = "#333";
                e.style.border = "1px " + border + " solid";
                e.style.background = "radial-gradient(at " + (zone.source.x - zone.left) + "px " + (zone.source.y - zone.top) + "px," + border + "FF," + border + "77," + border + "22," + border + "01)";
                e.style.position = "absolute";
                e.style.top = zone.top + "px";
                e.style.height = zone.height + "px";
                e.style.left = zone.left + "px";
                e.style.width = zone.width + "px";
                e.style.boxSizing = "border-box";
                if(coverage || distance){
                    var i = area.appendChild(document.createElement("DIV"));
                    i.style.color = "black";
                    i.style.fontFamily = "monospace";
                    i.style.fontSize = "9px";
                    i.style.background = "#d6faff";
                    i.style.position = "absolute";
                    i.style.border = "1px "+ border +" dashed";
                    i.style.top = ((zone.source.y+30) < window.innerHeight ? zone.source.y : window.innerHeight - 30) + "px";
                    i.style.left = ((zone.source.x+250) < window.innerWidth ? zone.source.x : window.innerWidth - 250) + "px";
                    i.style.padding = "2px";
                    i.style.zIndex = "9999999999999999";
                    i.innerHTML = "Target is " + coverage + "% covered by zone <br /> There is "+ distance + "px distance from the zone source";
                }
            },
            drawAlgorithmSelection: function (choices, nextTo, finalResult, found) {
                if (finalResult) {
                    if (finalResult.zoneIncludes && finalResult.zoneIncludes.length > 0) {
                        for (var i = 0; i < finalResult.zoneIncludes.length; i++) {
                            var zi = finalResult.zoneIncludes[i];
                            if (zi.element) {
                                DRAW_UTIL.drawZone(zi.zone, "#00E0FF", found ? zi.coverage : null, found ? zi.distance : null);
                                DRAW_UTIL.drawElement(zi.element, "#00E0FF", "#00E0FFAA");
                            } else {
                                DRAW_UTIL.drawZone(zi.zone, "#0000FF", found ? zi.coverage : null, found ? zi.distance : null);
                            }
                        }
                    }
                    if(found) DRAW_UTIL.drawElement(finalResult.elements[finalResult.elements.length - 1], "#00FF00", "#00FF00AA");
                }else if(choices && choices.length > 0){

                }
                DRAW_UTIL.drawElementsArray(choices, "#ffee00", "#ffee0033", "#C4B200");
                DRAW_UTIL.drawElementsArray(nextTo, "#e5c8ff", "#e5c8ff33", "#776689");
            },
            drawErrorNoFinalResult: function (resultList) {
                if (resultList && resultList.length > 0) {
                    for (var i = 0; i < resultList.length; i++) {
                        var r = resultList[i];
                        if (i === 0 && r.zoneIncludes > 0) {
                            for (var j = 0; j < r.zoneIncludes.length; j++) {
                                var zi = r.zoneIncludes[j];
                                DRAW_UTIL.drawZone(zi.zone, "#ff7600");
                                DRAW_UTIL.drawElement(zi.element, "#ff0000", "#ff000033");
                            }
                        }
                        DRAW_UTIL.drawElementsArray([].concat(r.elements), "#ff0000", "#ff000033", "#990000");
                    }
                }
                throw "ERROR : No matching result found!";
            }
        };

        var sameResultFoundFromLabel = function (arr) {
            if (arr && arr.length > 0) {
                var e = null;
                for (var i = 0; i < arr.length; i++) {
                    if (e === null) {
                        e = document.getElementUniqueXPath(arr[i][arr[i].length - 1]);
                    } else {
                        if (e !== document.getElementUniqueXPath(arr[i][arr[i].length - 1]))
                            return false;
                    }
                }
            }
            return true;
        };

        var ZONE_UTIL = {
            initZoneIncludeElements: function (arr) {
                var result = [];
                if (arr && arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        result.push({
                            elements: arr[i],
                            zoneIncludes: []
                        });
                    }
                }
                return result;
            },
            addZoneCoverage: function (arr, zone, elementZone) {
                if (arr && arr.length > 0 && zone) {
                    for (var i = 0; i < arr.length; i++) {
                        arr[i].zoneIncludes.push(
                            ZONE_UTIL.getSurfaceSurfaceInsideZone(arr[i].elements[arr[i].elements.length - 1], zone, elementZone)
                        );
                    }
                }
                return arr;
            },
            getSurfaceSurfaceInsideZone: function (e, zone, elementZone) {
                if (e && zone) {
                    var r = e.getBoundingClientRect();
                    var top = zone.top > r.top ? zone.top < (r.top + r.height) ? zone.top : (r.top + r.height) : r.top;
                    var bottom = (zone.top + zone.height) < (r.top + r.height) ? (zone.top + zone.height) > r.top ? (zone.top + zone.height) : r.top : (r.top + r.height);
                    var left = zone.left > r.left ? zone.left < (r.left + r.width) ? zone.left : (r.left + r.width) : r.left;
                    var right = (zone.left + zone.width) < (r.left + r.width) ? (zone.left + zone.width) > r.left ? (zone.left + zone.width) : r.left : (r.left + r.width);
                    return {
                        zone: zone,
                        element: elementZone ? elementZone : null,
                        coverage: Math.round((((bottom - top) * (right - left)) * 100) / (r.width * r.height)),
                        distance: Math.round(Math.sqrt(Math.pow(zone.source.x - ((r.width / 2)+ r.left), 2) + Math.pow(zone.source.y - ((r.height / 2)+ r.top), 2)))
                    };
                }
                return null;
            },
            addPrecisionsZoneByLabel: function (result, options) {
                var precisionElements = document.getLabelElements(options.ON_LABEL_POSITION.value ? options.ON_LABEL_POSITION.value : null);
                if (precisionElements && precisionElements.length > 0) {
                    for (var j = 0; j < precisionElements.length; j++) {
                        if (!precisionElements || precisionElements.length === 0 || precisionElements.length > 1) {
                            DRAW_UTIL.drawElementsArray(precisionElements, "#ff0000", "#ff000033", "#990000");
                            throw "ERROR : Ambiguous accuracy '" + options.ON_LABEL_POSITION.position + "' of '" + options.ON_LABEL_POSITION.value + "' (" + (!precisionElements ? 0 : precisionElements.length) + " occurrences : must have only 1) ! ";
                        }
                        var elementZone = precisionElements[0][precisionElements[0].length - 1];
                        var zone = ZONE_UTIL.getElementZone(elementZone, options.ON_LABEL_POSITION.position);
                        ZONE_UTIL.addZoneCoverage(result, zone, elementZone);
                    }
                }
            },
            addPrecisionsZoneByQuery: function (result, options) {
                var precisionElements = document.getLabelElements(null, options.ON_ELEMENT_POSITION.value ? options.ON_ELEMENT_POSITION.value : null);
                if (precisionElements && precisionElements.length > 0) {
                    for (var j = 0; j < precisionElements.length; j++) {
                        if (!precisionElements || precisionElements.length === 0 || precisionElements.length > 1) {
                            DRAW_UTIL.drawElementsArray(precisionElements, "#ff0000", "#ff000033", "#990000");
                            throw "ERROR : Ambiguous accuracy '" + options.ON_ELEMENT_POSITION.position + "' of '" + options.ON_ELEMENT_POSITION.value + "' (" + (!precisionElements ? 0 : precisionElements.length) + " occurrences : must have only 1) ! ";
                        }
                        var elementZone = precisionElements[0][precisionElements[0].length - 1];
                        var zone = ZONE_UTIL.getElementZone(elementZone, options.ON_ELEMENT_POSITION.position);
                        ZONE_UTIL.addZoneCoverage(result, zone, elementZone);
                    }
                }
            },
            getElementZone: function (element, label) {
                if (element && label) {
                    var rect = element.getBoundingClientRect();
                    var zone = {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        source: {x: (rect.left + (rect.width / 2)), y: (rect.top + (rect.height / 2))}
                    };
                    if (label.includes("top")) {
                        zone.top = 0;
                        zone.height = zone.source.y;
                    } else if (label.includes("bottom")) {
                        zone.top = zone.source.y;
                        zone.height = window.innerHeight - zone.source.y;
                    }
                    if (label.includes("left")) {
                        zone.left = 0;
                        zone.width = zone.source.x;
                    } else if (label.includes("right")) {
                        zone.left = zone.source.x;
                        zone.width = window.innerWidth - zone.source.x;
                    }
                    return zone;
                }
                return null;
            },
            getPageZone: function (label) {
                if (label) {
                    var zone = {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        source: {x: window.innerWidth / 2, y: window.innerHeight / 2}
                    };
                    if (label.includes("top")) {
                        zone.top = 0;
                        zone.source.y = 0;
                        zone.height = window.innerHeight / 2;
                    } else if (label.includes("bottom")) {
                        zone.top = window.innerHeight / 2;
                        zone.source.y = window.innerHeight;
                        zone.height = window.innerHeight / 2;
                    }
                    if (label.includes("left")) {
                        zone.left = 0;
                        zone.source.x = 0;
                        zone.width = window.innerWidth / 2;
                    } else if (label.includes("right")) {
                        zone.left = window.innerWidth / 2;
                        zone.source.x = window.innerWidth;
                        zone.width = window.innerWidth / 2;
                    }
                    return zone;
                }
                return null;
            }
        };

        var CALCULATION_UTIL = {

            calculateFinalResultFromPrecisions: function (resultList) {
                var bestResult = null;
                var bestZoneInclusion = null;
                if (resultList && resultList.length > 0) {
                    for (var i = 0; i < resultList.length; i++) {
                        var zoneInclusion = CALCULATION_UTIL.calculateTotalZoneInclusion(resultList[i]);
                        console.log("COVERAGE =");
                        console.log(zoneInclusion.coverage);
                        if (zoneInclusion.coverage > 0 && (bestResult == null ||
                            zoneInclusion.coverage > bestZoneInclusion.coverage ||
                            (zoneInclusion.coverage === bestZoneInclusion.coverage && zoneInclusion.distance < bestZoneInclusion.distance))) {
                            bestZoneInclusion = zoneInclusion;
                            bestResult = resultList[i];
                        }
                    }
                }
                return bestResult;
            },
            calculateTotalZoneInclusion: function (result) {
                var inclusion = {distance: 0, coverage: 0};
                if (result.zoneIncludes && result.zoneIncludes.length > 0) {
                    for (var i = 0; i < result.zoneIncludes.length; i++) {
                        inclusion.distance += result.zoneIncludes[i].distance;
                        inclusion.coverage += result.zoneIncludes[i].coverage;
                        if(result.zoneIncludes[i].coverage === 0){
                            return {distance: 0, coverage: 0};
                        }
                    }
                }
                return inclusion;
            }
        };


        var CHECK_FIELD_CSS_QUERY_SELECTOR = "input[type=checkbox],input[type=radio]";

        var DEFAULT_NEXT_DISTANCE = 250;

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
                    if (inputs[i].value.includes(label) && isVisible(inputs[i])) {
                        resultList.push(inputs[i]);
                    }
                }
            }
            return resultList;
        };

        var getCandidatesByXPathLabel = function (label) {
            return document.getElementsByXpath("//*[not(self::script) and not(self::option) and contains(text()," + xpathStringLiteral(label) + ")]");
        };

        var removeClosestsNotInQuery = function (cssQuery,closests){
            var list = Array.prototype.slice.call(document.querySelectorAll(cssQuery));
            if(closests && closests.length > 0){
                for(var i = 0; i < closests.length; i ++){
                    if(list.indexOf(closests[i][closests[i].length - 1]) === -1){
                        closests.splice(i, 1);
                        i--;
                    }
                }
            }else{
                closests = [];
                for(var i = 0; i < list.length; i ++) {
                    closests.push([list[i]]);
                }
            }
            return closests;
        };

        document.getLabelElements = function (label, querySelector, closests, distance) {
            distance = distance ? distance : DEFAULT_NEXT_DISTANCE;
            var nextLabel = null;
            var candidates = null;
            var result = null;
            if (label) {
                if (label.includes(";")) {
                    var split = label.split(/;(.+)/);
                    label = split[0];
                    nextLabel = split[1];
                }
                candidates = getCandidatesByXPathLabel(label).concat(getInputsByVisualValue(label));
                if(label.includes(" ")){
                    candidates = candidates.concat(getCandidatesByXPathLabel(label.replace(" ","&nbsp;")));
                }
                result = getMostSignificantsClosestsLabel(candidates, closests, distance);
            } else if (querySelector) {
                result = removeClosestsNotInQuery(querySelector,closests);
                querySelector = null;
            }
            if (nextLabel || querySelector) {
                return document.getLabelElements(nextLabel, querySelector, result, distance);
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
                    if (isVisible(candidate) && !closests[i].includes(candidate)) {
                        var distance = document.getDistanceBetweenElement(candidate, closest);
                        if (distance <= maxDistance && (bestCandidate === null || distance < bestDistance)) {
                            bestCandidate = candidate;
                            bestDistance = distance;
                        }
                    }
                }
                if (bestCandidate) closestArray.push(bestCandidate);
                else {
                    closests.splice(i, 1);
                    i--;
                }
            }
            return closests;
        };

        var initClosestsCandidatesArray = function (candidates) {
            var closests = [];
            if (candidates) {
                for (var i = 0; i < candidates.length; i++) {
                    if (isVisible(candidates[i])) {
                        closests.push([candidates[i]]);
                    }
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
                    if (child.nodeType === 3) {
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
                if (elements[i] === element)
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

        var filterNextToElements = function(targets,nextToTargets){
            if(targets && targets.length > 0 && nextToTargets && nextToTargets.length > 0){
                for(var i = 0 ; i < targets.length; i++){
                    var nextTo = false;
                    for(var j = 0; j < nextToTargets.length; j++){
                        if(document.getDistanceBetweenElement(targets[i][targets[i].length - 1], nextToTargets[j][nextToTargets[j].length - 1]) <= DEFAULT_NEXT_DISTANCE){
                            nextTo = true;
                            break;
                        }
                    }
                    if(!nextTo){
                        targets.splice(i, 1);
                        i--;
                    }
                }
            }
            return targets;
        };

        document.getElementByOptions = function (options) {
            var targets = document.getLabelElements(options.ON_LABEL, options.ON_ELEMENT);
            var nextToTargets = document.getLabelElements(options.NEXT_TO_LABEL, options.NEXT_TO_ELEMENT);
            targets = filterNextToElements(targets,nextToTargets);
            var resultList = ZONE_UTIL.initZoneIncludeElements(targets);
            if(options.ON_PAGE_POSITION){
                var pz = ZONE_UTIL.getPageZone(options.ON_PAGE_POSITION);
                ZONE_UTIL.addZoneCoverage(resultList, pz);
            }
            if(options.ON_ELEMENT_POSITION){
                ZONE_UTIL.addPrecisionsZoneByQuery(resultList, options);
            }
            if(options.ON_PAGE_POSITION){
                ZONE_UTIL.addPrecisionsZoneByLabel(resultList, options);
            }
            CALCULATION_UTIL.calculateFinalResultFromPrecisions(resultList);

            var finalResult = CALCULATION_UTIL.calculateFinalResultFromPrecisions(resultList);

            if (options.SHOW_DETAILS) {
                DRAW_UTIL.drawAlgorithmSelection(targets, nextToTargets,
                    finalResult ? finalResult :
                        resultList && resultList.length > 0 ? resultList[0] : null,
                    finalResult ? true : false);
            }
            return finalResult;
        };
    }()
);

var area = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    source: {x: 0, y: 0}
};

var options = {
    "ON_LABEL": "masquer;Tweet",
    "ON_ELEMENT": "li a",
    "NEXT_TO_LABEL": "tendances;Utiliser Twitter",
    "NEXT_TO_ELEMENT": ".has-hover",
    "ON_PAGE_POSITION": "top-left",
    "ON_LABEL_POSITION": { value : "Bloquer et masquer;propos du blocage", position : "left"},
    "ON_ELEMENT_POSITION": { value : "h1", position : "left"},
    "SHOW_DETAILS": true
};


document.getElementByOptions(options);

/** NEW SENTENCES **/

var NEW_SENTENCES =
    {
        main: [
            {
                content: 'Open the url "www.google.com"',
                cursorRequired : '1',
                addition: [
                    {key: "IS_WORKING", range: "1,2,3,4", cursor: "5"},
                    {key: "RETRY_INTERVAL", range: "1,2,3,4,5", cursor: "6"},
                    {key: "TIMEOUT", range: "1.2,3,4,5,6", cursor: "7"},
                    {key: "SHOW_DETAILS", range: "1,2,3,4,5,6,7", cursor:"8"}
                ]
            },
            {
                content: 'Set value "anyValue"',
                cursorRequired : '2',
                addition: [
                    {key: "ON_LABEL", range: "1", cursor : "2"},
                    {key: "ON_ELEMENT", range: "1", cursor : "2"},
                    {key: "NEXT_TO_LABEL", range: "2", cursor : "2"},
                    {key: "NEXT_TO_ELEMENT", range: "2", cursor : "2"},
                    {key: "ON_PAGE_POSITION", range: "2,3", cursor : "3"},
                    {key: "ON_LABEL_POSITION", range: "2,3", cursor : "4"},
                    {key: "ON_ELEMENT_POSITION", range: "2,3", cursor : "4"},
                    {key: "IS_WORKING", range: "2,3,4", cursor: "5"},
                    {key: "RETRY_INTERVAL", range: "2,3,4,5", cursor: "6"},
                    {key: "TIMEOUT", range: "2,3,4,5,6", cursor: "7"},
                    {key: "SHOW_DETAILS", range: "2,3,4,5,6,7", cursor:"8"}
                ]
            },
            {content: 'Verify value "anyValue"'},
            {content: 'Verify existence "true"'},
            {content: 'Click'},
            {content: 'Right-Click'},
            {content: 'Double-Click'}
        ],
        secondary: [
            {key: 'ON_LABEL', value: 'on "parentLabel;target"', repeat: false, tags: ["Global"]},
            {key: 'ON_ELEMENT', value: 'on "div.main:nth-of-type(1)" element', repeat: false, tags: ["Global"]},
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


```
