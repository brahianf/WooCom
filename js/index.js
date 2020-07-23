
const API = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=//&pageSize=12&format=json';

(async function load(){

  const getData = async (api_url) => {
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        // return localStorage.setItem('data', JSON.stringify(data));
        if(data){
          return data;
        }
    }catch(error){
        console.log('Fetch Error, No se encontró ningún resultado', error);
    }
  }

  async function cacheExist(list){
    const listProducts=`${list}List`;
    const cacheList=window.localStorage.getItem('listProducts')
    if(cacheList){
      return JSON.parse(cacheList)
    }
    // debugger
    const {products: data} =  await getData(API)
    window.localStorage.setItem(listProducts, JSON.stringify(data))
    return data
  }

  function productItemtemplate(product) {
    // let name = ;
    // name=name;
    return (
      `
      <div class="carousel__item fadeIn" id="primaryProductlist" data-id=${product.sku}>
        <img class="carousel-item__img" src="${product.image}" alt=""/>
        <div class="carousel-item__details">
          <div><img src="https://img.icons8.com/flat_round/64/000000/plus.png" alt=""/></div>
          <p class="carousel-item__details--title">${(product.name).substring(0,20)}</p>
          <p class="carousel-item__details--subtitle">$ ${product.regularPrice}</p>
        </div>
      </div>
      `
    )
  }

  function  renderProductList(list, $container){
    $container.children[0].remove()
    list.forEach((product) => {
      const HTMLString = productItemtemplate(product);
      // console.log(HTMLString)
      $container.innerHTML += HTMLString
      // const $primaryProductlist = document.getElementById('primaryProductlist')
      // const image = $container.querySelector('img')
      // image.addEventListener('load', (event) => {
        // $image.classList.add('fadeIn')
        // event.srcElement.classList.add('fadeIn')
      // })
      // addEventClick($primaryProductlist);
    });
  }

  const productList= await cacheExist('products');
  console.log(productList)
  const $carouselContainer = document.querySelector('#carousel')
  renderProductList(productList, $carouselContainer)

  
//      // Utilizar variable $modal ya rastreada para buscar #modal img
//      const $modal = document.getElementById('modal')
//      const $modalTitle = $modal.querySelector('h1')
//      const $modalImage = $modal.querySelector('img')
//      const $modalDescription = $modal.querySelector('p')
//      $primaryPlaylist = document.getElementById('item"')
  
//      function showModal($element) {
//       $overlay.classList.add('active')
//       $modal.style.animation = 'modalIn .8s forwards'
//     //   const id = $element.dataset.id
//     //   const category = $element.dataset.category
//     //   const data = findMovie(id,category)
//     //   $modalTitle.textContent = data.title
//     //   $modalImage.setAttribute('src', data.medium_cover_image);
//     //   $modalDescription.textContent = data.description_fulls
//     }
//     // showModal()
//     function addEventClick($element) {
//       $element.addEventListener('click', () => {
//         // alert('click')
//         showModal($element)
//       })
//     }
//     // console.log(videoItemtemplate('src/images/covers/bitcoin.jpg','Bitcoin'))
//     addEventClick($primaryPlaylist);

//     const $overlay = document.getElementById('overlay')
//     const $hideModal = document.getElementById('hide-modal')
  
//     $hideModal.addEventListener('click', hideModal)
//     function hideModal(){
//       $overlay.classList.remove('active')
//       $modal.style.animation = 'modalOut .8s forwards'
//     }
  
  })()