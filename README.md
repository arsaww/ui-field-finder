# ui-field-finder

```javascript

(function () {

        var DRAW_UTIL = {
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
                var rect1 = e1.getBoundingClientRect();
                var rect2 = e2.getBoundingClientRect();
                var area = DRAW_UTIL.getDrawingArea();
                var e = area.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "svg"));
                e.setAttributeNS(null, "height", "" + window.innerHeight);
                e.setAttributeNS(null, "width", "" + window.innerWidth);
                e.style.position = "absolute";
                e.innerHTML = "" +
                    "<defs>\n" +
                    "    <marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"6\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\" viewBox=\"0 0 15 15\">\n" +
                    "      <path d=\"M0,0 L0,6 L9,3 z\" fill=\"" + color + "\" />\n" +
                    "    </marker>\n" +
                    "</defs>\n";
                var line = e.appendChild(document.createElementNS('http://www.w3.org/2000/svg', "line"));
                line.setAttributeNS(null, "x1", "" + (rect1.x + (rect1.width / 2)));
                line.setAttributeNS(null, "y1", "" + (rect1.y + (rect1.height / 2)));
                line.setAttributeNS(null, "x2", "" + (rect2.x + (rect2.width / 2)));
                line.setAttributeNS(null, "y2", "" + (rect2.y + (rect2.height / 2)));
                line.setAttributeNS(null, "marker-end", "url(#arrow)");
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
            drawZone: function (zone, border) {
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
            },
            drawAlgorithmSelection: function (choices, finalResult) {
                if (finalResult) {
                    if (finalResult.zoneIncludes && finalResult.zoneIncludes.length > 0) {
                        for (var i = 0; i < finalResult.zoneIncludes.length; i++) {
                            var zi = finalResult.zoneIncludes[i];
                            if (zi.element) {
                                DRAW_UTIL.drawZone(zi.zone, "#00E0FF");
                                DRAW_UTIL.drawElement(zi.element, "#00E0FF", "#00E0FFAA");
                            } else {
                                DRAW_UTIL.drawZone(zi.zone, "#0000FF");
                            }
                        }
                    }
                    DRAW_UTIL.drawElement(finalResult.elements[finalResult.elements.length - 1], "#00FF00", "#00FF00AA");
                }
                DRAW_UTIL.drawElementsArray(choices, "#ffee00", "#ffee0033", "#C4B200");
            },
            drawErrorNoFinalResult: function (resultList) {
                if (resultList && resultList.length > 0) {
                    for (var i = 0; i < resultList.length; i++) {
                        var r = resultList[i];
                        if (i === 0 && r.zoneIncludes > 0) {
                            for(var j = 0; j < r.zoneIncludes.length; j++){
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
                        distance: Math.round(Math.sqrt(Math.pow(zone.source.x - (r.width / 2), 2) + Math.pow(zone.source.y - (r.height / 2), 2)))
                    };
                }
                return null;
            },
            addPrecisionsZones: function (result, precisions) {
                if (precisions && precisions.length > 0) {
                    for (var j = 0; j < precisions.length; j++) {
                        var precisionElements = document.getLabelElements(precisions[j].label);
                        if (!precisionElements || precisionElements.length === 0 || (precisionElements.length > 1 && !sameResultFoundFromLabel(precisionElements))) {
                            DRAW_UTIL.drawElementsArray(precisionElements, "#ff0000", "#ff000033", "#990000");
                            throw "ERROR : Ambiguous accuracy '" + precisions[j].position + "' of '" + precisions[j].label + "' (" + (!precisionElements ? 0 : precisionElements.length) + " occurrences : must have only 1) ! ";
                        }
                        var elementZone = precisionElements[0][precisionElements[0].length - 1];
                        var zone = ZONE_UTIL.getElementZone(elementZone, precisions[j].position);
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
                    }
                }
                console.log(inclusion);
                return inclusion;
            }

        };

        var INPUT_FIELD_CSS_QUERY_SELECTOR = "select,textarea,input:not([type]),input[type=text],input[type=number],input[type=password],input[type=date],input[type=color],input[type=file],input[type=email],input[type=url],input[type=week],input[type=time],input[type=search],input[type=range],input[type=month],input[type=datetime-local]";
        var CHECK_FIELD_CSS_QUERY_SELECTOR = "input[type=checkbox],input[type=radio]";

        var DEFAULT_NEXT_DISTANCE = 350;

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

        document.getLabelElements = function (label, closests, distance) {
            distance = distance ? distance : DEFAULT_NEXT_DISTANCE;
            var nextLabel = null;
            if (label.includes(";")) {
                var split = label.split(/;(.+)/);
                label = split[0];
                nextLabel = split[1];
            }
            var candidates = getCandidatesByXPathLabel(label).concat(getInputsByVisualValue(label));
            var result = getMostSignificantsClosestsLabel(candidates, closests, distance);
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

        document.getElementByOptions = function (options) {
            var r1 = document.getLabelElements(options["label"]);
            var resultList = ZONE_UTIL.initZoneIncludeElements(r1);
            var pz = ZONE_UTIL.getPageZone(options.pageZone);
            var finalResult = null;
            if (options.pageZone || (options.precisions && options.precisions.length > 0)) {
                ZONE_UTIL.addZoneCoverage(resultList, pz, null);
                ZONE_UTIL.addPrecisionsZones(resultList, options.precisions);
                finalResult = CALCULATION_UTIL.calculateFinalResultFromPrecisions(resultList);
            } else if (resultList.length === 1) {
                finalResult = resultList[0];
            }
            if (!finalResult) {
                DRAW_UTIL.drawErrorNoFinalResult(resultList);
            }
            if (options.showAlgorithm) {
                DRAW_UTIL.drawAlgorithmSelection(r1, finalResult);
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
/*var options = {
    "label": "Cat;Hello",
    "tag": null,
    "precisions": [{label: "Hello;Hello input 1", position: "top-left", distance: null}],
    "pageZone": "bottom-right",
    "record": true,
    "pageZoneFirst": true
};*/
var options = {
    "label": "XRP",
    "tag": null,
    "precisions": [{label: "Hong Kong", position: "top-left", distance: null}],
    "pageZone": "left",
    "showAlgorithm": true
};

document.getElementByOptions(options);


```
