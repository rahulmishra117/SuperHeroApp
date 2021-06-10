const Common=(function(){
    const apiToken='2525910377721194';
    const apiUrl=`https://www.superheroapi.com/api.php/${apiToken}/`;
    const toastContainer=document.getElementById('toast');
    const FAVOURITES='favourites';
    const loader=document.querySelector('.loader');

    function showLoader(){
        loader.style.display='block';
    }
    function hideLoader(){
        loader.style.display='none';
    }


    function showNotification(type,message){
        if(type=='error'){
            toastContainer.classList.remove('toast-success');
            toastContainer.classList.add('toast-error');
         } else if(type == 'success'){
                toastContainer.classList.remove('toast-error');
                toastContainer.classList.remove('toast-success');
            }
            toastContainer.style.display='block';
            toastContainer.innerText=message;


            setTimeout(() => {
                toastContainer.style.display='none';
            },3000);
        }
        async function apiRequest(url){
            try{
                const response=await fetch(url);
                const data=await response.json();
                return {
                    data,
                    success:true,
                };
            }catch(error)
            {
                console.log('error',error);
                return {
                    error:error.message,
                    success:false,
                }
            }
        }

        function addHeroToFavourites(hero)
        {
            if(!hero)return ;

            const favouritesFromLocalStorage=getFavouritesSuperheroes();
            favouritesFromLocalStorage.push(hero);
            localStorage.setItem(FAVOURITES,
                JSON.stringify(favouritesFromLocalStorage)
                );
             showNotification('success','Added to favourits');   
        }

        function removeHeroFromFavourites(heroId)
        {
            if(!heroId)return ;
            let favouritesFromLocalStorage =getFavouritesSuperheroes();
            favouritesFromLocalStorage=favouritesFromLocalStorage.filter(
                (item)=> item.id !==heroId

            );
                localStorage.setItem(
                    FAVOURITES,
                    JSON.stringify(favouritesFromLocalStorage)
                );
                showNotification('success','Removed from Favourites');
        }
        function getFavouritesSuperheroes(){
            return localStorage.getItem(FAVOURITES) ? JSON.parse(localStorage.getItem(FAVOURITES)):[];
        }        


        function debounce(func,delay){
            let timeout;
            return function(){
                const context=this;
                const args=arguments;
                clearTimeout(timeout);
                timeout=setTimeout(function(){
                    timeout=null;
                    func.apply(context,args);
                },delay);
            };
        }

        return {
            apiRequest,
            apiUrl,
            showNotification,
            addHeroToFavourites,
            removeHeroFromFavourites,
            getFavouritesSuperheroes,
            showLoader,
            hideLoader,
            debounce
        };
})(); 