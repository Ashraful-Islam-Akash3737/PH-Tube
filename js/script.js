
const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
const errorContainer = document.getElementById('error-element');
const sortBtn = document.getElementById('sort-btn');
let sortByView = false;

sortBtn.addEventListener('click', ()=>{
    sortByView = true;
    fetchByCategoryId(currentId, sortByView)
})


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
        categoryBtn.className ='category-btn btn btn-ghost bg-slate-700 text-white text-xl md:text-lg';
        categoryBtn.innerText = card.category;
        categoryBtn.addEventListener('click', ()=> {
            fetchByCategoryId(card.category_id)
            const allBtn = document.querySelectorAll('.category-btn')
            for (const btn of allBtn) {
                btn.classList.remove('bg-red-500')
            }
            categoryBtn.classList.add('bg-red-500')
        })
        btnContainer.appendChild(categoryBtn);
    }) 
    
}
let currentId = '1000';
const fetchByCategoryId = async (categoryId , sortByView) => {
    currentId = categoryId;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const {data} = await res.json();
    if (sortByView) {
        data.sort((a, b)=>{
            const totalViewsStrFirst = a.others?.views;
            const totalViewsStrSecond = b.others?.views;
            const totalViewsFirstNumber = parseFloat(totalViewsStrFirst.replace('K', '')) || 0;
            const totalViewsSecondNumber = parseFloat(totalViewsStrSecond.replace('K', '')) || 0;
            return totalViewsSecondNumber - totalViewsFirstNumber;
        })
    }

    if (data.length === 0) {
        errorContainer.classList.remove('hidden');
    }
    else{
        errorContainer.classList.add('hidden');

    }
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
                    <h6 class="absolute text-white bottom-[40%] right-12">0 hr</h6>
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
fetchByCategoryId(currentId, sortByView);