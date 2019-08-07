# ui-field-finder

```javascript
(function () {

    var TEXT_FIELD_CSS_QUERY_SELECTOR = "textarea,input:not([type]),input[type=text],input[type=number],input[type=password],input[type=date],input[type=color],input[type=file],input[type=email],input[type=url],input[type=week],input[type=time],input[type=search],input[type=range],input[type=month],input[type=datetime-local]";
    var CHECK_FIELD_CSS_QUERY_SELECTOR = "input[type=checkbox],input[type=radio]";

    document.getLabelElement = function (label) {
        var result = null;
        var array = document.getElementsByXpath("//*[contains(text(),'" + label + "')]");
        for (var i = 0; i < array.length; i++) {
            result = !(result == null ||
                result.innerText.length > array[i].innerText.length ||
                (result.innerText.length == array[i].innerText.length && result.getBoundingClientRect().y > array[i].getBoundingClientRect().y)) ? result : array[i];
        }
        return result;
    };

    var getRectangleDistanceX = function (source, target) {
        return source.left > target.right ? source.left - target.right :
            target.left > source.right ? target.left - source.right : 0;
    };

    var getRectangleDistanceY = function (source, target) {
        return source.top > target.bottom ? source.top - target.bottom :
            target.top > source.bottom ? target.top - source.bottom : 0;
    };

    var getRectangleDistance = function(source, target){
        var width = getRectangleDistanceX(source, target);
        var height = getRectangleDistanceY(source, target);
        return Math.sqrt((width * width) + (height * height));
    };

    var getClosestField = function(label,fieldList){
        var closestField = null, closestDistance= null;
        if(fieldList && fieldList.length > 0){
            for(var i = 0; i < fieldList.length; i++){
                var field = fieldList[i];
                if(window.getComputedStyle(field).getPropertyValue('display') != "none"){
                    var distance = document.getDistanceBetweenElement(label,field);
                    console.log(i + " -> " + distance);
                    console.log(field);
                    if(closestField == null|| distance <= closestDistance){
                        closestField = field;
                        closestDistance = distance;
                    }
                }
            }
        }
        return closestField;
    };
	
	var getRootInnerText = function(element){
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
	
	var getXPathWithOccurrenceIndex = function(element, xPath){
		var elements = document.getElementsByXpath(xPath);
		for(var i = 0; i < elements.length; i++){
			if(elements[i] == element)
				return "(" + xPath + ")[" + (i+1) + "]";
		}
		return "error, element not found from the following XPath : " + xPath;
	}

    document.getElementsByXpath = function (xpath) {
        var xpathResult = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var array = [];
        for (var i = 0; i < xpathResult.snapshotLength; i++)
            array.push(xpathResult.snapshotItem(i))
        return array;
    };

    document.getElementTextFieldFromLabel = function (label) {
        return getClosestField(document.getLabelElement(label),document.querySelectorAll(TEXT_FIELD_CSS_QUERY_SELECTOR));
    };

    document.getElementCheckFieldFromLabel = function (label) {
        return getClosestField(document.getLabelElement(label),document.querySelectorAll(CHECK_FIELD_CSS_QUERY_SELECTOR));
    };

    document.getDistanceBetweenElement = function (e1, e2) {
        var rect1 = e1.getBoundingClientRect();
        var rect2 = e2.getBoundingClientRect();
        return getRectangleDistance(rect1, rect2);
    };
	
	document.getElementUniqueXPath = function(element){
		var innerText = getRootInnerText(element);
		var attribute = element.id ? "@id='"+ element.id +"' and " : "";
		attribute += element.className ? "@class='"+ element.className +"' and " : "";
		attribute += innerText ? "contains(text(),'"+ innerText +"')" : "";
		attribute = attribute.endsWith(" and ") ? attribute.slice(0,-5) : attribute ;
		return getXPathWithOccurrenceIndex(element,"//" + element.tagName + (attribute ? "[" + attribute + "]" : "")); 
	}

}());

/* Exemple : */
document.getElementTextFieldFromLabel("any text");
```
