const Main=(function(){
    const searchBox=document.getElementById('search');
    const searchList=document.getElementById('search-results-list');
    let searchResults=[];
    const SEARCH_TEXT_LIMT=2;

    function renderSearchResults()
    {
        if(!searchResults || searchResults.length ===0)
        {
            searchList.innerHTML = `<li class="no-results">No Result found !!!</li>`;
            return;
        }
        const favSuperHeroes=Common.getFavouritesSuperheroes();
        searchList.innerHTML=' ';

        searchResults.forEach((element)=>{
            const li=document.createElement('li');
            const indexOfSuperHeroInFavourites=favSuperHeroes.findIndex(
                (hero) =>hero.id ===element.id
            );
            li.classList.add('search-result');
            li.innerHTML=`
            <div class="search-left">
            <img src=${element.image.url} alt="" />
            </div>
            <div class="search-right">
            <a href="superhero.html?id=${element.id}">
            <div class="name">${element.name}</div>
            </a>
            <div class="'full-name">${element.biography['full-name']}</div>
            <div class="address">${
                element.biography['place-of-birth']}</div>
            <button class="btn add-to-fav" data-id=${element.id} style="display : ${indexOfSuperHeroInFavourites === -1 ? 'block' : 'none' }">Add Favourites </button>
            <button class="btn remove-from-fav" data-id=${element.id} style="display :${indexOfSuperHeroInFavourites === -1 ? 'none' :'block' }">Remove Favourites</button>
            </div>
        
            `;
            searchList.appendChild(li);
        });
    }
    function emptySearchResults()
    {
        searchList.innerHTML='';
        searchResults=[];
    }
    async function handleSearch(e)
    {
        const searchTerm=e.target.value;
        const url=Common.apiUrl;
        if(searchTerm.length <= SEARCH_TEXT_LIMT){
            emptySearchResults();
            return;
        }
        Common.showLoader();
        emptySearchResults();
        try{
            const data=await Common.apiRequest(`${url}/search/${searchTerm}`);
            Common.hideLoader();
            if(data.success){
                searchResults=data.data.results;
                renderSearchResults();
            }
        }catch(error){
            console.log('error',error);
            Common.hideLoader();
        }
    }
    function handleDocumentClick(e)
    {
        const target=e.target;
        if(target.classList.contains('add-to-fav')){
            const searchResultClickId=target.dataset.id;
            const hero=searchResults.filter((hero)=> hero.id === searchResultClickId);

            Common.addHeroToFavourites(hero[0]);
            renderSearchResults();
        }else if(target.classList.contains('remove-from-fav'))
        {
            const searchResultClickId=target.dataset.id;

            const addToFavBtn=document.querySelector(`button[data-id="${searchResultClickedInd}"].remove-from-fav`);
            if(addToFavBtn) addToFavBtn.style.display='block';

            const removeFromFavBtn=document.querySelector(
                `button[data-id="${searchResultClickedId}].remove-from-fav`
            )
            
            
            if(removeFromFavBtn)removeFromFavBtn.style.display='none';
            Common.removeHeroFromFavourites(searchResultClickId);

        }
    }
    function init(){
        searchBox.addEventListener('keyup',Common.debounce(handleSearch,500));
        document.addEventListener('click',handleDocumentClick);

    }
return{
    init
};

})();