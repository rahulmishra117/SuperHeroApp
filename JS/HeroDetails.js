// File containt the all the Superhero Result

const SuperHero =(function(){
    const superHeroDetailContainer=document.querySelector('.super-hero-detail');

    function getQueryParameter(param){
        const urlParams=new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    function renderSuperHeroDetails(data)
    {
        Common.hideLoader();
        if(!data){
            superHeroDetailContainer.innerHTML='Can Not Load The SuperHero,Please try again!!!';
            return;
        }
        superHeroDetailContainer.innerHTML=
        `<img src=${data.image.url} alt=""/>
        <h1>${data.name}</h1>
        <h3>${data.biography['full-name']}</h3>
        <div class="power-stats">
        <div><span>INTELLIGENCE</span><span>${data.powerstats.intelligence}</span></div>
        <div><span>STRENGTH</span><span>${data.powerstats.strength}</span></div>
        <div><span>SPEED</span><span>${data.powerstats.speed}</span></div>
        `;
    }

    async function fetchSuperHeroData(id)
    {
        const url=Common.apiUrl;
        try{
            const data=await Common.apiRequest(`${url}/${id}`);
            if(data.success){
                renderSuperHeroDetails(data.data);
            }else{
                renderSuperHeroDetails(null);
            }
        }catch(error){
            console.log('error',error);
            renderSuperHeroDetails(null);
        }
    }
    function init(){
        const heroId=getQueryParameter('id');
        Common.showLoader();
        fetchSuperHeroData(heroId);
    }
return {init};


})();