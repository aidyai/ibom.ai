const $ = document

let searchInput = $.querySelector(".search-input")
let searchBtn = $.querySelector(".search-btn")
let i = $.querySelector("i")
let phoneticsAudio = $.querySelector(".phonetics-audio")


function getWordData () {
	let wordValue = searchInput.value

	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordValue}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			showData(data)
		})
		.catch(err => console.log(err))
}

function showData (data) {
	let WordElem = $.querySelector(".Word")
	WordElem.innerHTML = data[0].word

	phoneticsAudio.src = `${data[0].phonetics[0].audio}`
	
	let phoneticsText = $.querySelector(".phonetic-text")
	phoneticsText.innerHTML = `noun: ${data[0].phonetic}`

	let definitions = $.querySelector(".definition")
	definitions.innerHTML = data[0].meanings[0].definitions[0].definition
}

i.addEventListener("click", () => {
	phoneticsAudio.play()
})

searchBtn.addEventListener("click", () => {
	getWordData()
})

searchInput.addEventListener("keyup", e =>{
	if(e.keyCode === 13) {
		if(searchInput.value) {
			getWordData()
		}
	}
})



function toggleNav() {
    var navList = document.querySelector('.nav-list');
    navList.classList.toggle('show');
}
