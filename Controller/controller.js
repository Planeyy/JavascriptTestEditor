//Controller

class Controller{
	constructor(){
		this.myModel = new Model(this)
		this.myView = new HTMLView(this)
		console.log("controller")
	}

	updateDisplay(){
		this.myModel.toHTML()

		//set onclick methods for dropdown addSpec/Suite btns
		let specbtns = document.getElementsByClassName("btnAddSpec")
		for (var spec of specbtns){
			spec.onclick = function(event) {
				console.log("spec func")
				var SELECTEDSUITE = event.target.parentElement.parentElement.parentElement.id
				var currentItem = TC.myModel.find(SELECTEDSUITE)
				TC.myModel.setCurrentSuite(currentItem)
				modal_content.setAddSpec()
				modal.style.display = "block"
				NEWTYPE = "SPEC"
			}
		}

		let suitebtns = document.getElementsByClassName("btnAddSuite")
		for (var suite of suitebtns){
			suite.onclick = function(event) {
				console.log("suite func")
				var SELECTEDSUITE = event.target.parentElement.parentElement.parentElement.id
				var currentItem = TC.myModel.find(SELECTEDSUITE)
				TC.myModel.setCurrentSuite(currentItem)
				modal_content.setAddSuite()
				modal.style.display = "block"
				NEWTYPE = "SUITE"
			}
		}

	}

	outputToDiv(divID, textContent){
		this.myView.appendToDiv(divID, textContent)
	}

	loadTestData(){
		this.myModel.createNewRoot("Root Sweetie")
		this.myModel.addSpec("first Child spec")
		var suite = this.myModel.addSuite("firstChild Suite")
		this.myModel.setCurrentSuite(suite)
		this.myModel.addSpec("child of  child spec 1")
		this.myModel.addSpec("child of  child spec 2")
		this.myModel.addSuite("childOfChild Suite")
		this.myModel.setCurrentSuite(suite)
		this.myModel.addSpec("child of  child spec 3")
	}

	loadFromFile(){
		let that = this
		this.myModel.myFiler.loadSuiteFromFile("fileSelector", this.myModel, function(error) {
			console.log(error)
			if (error == ""){
				that.updateDisplay();
			}else{
				that.outputToDiv("main", error)
			}
		})
	}

	saveViewToModel(){
    	this.myModel.myFiler.createSuite(this.myModel.myFiler.splitString(this.myView.getDisplayedSuite(document.getElementById("1")), "{"));
  	}
}

window.addEventListener('input', function (e) {
	if (e.target.id.substr(0, 4) === "Item"){
		let id = e.target.id.slice(0, -1)
		TC.myModel.updateItem(id, e.target.value)
	}
 }, false);
