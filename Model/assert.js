/*
jshint esversion:6, jshint asi:true
*/
/**
* Assert
*
* @class Assert
* @constructor
*/
class Assert {
	/**
	* Class Constructor
	*
	* @method Constructor
	* @param {string} content
	* @param {string} content2
	* @param {TestItem} newParent
	* @param {boolean} not
	* @param {string} matcher
	*/
	constructor (content="", content2="", newParent = "None", not=false, matcher="toBe"){
		this.id = idGenerator()
		this.content = content
		this.content2 = content2
		this.parent = newParent
		this.type = "Assert"
		this.not = not
		this.matcher = matcher
	}

	/**
  * Returns this testitems html output
  *
  * @method toHTMLString
  * @param {boolean} outerDiv
	* @return {string} resultStr
  */
	toHTMLString(outerDiv = true){
		let backColour = 240-(this.findIndent() * 22)
		var index = this.parent.allMyChildren.findIndex(x => x.id == this.id)
		if (backColour < 40) backColour = 40
		if (outerDiv){
			var newText = "<div ondrop='theController.myView.drop(event)' ondragend='theController.myView.dragEndCheck()' ondragstart='theController.myView.drag(event)' ondragover='theController.myView.allowDrop(event)' draggable='true' class='"+this.type+" TestItem' style='background-color:rgb("+backColour+", "+backColour+", "+backColour+")' id='" + this.id + "'>"
		}
		else{
			var newText = ""
		}
		newText += '<div class="dropdown"><button class="dropbtn">⇓</button><div class="dropdown-content">'

		newText += '<a class="btnDelete">Delete</a>'
		newText += '<a class="btnClone">Clone</a>'
		newText += '<a class="btnCopy">Copy</a>'
		newText += '<a class="btnCut">Cut</a>'

		if (this.parent !== "None"){
			//up
			if (index !== 0) newText += "<a title='Move object up' href='javascript:;' onclick='theController.myModel.find(\"" + this.id + "\").moveUp()'>Move Up</a>"
			//down
			if (index !== (this.parent.allMyChildren.length - 1)) newText += "<a title='Move object down' href='javascript:;' onclick='theController.myModel.find(\"" + this.id + "\").moveDown()' >Move Down</a>"
		}

		newText += '</div></div>'
		newText += " " + theController.myModel.currentLanguage.assert + "&nbsp;&nbsp;" + "(<input  class='input' draggable='false' onmousedown='theController.myView.changeDrag(false, true)' onmouseup='theController.myView.changeDrag(true, false)' onmouseleave='theController.myView.changeDrag(true)' id='" + this.id + "t1' type='text' value='" + this.content.replace(/\'/g,"&#8217;") + "'></input>)"
		newText += "<span>.</span><select  id='"+this.id+"d1' onchange='theController.myView.assertDropdown(this)'>"
		newText += "<option onmousedown='return false' disabled>Select...</option>"
		newText += "<option onmousedown='return false' value='not'>not</option>"
		newText += "<option onmousedown='return false' value='toBe'>toBe</option>"
		newText += "<option onmousedown='return false' draggable='false' value='toEqual'>toEqual</option>"
		newText += "<option onmousedown='return false' value='toMatch'>toMatch</option>"
		newText += "<option onmousedown='return false' value='toBeDefined'>toBeDefined</option>"
		newText += "<option onmousedown='return false' value='toBeUndefined'>toBeUndefined</option>"
		newText += "<option onmousedown='return false' value='toBeNull'>toBeNull</option>"
		newText += "<option onmousedown='return false' value='toBeTruthy'>toBeTruthy</option>"
		newText += "<option onmousedown='return false' value='toBeFalsy'>toBeFalsy</option>"
		newText += "<option onmousedown='return false' value='toContain'>toContain</option>"
		newText += "<option onmousedown='return false' value='toBeLessThan'>toBeLessThan</option>"
		newText += "<option onmousedown='return false' value='toBeGreaterThan'>toBeGreaterThan</option>"
		newText += "<option onmousedown='return false' value='toBeCloseTo'>toBeCloseTo</option>"
		newText += "<option onmousedown='return false' value='toThrow'>toThrow</option>"
		newText += "<option onmousedown='return false' value='toThrowError'>toThrowError</option>"
		newText += "</select>"

		if(this.not){
			newText += "<span>.</span><select id='"+this.id+"d2' onchange='theController.myView.assertDropdown(this)'>"

			newText += '<option onmousedown="return false" disabled>Select...</option>'
			newText += "<option onmousedown='return false' value='toBe'>toBe</option>"
			newText += "<option onmousedown='return false' value='toEqual'>toEqual</option>"
			newText += "<option onmousedown='return false' value='toMatch'>toMatch</option>"
			newText += "<option onmousedown='return false' value='toBeDefined'>toBeDefined</option>"
			newText += "<option onmousedown='return false' value='toBeUndefined'>toBeUndefined</option>"
			newText += "<option onmousedown='return false' value='toBeNull'>toBeNull</option>"
			newText += "<option onmousedown='return false' value='toBeTruthy'>toBeTruthy</option>"
			newText += "<option onmousedown='return false' value='toBeFalsy'>toBeFalsy</option>"
			newText += "<option onmousedown='return false' value='toContain'>toContain</option>"
			newText += "<option onmousedown='return false' value='toBeLessThan'>toBeLessThan</option>"
			newText += "<option onmousedown='return false' value='toBeGreaterThan'>toBeGreaterThan</option>"
			newText += "<option onmousedown='return false' value='toBeCloseTo'>toBeCloseTo</option>"
			newText += "<option onmousedown='return false' value='toThrow'>toThrow</option>"
			newText += "<option onmousedown='return false' value='toThrowError'>toThrowError</option>"
			newText += "</select>"
		}
		if (this.matcher === "toBe" || this.matcher === "toEqual" || this.matcher === "toMatch" || this.matcher === "toContain" || this.matcher === "toBeLessThan" || this.matcher === "toBeGreaterThan" || this.matcher === "toBeCloseTo" || this.matcher === "toThrowError"){
			newText += "(<input class='input' draggable='false' onmousedown='theController.myView.changeDrag(false, true)' onmouseup='theController.myView.changeDrag(true, false)' onmouseleave='(theController.myView.changeDrag(true))' id='" + this.id + "t2' type='text' value='" + this.content2.replace(/\'/g,"&#8217;") + "'></input>)"
		}
		else newText += "( )"


		if (outerDiv){
			newText += "</div>"
		}
		return newText
	}

	/**
  * Sets currentDropDown
  *
  * @method setCurrentDropdown
  */
	setCurrentDropdown(){
		console.log('setdropdown')
		console.log(this)

		if (this.not){
			console.log('not')
			var dropdwn = document.getElementById(this.id+"d2")
			for (var i = 0; i < dropdwn.options.length; i++) {
				if (dropdwn.options[i].text === this.matcher) {
					dropdwn.selectedIndex = i
					break
				}
			}
			dropdwn = document.getElementById(this.id+"d1")
			dropdwn.selectedIndex = 1
		}
		else{
			console.log('normal')
			var dropdwn = document.getElementById(this.id+"d1")
			console.log(dropdwn)
			for (var i of dropdwn.options) {
				if (i.value === this.matcher) {
					dropdwn.value = i.value
					break
				}
			}
		}
	}

	/**
  * Ouputs this testitems html
  *
  * @method toHTML
  * @param {TestItem} parent
  */
	toHTML(Parent){
		theController.outputToDiv(Parent, this.toHTMLString())
		theController.myView.setItemClickListeners(this.id)
	}

	/**
  * Returns this testitems string output
  *
  * @method toString
  * @param {int} tabNum
	* @return {string} resultStr
  */
	toString (tabNum) {
        let tab = "    "
		if (this.matcher === "toBe" || this.matcher === "toEqual" || this.matcher === "toMatch" || this.matcher === "toContain" || this.matcher === "toBeLessThan" || this.matcher === "toBeGreaterThan" || this.matcher === "toBeCloseTo" || this.matcher === "toThrowError"){
			if (this.not){
				var resultStr = tab.repeat(tabNum) + theController.myModel.currentLanguage.assert + "(" + this.content + ").not" + '.' + this.matcher + "(" + this.content2 + ")"
			}
			else{
				var resultStr = tab.repeat(tabNum) + theController.myModel.currentLanguage.assert + "(" + this.content + ")" + '.' + this.matcher + "(" + this.content2 + ")"
			}
		}
		else{
			if (this.not){
				var resultStr = tab.repeat(tabNum) + theController.myModel.currentLanguage.assert + "(" + this.content + ").not" + '.' + this.matcher + "()"
			}
			else{
				var resultStr = tab.repeat(tabNum) + theController.myModel.currentLanguage.assert + "(" + this.content + ")" + '.' + this.matcher + "()"
			}

		}
        return resultStr + ";"
    }

	/**
	* Moves this assert up
	*
	* @method moveUp
	*/
	moveUp(){
		let index = this.parent.allMyChildren.findIndex(x => x.id == this.id)
		if (index !== 0){
			let temp = this.parent.allMyChildren[index-1]
			this.parent.allMyChildren[index-1] = this.parent.allMyChildren[index]
			this.parent.allMyChildren[index] = temp
		}
		theController.updateDisplay()
	}

	/**
	* Moves this assert down
	*
	* @method moveDown
	*/
	moveDown(){
		let index = this.parent.allMyChildren.findIndex(x => x.id == this.id)
		if (index != this.parent.allMyChildren.length-1){
			let temp = this.parent.allMyChildren[index+1]
			this.parent.allMyChildren[index+1] = this.parent.allMyChildren[index]
			this.parent.allMyChildren[index] = temp
		}
		theController.updateDisplay()
	}

	dropdownSelected(value, isFirstDropdwn){
		if (isFirstDropdwn){
			this.not = false
		}
		this.matcher = value
		theController.myView.setToDiv(this.id, this.toHTMLString(false))
		this.setCurrentDropdown()
		theController.setButtonOnlicks()
	}

	notSelected(){
		this.not = true
		theController.myView.setToDiv(this.id, this.toHTMLString(false))
		theController.setButtonOnlicks()
		this.setCurrentDropdown()
	}

	/**
	* Finds the current indent
	*
	* @method findIndent
	* @return {int} depth
	*/
	findIndent(){
		let current = this,
		depth = 0
		while (typeof current.parent != "string"){
			depth++
			current = current.parent
		}
		return depth
	}
}
