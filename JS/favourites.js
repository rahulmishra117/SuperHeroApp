// List of superhero favourites

const Favourites =(function(){
    const searchList=document.getElementById('search-results-list');
    function renderFavourites(){
        const favouritesData=Common.getFavouritesSuperheroes();

        searchList.innerHTML='';
        if(!favouritesData || favouritesData.length===0){
            searchList.innerHTML=`<li class="no-result">No Result Found!!</l1>`;

        }else{
            favouritesData.forEach((element)=>{
                const li=document.createElement('li');
                li.classList.add('search-result');
                li.innerHTML =`
                <div class="search-left">
                <img src=${element.image.url} alt=""/>
                </div>
                <div class="search-right">
                <a href="superhero.html ? id=${element.id}">
                <div class="name">${element.name}</div>
                </a>
                <div class="full-name">${element.biography['full-name']}</div>
                 <div class="address">${element.biography['place-of-birth']}</div>
                 <button class="btn remove-from-fav" data-id=${element.id}>Remove from favourites</button>
                </div>
                `;
                searchList.appendChild(li);
            });
        }
        Common.hideLoader();
        return;
    }
// Handle document Click
    function handleDocumentClick(e){
        const target=e.target;
        if(target.classList.contains('remove-from-fav')){
            const searchResultClickedId=target.dataset.id;
            Common.removeHeroFromFavourites(searchResultClickedId);
            renderFavourites();
        }
    }
    function init(){
        Common.showLoader();
        renderFavourites();
        document.addEventListener('click',handleDocumentClick);
    }
return{init};

})();