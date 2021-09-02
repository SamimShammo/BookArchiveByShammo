// spinner 
const loadSpinner = (displayStyle) =>{
    const spinner = document.getElementById('spinner');
    spinner.style.display = displayStyle;
  }
const loadEndSpinner = (displayStyle) =>{
    const spinner = document.getElementById('newSearchResultId');
    spinner.style.display = displayStyle;
  }

// search field 

const searchButton = () =>{
    const searchField = document.getElementById('searchField').value;
    searchField.textContent ='';
    loadSpinner('block');
    loadEndSpinner('none');
    // if search field is empty 
    if(searchField === ''){
        const notFound = document.getElementById('notFound');
         notFound.style.display ='block';
         notFound.innerHTML =`<h1 class="text-danger text-center"> Please search valid books  </h1>`;
         loadSpinner('none');
    }
    else{
        console.log(searchField);
    
        document.getElementById('searchField').value='';
        const url = `https://openlibrary.org/search.json?q=${searchField}`;
        fetch(url)
           .then(res => res.json())
           .then(data => searchResult(data))
    }
    
    
 
} 
// searchResult
const searchResult = data => {


    const {numFound, docs} = data
    const id = numFound
    const books = docs
   
    const resultContainer = document.getElementById('getSearchResult');
    const newData = data.docs;
    console.log(newData);
    
    // not found book 
    resultContainer.textContent = '';
    if(id === 0){
        //  console.log('not found')
         const notFound = document.getElementById('notFound');
         notFound.innerHTML =`<h1 class="text-danger text-center"> Book is not Found</h1>`;
         notFound.style.display='block';
         resultContainer.textContent = '';
         loadSpinner('none');
         loadEndSpinner('none');
    }
    else{
        // Search Result id
        const notFound = document.getElementById('searcResult');
        notFound.innerHTML =`<h3 class="text-danger text-center"> Search Result: ${id}</h3>`;
        notFound.style.display= 'block';
        loadEndSpinner('block');
        loadSpinner('none');
        
        resultContainer.textContent = '';
        // for each 
        newData.forEach(data => {
           
            const newDiv = document.createElement('div');
            newDiv.classList.add('col-lg-6');
            newDiv.innerHTML =`
           <div class="card mb-3" style="max-width: 540px; height:300px">
               <div class="row g-0 h-100 ">
             <div class="col-md-4">
                <img src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg "class="w-100 h-100 rounded-start" alt="This image no found">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title">${data.title.slice(0,20)}</h3>
                  
                  <p class="card-text"> <b> Publisher:</b> ${data.publisher[0]}</p>
                  <p class="card-text"> <b> Author:</b> ${data.author_name[0]}</p>
                  <p class="card-text"><b> First Published:</b> ${data.first_publish_year}</p>
                </div>
              </div>
            </div>
          </div>`;
          resultContainer.appendChild(newDiv);
          loadSpinner('none')
          loadEndSpinner('block')
    
        });
    
    }
  
 
    
}

