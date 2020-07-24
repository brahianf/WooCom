
const API = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=nnsnWRzwWhuucvJc59z56TfR&pageSize=12&format=json';

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

  const productList= await cacheExist('products');
  console.log(productList)

  function productItemtemplate(product) {
    return (
      `
      <div class="carousel__item fadeIn" id="primaryProductlist" data-id=${product.sku}>
        <img class="carousel-item__img" src="${product.image}" alt=""/>
        <div class="carousel-item__details">
          <p class="carousel-item__details--title">${(product.name).substring(0,20)}</p>
          <p class="carousel-item__details--subtitle">$ ${product.regularPrice}</p>
        </div>
      </div>
      `
    )
  }

  const $modal = document.getElementById('modal')
  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')
  // const $modalPrice = $modal.querySelector('h1')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  function findbyId(id){
    // debugger
    return productList.find(product => product.sku === parseInt(id,10));
  }


  function showModal($element) {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id
    const data = findbyId(id)
    $modalTitle.textContent = data.name
    $modalImage.setAttribute('src', data.image);
    $modalDescription.textContent = data.longDescription
    // $modalPrice.textContent=data.regularPrice
  }


  function addEventClick($element) {
    $element.addEventListener('click', () => {
      // alert('click')
      showModal($element)
    })
  }

  function  renderProductList(list, $container){
    $container.children[0].remove()
    list.forEach((product) => {
      const HTMLString = productItemtemplate(product);
      // console.log(HTMLString
      $container.innerHTML += HTMLString
      const $primaryProductlist = document.querySelectorAll('#primaryProductlist');
      $primaryProductlist.forEach(item => addEventClick(item));

      // const image = $container.querySelectorAll('img')
      // image.addEventListener('load', (event) => {
      //   // $image.classList.add('fadeIn')
      //   event.srcElement.classList.add('fadeIn')
      // })
    });
  }

  // console.log(productList)
  const $carouselContainer = document.querySelector('#carousel')
  renderProductList(productList, $carouselContainer)

  const $add = document.querySelectorAll('#add');
  const $sub = document.querySelectorAll('#sub');
  $add.forEach(item => item.addEventListener('click', addToCart(item)));
  // $sub.forEach(item => item.addEventListener('click', subToCart(item)));

  function addToCart(item){
    const id = item.dataset.id
    const product= findbyId(id);
    console.log(product);
  }

  $hideModal.addEventListener('click', hideModal)
  function hideModal(){
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  }

})()