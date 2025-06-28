/* API Share */ 
(()=>{
    
    document.querySelector('.share').addEventListener('click', () =>{
        
        if(navigator.share){
            navigator.share({
                title: "DWT3AP - PWA",
                text: "Finalmente es una pwa",
                url: "https://dreamy-piroshki-8221b6.netlify.app/",
            })
            .then(()=>{
                console.log("se compartio")
            })
            .catch((error)=>{
                console.error(error)
            })
        }

    });
})()