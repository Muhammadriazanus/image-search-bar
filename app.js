const accessKey = "rfyb9KUBL4UNMvmL-4ZbUNpMKfL0c4QYlzA0hMKgidY"

const formE1 = document.querySelector("form") 

const searchInputEl = document.getElementById('Search-input')
const searchResultsEl = document.querySelector(".search-results")
console.log(searchResultsEl);
const showMoreButtonEl = document.getElementById('showmorebutton')

let inputData = ""; 
let page = 1

 async function searchImages(){
    inputData = searchInputEl.value
    console.log(inputData);
    const urls = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    console.log(urls);
    const response  = await fetch(urls)
    const data  = await response.json()
    if(page === 1){
        searchResultsEl.innerHTML = "";
    }

    const results = data.results

    results.map((result)=>{
    const imageWrapper = document.createElement("div")
    imageWrapper.classList.add("search-result")
    const image = document.createElement('img')
    image.src = result.urls.small
    image.alt = result.alt_description
    const imageLink = document.createElement("a")
    imageLink.href= result.links.html
    imageLink.target = "_blank"
    console.log(result);
    imageLink.textContent = result.alt_description
    imageWrapper.appendChild(imageLink)
    imageWrapper.appendChild(image)
    searchResultsEl.appendChild(imageWrapper)
})
page++
    
    if(page > 1){
        showMoreButtonEl.style.display ="block" 
    }
}

formE1.addEventListener('submit',(event)=>{
    event.preventDefault()
    page = 1
    searchImages()
})

showMoreButtonEl.addEventListener("click",()=>{
    searchImages()
})

