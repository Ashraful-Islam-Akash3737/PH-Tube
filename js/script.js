
const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');


const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const {data} = await res.json();
    console.log(data);
    fetchByCategory(data);

}
const fetchByCategory = (data) => {
    data.forEach((card) => {
        // console.log(card);
        const categoryBtn = document.createElement('button');
        categoryBtn.className ='btn btn-ghost bg-slate-700 text-white text-xl md:text-lg';
        categoryBtn.innerText = card.category;
        categoryBtn.addEventListener('click', ()=> {
            fetchByCategoryId(card.category_id)
        })
        btnContainer.appendChild(categoryBtn);
    }) 
    
}
const fetchByCategoryId = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const {data} = await res.json();
    cardContainer.innerText = '';
    data.forEach((video)=>{
        let verifiedBadge = '';
        if (video.authors[0].verified) {
            verifiedBadge = `<i class="fa-solid fa-certificate w-5 "></i>`;
        }
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden ">
                    <img class="w-full h-60 object-cover" src="${video.thumbnail}" alt="">
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex items-center mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                                <p class="">${verifiedBadge}</p>
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>

        `
        cardContainer.appendChild(div);
    })
    
    console.log(categoryId, data);
}
loadData();