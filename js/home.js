
(async function load(){
  
     // Utilizar variable $modal ya rastreada para buscar #modal img
     const $modal = document.getElementById('modal')
     const $modalTitle = $modal.querySelector('h1')
     const $modalImage = $modal.querySelector('img')
     const $modalDescription = $modal.querySelector('p')
     $primaryPlaylist = document.getElementById('item"')
  
     function showModal($element) {
      $overlay.classList.add('active')
      $modal.style.animation = 'modalIn .8s forwards'
    //   const id = $element.dataset.id
    //   const category = $element.dataset.category
    //   const data = findMovie(id,category)
    //   $modalTitle.textContent = data.title
    //   $modalImage.setAttribute('src', data.medium_cover_image);
    //   $modalDescription.textContent = data.description_fulls
    }
    // showModal()
    function addEventClick($element) {
      $element.addEventListener('click', () => {
        // alert('click')
        showModal($element)
      })
    }
    // console.log(videoItemtemplate('src/images/covers/bitcoin.jpg','Bitcoin'))
    addEventClick($primaryPlaylist);

    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')
  
    $hideModal.addEventListener('click', hideModal)
    function hideModal(){
      $overlay.classList.remove('active')
      $modal.style.animation = 'modalOut .8s forwards'
    }
  
  })()