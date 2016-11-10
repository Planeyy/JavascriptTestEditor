/*
jshint esversion:6, jshint asi:true
*/
class Setup extends Suite{
	constructor (newParent) {
		super("", newParent)
		this.type = "Setup"
	}

	toHTML(Parent){
		if (this.type === "BeforeEach") var name = theController.myModel.currentLanguage.beforeEach
		else if (this.type === "AfterEach") var name = theController.myModel.currentLanguage.afterEach
		else var name = this.type
		let backColour = 240-(this.findIndent() * 22)
		var index = this.parent.allMyChildren.findIndex(x => x.id == this.id)

		if (backColour < 40) backColour = 40

		var newText = "<div ondrop='theController.myView.drop(event)' ondragend='theController.myView.dragEndCheck()' ondragstart='theController.myView.drag(event)' ondragover='theController.myView.allowDrop(event)' draggable='true' class='Setup TestItem' style='background-color:rgb("+backColour+", "+backColour+", "+backColour+")' id='" + this.id + "'>"
		newText += '<div class="dropdown setupBtn"><button class="dropbtn">⇓</button><div class="dropdown-content">'
		newText += '<a class="btnDelete" >Delete</a>'
		newText += '<a class="btnAddMisc" >Add code</a>'
		newText += '<a class="btnCopy">Copy</a>'
		newText += '<a class="btnCut">Cut</a>'
		newText += '<a class="btnPaste">Paste</a>'

		if (this.parent !== "None"){
			//up
			if (index !== 0) newText += "<a title='Move object up' href='javascript:;' onclick='theController.myModel.find(\"" + this.id + "\").moveUp()'>Move Up</a>"
			//down
			if (index !== (this.parent.allMyChildren.length - 1)) newText += "<a title='Move object down' href='javascript:;' onclick='theController.myModel.find(\"" + this.id + "\").moveDown()' >Move Down</a>"
		}
		newText += '</div></div>'
		newText += " " + '<span class="setupName">' + name +'</span>'
		theController.outputToDiv(Parent, newText)
		if(this.hasOwnProperty("allMyChildren")){
			for (let baby of this.allMyChildren){
				baby.toHTML(this.id)
			}
		}
		theController.myView.setItemClickListeners(this.id)
	}

	toString (tabNum) {
	    let tab = "    "
		if (this.type === "BeforeEach") var name = theController.myModel.currentLanguage.beforeEach
		else if (this.type === "AfterEach") var name = theController.myModel.currentLanguage.afterEach
		var theTab, child
		theTab = tabNum
	    let resultStr = tab.repeat(tabNum) + name + "(function() {\r\n"
	    for (child of this.allMyChildren) {
	        resultStr += child.toString(theTab + 1) + "\r\n"
	    }
        resultStr += tab.repeat(theTab) + "});\r\n"
        return resultStr
    }
}

class BeforeEach extends Setup{
	constructor (newParent) {
		super(newParent)
		this.type = "BeforeEach"
	}
}

class AfterEach extends Setup{
	constructor (newParent) {
		super(newParent)
		this.type = "AfterEach"
	}
}
