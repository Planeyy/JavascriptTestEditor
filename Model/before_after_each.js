class Setup extends Suite{
	constructor (newParent) {
		super("", newParent)
		this.type = "Setup"
	}
	
	toHTML(Parent){
		if (this.type === "BeforeEach") var name = theController.myModel.currentLanguage.beforeEach
		else if (this.type === "AfterEach") var name = theController.myModel.currentLanguage.afterEach
		else var name = this.type
		let backColour = 240-(this.findIndent() * 20)
		if (this.parent !== "None"){
			var index = this.parent.allMyChildren.findIndex(x => x.id == this.id)
		}
		if (backColour < 40) backColour = 40
		var newText = "<div ondrop='drop(event)' ondragstart='drag(event)' ondragover='allowDrop(event)' draggable='true' class='Setup' style='background-color:rgb("+backColour+", "+backColour+", "+backColour+")' id='" + this.id + "'>"
		newText += '<div class="dropdown"><button class="dropbtn">⇓</button><div class="dropdown-content">'
		newText += '<a class="btnDelete" >Delete</a>'
		newText += '<a class="btnAddMisc" >Add Misc</a>'
		newText += '</div></div>'
		newText += " " + name + "&nbsp;&nbsp;" + "| "+ this.id + "</div>"
		theController.outputToDiv(Parent, newText)
		if(this.hasOwnProperty("allMyChildren")){
			for (var baby of this.allMyChildren){
				baby.toHTML(this.id)
			}
		}
	}

	toString (tabNum) {
    let tab = "    "
		var theTab, child
		theTab = tabNum
    let resultStr = tab.repeat(tabNum) + this.type + "(function() {\r\n"
    for (child of this.allMyChildren) {
        resultStr += child.toString(theTab + 1) + "\r\n"
    }
        resultStr += tab.repeat(theTab) + "})\r\n"
        return resultStr
    }
}

class BeforeEach extends Setup{
	constructor (newParent) {
		super(newParent)
		this.type = "BeforeEach"
	}

    addMiscCode (itStr, newParent) {
        let aMisc = new MiscCode(itStr, newParent)
        this.allMyChildren.push(aMisc)
    }
}

class AfterEach extends Setup{
	constructor (newParent) {
		super(newParent)
		this.type = "AfterEach"
	}
}