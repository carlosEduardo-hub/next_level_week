function populateUFs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( function(res) {return res.json()})
    .then( function(states) {
        
        for( const state of states) {
            ufselect.innerHTML =  ufselect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }

    })
}


populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateinput = document.querySelector("input[name=state]")

    
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateinput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( function(res) {return res.json()})
    .then( function(cities) {
    
        for( const city of cities) {
            citySelect.innerHTML =  citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change" , getCities )



const itemsToCollected = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollected) {
    item.addEventListener("click" , handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items')

let selectedItems = []


function handleSelectedItem(event) {
    const itemLi = event.target
    
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    
    const alreadySelected = selectedItems.findIndex( function(item){
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    if( alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( function(item)  {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value =  selectedItems
}

