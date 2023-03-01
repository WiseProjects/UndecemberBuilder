document.addEventListener('DOMContentLoaded', (event) => {

	var redskilldir = "images/runes/skill/red/";
	var greenskilldir = "images/runes/skill/green/";
	var blueskilldir = "images/runes/skill/blue/";
	var redlinkdir = "images/runes/link/red/";
	var greenlinkdir = "images/runes/link/green/";
	var bluelinkdir = "images/runes/link/blue/";
	var redContainer = document.getElementById('redSkills');
	var greenContainer = document.getElementById('greenSkills');
	var blueContainer = document.getElementById('blueSkills');
	var redLinkContainer = document.getElementById('redLink');
	var greenLinkContainer = document.getElementById('greenLink');
	var blueLinkContainer = document.getElementById('blueLink');
	
	for(var i = 1; i < 41; i++){
		var divWrap = document.createElement("div");
		divWrap.classList.add("grid-item");
		divWrap.classList.add("drag");
		divWrap.classList.add("skill");
		divWrap.setAttribute('draggable', 'true');
		divWrap.setAttribute('style', "background-image:url('" + redskilldir + 'red' + i + ".png');");
		redContainer.appendChild(divWrap);
	};
	
	for(var i = 1; i < 54; i++){
		var divWrap = document.createElement("div");
		divWrap.classList.add("grid-item");
		divWrap.classList.add("drag");
		divWrap.classList.add("skill");
		divWrap.setAttribute('draggable', 'true');
		divWrap.setAttribute('style', "background-image:url('" + greenskilldir + 'green' + i + ".png');");
		greenContainer.appendChild(divWrap);
		document.getElementById('green').classList.add("hide");
	};

	for(var i = 1; i < 58; i++){
		var divWrap = document.createElement("div");
		divWrap.classList.add("grid-item");
		divWrap.classList.add("drag");
		divWrap.classList.add("skill");
		divWrap.setAttribute('draggable', 'true');
		divWrap.setAttribute('style', "background-image:url('" + blueskilldir + 'blue' + i + ".png');");
		blueContainer.appendChild(divWrap);
		document.getElementById('blue').classList.add("hide");
	};

	for(var i = 1; i < 56; i++){
		var divWrap = document.createElement("div");
		divWrap.classList.add("grid-item");
		var linkImage = document.createElement("div");
		divWrap.classList.add("drag");
		divWrap.classList.add("bluelink");
		divWrap.setAttribute('draggable', 'true');
		divWrap.setAttribute('style', "background-image:url('" + bluelinkdir + 'blue' + i + ".png'), url('images/runes/link/LinkSkill_Bg_Blue.png');");
		blueLinkContainer.appendChild(divWrap);
	};
	
	for(var i = 1; i < 55; i++){
		var divWrap = document.createElement("div");
		divWrap.classList.add("grid-item");
		var linkImage = document.createElement("div");
		divWrap.classList.add("drag");
		divWrap.classList.add("redlink");
		divWrap.setAttribute('draggable', 'true');
		divWrap.setAttribute('style', "background-image:url('" + redlinkdir + 'red' + i + ".png'), url('images/runes/link/LinkSkill_Bg_Red.png');");
		redLinkContainer.appendChild(divWrap);
	};
	
	for(var i = 1; i < 50; i++){
		var divWrap = document.createElement("div");
		divWrap.classList.add("grid-item");
		var linkImage = document.createElement("div");
		divWrap.classList.add("drag");
		divWrap.classList.add("greenlink");
		divWrap.setAttribute('draggable', 'true');
		divWrap.setAttribute('style', "background-image:url('" + greenlinkdir + 'green' + i + ".png'), url('images/runes/link/LinkSkill_Bg_Green.png');");
		greenLinkContainer.appendChild(divWrap);
	};
	
    let items = document.querySelectorAll('.drag');
    items.forEach(function (item) {
		if (!item.classList.contains('lock')){
			addListeners(item);
		}
    });
});

	var source;
	
	function addListeners(item){
		item.addEventListener('dragstart', handleDragStart);
		item.addEventListener('dragover', handleDragOver);
		item.addEventListener('dragenter', handleDragEnter);
		item.addEventListener('dragleave', handleDragLeave);
		item.addEventListener('dragend', handleDragEnd);
		item.addEventListener('drop', handleDrop);
	}
	
	function removeListeners(item){
		item.removeEventListener('dragstart', handleDragStart);
		item.removeEventListener('dragover', handleDragOver);
		item.removeEventListener('dragenter', handleDragEnter);
		item.removeEventListener('dragleave', handleDragLeave);
		item.removeEventListener('dragend', handleDragEnd);
		item.removeEventListener('drop', handleDrop);
	}
	
	function toggleLock(){
		let e = document.getElementById('toggleLock');
		let items;
		if (e.classList.contains('unlocked')){
			e.classList.remove("unlocked");
			e.classList.add("locked");
			items = document.querySelectorAll('.unlock');
			items.forEach(function (item) {
				item.classList.remove("unlock");
				item.classList.add("lock");
				removeListeners(item);
			});
		} else {
			e.classList.remove("locked");
			e.classList.add("unlocked");
			items = document.querySelectorAll('.lock');
			items.forEach(function (item) {
				item.classList.remove("lock");
				item.classList.add("unlock");
				addListeners(item);
			});
		}
	}

	var emptySlotBG = "url('images/BG_RunePlate_Slot_01.png');";

    function handleDragStart(e) {
		e.dataTransfer.effectAllowed = 'move';
		source = this;
        // this.style.opacity = '0.4';
    }

    function handleDragEnd(e) {
        // this.style.opacity = '1';
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation(); // препятствует перенаправлению в браузере.
		e.dataTransfer.dropEffect = 'move';
		console.log(source.getAttribute('style'));
		var sourceClass = source.classList;
		this.classList.remove('over');
		if (sourceClass.contains('skill')){
			this.setAttribute('style', source.getAttribute('style'));
			this.classList.remove('bluelinked');
		}
		if (sourceClass.contains('empty')){
			this.setAttribute('style', source.getAttribute('style'));
			this.classList = source.classList;
			source.classList.remove('bluelinked');
			source.removeAttribute('style');
		}
		if (sourceClass.contains('bluelink') || sourceClass.contains('redlink') || sourceClass.contains('greenlink')){
			this.classList.add('bluelinked');
			this.setAttribute('style', source.getAttribute('style').replace(';', ', ') + emptySlotBG);
		}
		
        return false;
    }
	
	function edit(){
		let items = document.querySelectorAll('.drag');
		items.forEach(function (item) {
		if (!item.classList.contains('lock')){
			addListeners(item);
		}
		});
	}

	function showRed(){
		document.getElementById('red').classList.remove("hide");
		document.getElementById('green').classList.add("hide");
		document.getElementById('blue').classList.add("hide");
	}

	function showGreen(){
		document.getElementById('red').classList.add("hide");
		document.getElementById('green').classList.remove("hide");
		document.getElementById('blue').classList.add("hide");
	}

	function showBlue(){
		document.getElementById('red').classList.add("hide");
		document.getElementById('green').classList.add("hide");
		document.getElementById('blue').classList.remove("hide");
	}
	
	function showRedLinks(){
		document.getElementById('redLinks').classList.remove("hide");
		document.getElementById('greenLinks').classList.add("hide");
		document.getElementById('blueLinks').classList.add("hide");
	}

	function showGreenLinks(){
		document.getElementById('redLinks').classList.add("hide");
		document.getElementById('greenLinks').classList.remove("hide");
		document.getElementById('blueLinks').classList.add("hide");
	}

	function showBlueLinks(){
		document.getElementById('redLinks').classList.add("hide");
		document.getElementById('greenLinks').classList.add("hide");
		document.getElementById('blueLinks').classList.remove("hide");
	}
	
	function load(){
		var fr=new FileReader();
		fr.onload=function(){
			document.getElementById('build').outerHTML=fr.result;
			edit();
		}
		fr.readAsText(document.getElementById('load').files[0]);
	}
	
	async function save() {
	  const opts = {
		types: [{
		  description: 'Text file',
		  accept: {'text/plain': ['.und']},
		}],
	  };
	  const handle = await window.showSaveFilePicker(opts);
	  const writable = await handle.createWritable();
	  await writable.write( document.getElementById('build').outerHTML );
	  writable.close();
	}
