document.getElementById('error-message').style.display = "none";

// Search Area 
const searchBook = () => {
    const searchBookInput = document.getElementById('search-field');
    const searchText = searchBookInput.value;
    searchBookInput.value = "";
    // API DATA RESPONSE 
    if (searchText == "") {
        displayError()
    }
    else {
        document.getElementById('error-message').style.display = "none";
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                displaySearchTotal(data.numFound);
                displaySearch(data.docs);
            }
            );
    }
}
// TOtal Book Findings 
const displaySearchTotal = item => {
    if (item === 0) {
        // alert('something wrong')
        document.getElementById("message").innerText = `Please Enter a valid Name`
        document.getElementById("find-message").textContent = "";
    }
    else {
        document.getElementById("find-message").innerText = `Total book Found  ${item}`
        document.getElementById("message").textContent = "";
    }

}

// Display Books 
const displaySearch = books => {
    const searchResult = document.getElementById('search-result');

    searchResult.textContent = "";
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `            
                <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : "N/A"}-M.jpg" class="card-img-top bg-white" alt="Images is not Available">
                <div class="card-body">
                    <h4 class="card-title">Book Title:${book.title}</h4>
                    <h5><small>Author:${book.author_name}</small></h5>        
                    <small>First published On:${book.first_publish_year}</small>          
                </div>
            </div>`;
        searchResult.appendChild(div);
    })
}
// Error Handle 
const displayError = () => {
    document.getElementById('error-message').style.display = "block";
    document.getElementById('search-result').textContent = "";
    document.getElementById("find-message").innerText = "";
    document.getElementById("message").textContent = "";
}