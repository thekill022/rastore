fetch('json/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data[1].listProduk);

    let nav_link = document.querySelectorAll('.nav-link');
    let product = document.querySelector('.product');

    // Function to update product list based on the active nav link
    function updateProductList() {
      let activeLink = Array.from(nav_link).find(link => link.classList.contains('active'));
      if (activeLink) {
        let activeIndex = Array.from(nav_link).indexOf(activeLink);
        if (activeIndex === 0) {  // Assuming index 0 is for the first category
          product.innerHTML = '';  // Clear existing content
          for (let i = 0; i < data[0].listProduk.length; i++) {
            let content = data[0].listProduk;
            let card = `<div class="bg-primary container-card">
                  <div class="img-card">
                    <img src="${content[i].imageUrl}" alt="" class="img-thumbnail img-game img-fluid" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  </div>
                  <div class="d-flex justify-content-center py-2 pt-1 px-4 title-card">
                    <span class="text-white fs-4 font-bolder text-center text-truncate">${content[i].product.name}</span>
                  </div>
                </div>`;
            product.innerHTML += card;
          }
          // Add event listeners to the new buttons
          let img_game = document.querySelectorAll('.img-game');
          img_game.forEach(element => {
            element.addEventListener('click', function() {
              let img_modal = document.querySelector('#img-modal');
              img_modal.src = this.src;
              let gameName = this.parentNode.nextElementSibling.children[0].innerText;
              document.querySelector('#game-name').innerText = gameName;

              let harga = document.querySelector('#harga');
              harga.innerHTML = '';  // Clear previous prices
              harga.classList.remove('flex-column')
              harga.classList.add('flex-wrap')
              let selectedProduct = data[0].listProduk.find(product => product.product.name === gameName);

              if (selectedProduct) {
                let list_harga = selectedProduct.product.price;
                list_harga.forEach(e => {
                  harga.innerHTML += `<button class="btn btn-outline-primary btn-harga" data-amount="${e.jumlah}" data-price="${e.harga}">${e.jumlah}</button>`;
                });

                document.querySelectorAll('.btn-harga').forEach(button => {
                  button.addEventListener('click', function() {
                    document.querySelectorAll('.btn-harga').forEach(btn => btn.classList.remove('btn-harga-selected'));
                    this.classList.add('btn-harga-selected');

                    let selectedAmount = this.dataset.amount;
                    let selectedPrice = this.dataset.price;

                    let whatsappLink = `https://wa.me/6282339550727?text=Halo%20Admin%20Saya%20Mau%20Order%0AJudul%20game=${encodeURIComponent(gameName)}%0AJumlah=${encodeURIComponent(selectedAmount)}%0AHarga=${encodeURIComponent(selectedPrice)}%0AMasukkan%20user%20id=%0AMasukan%20zone%20id=%0AMasukkan%20server=%0ANomor%20whatsapp=%0ANama%20(opsional)=`;
                    
                    document.querySelector('.btn-checkout').href = whatsappLink;
                  });
                });
              }
            });
          });
        } else {
          product.innerHTML = '';  // Clear existing content
          for (let i = 0; i < data[1].listProduk.length; i++) {  // Assuming data[1] corresponds to the second category
            let content = data[1].listProduk;
            let card = `<div class="bg-primary container-card">
                  <div class="img-card">
                    <img src="${content[i].imageUrl}" alt="" class="img-thumbnail img-game" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  </div>
                  <div class="d-flex justify-content-center py-2 pt-1 px-4 title-card">
                    <span class="text-white fs-4 font-bolder text-center text-truncate">${content[i].platform}</span>
                  </div>
                </div>`;
            product.innerHTML += card;
          }
          
          let img_game = document.querySelectorAll('.img-game');
  img_game.forEach(element => {
    element.addEventListener('click', function() {
      let img_modal = document.querySelector('#img-modal');
      img_modal.src = this.src;
      let platformName = this.parentNode.nextElementSibling.children[0].innerText;

      document.querySelector('#game-name').innerText = platformName;
      let harga = document.querySelector('#harga');
      harga.innerHTML = '';  // Clear previous prices
      let selectedProduct = data[1].listProduk.find(product => product.platform === platformName);

      if (selectedProduct) {
        // Loop through services
        selectedProduct.services.forEach(service => {
          let serviceName = service.service_name;
          harga.classList.add('flex-column')
          harga.innerHTML += `<h5 class="text-center text-lg-start">${serviceName}</h5>`;  // Display service name
          let container = document.createElement('div')
          // Loop through options under each service (e.g., NO GARANSI, GARANSI 30 HARI)
          service.options.forEach(option => {
            let type = option.type;
            container.innerHTML += `<h6>${type}</h6>`;  // Display type

            // Loop through packages within each option
            let div = document.createElement('div')
            div.classList.add('flex-wrap')
            option.packages.forEach(pkg => {
              div.innerHTML += `<button class="btn btn-outline-primary btn-harga" data-amount="${pkg.jumlah}" data-price="${pkg.harga}">${pkg.jumlah}</button>`;
            });
            div.classList.add('d-flex')
            div.classList.add('gap-4')
            harga.classList.remove('flex-wrap')
            container.appendChild(div)
          });
          harga.appendChild(container)
        });

        // Add click event listeners for each price button
        document.querySelectorAll('.btn-harga').forEach(button => {
          button.addEventListener('click', function() {
            document.querySelectorAll('.btn-harga').forEach(btn => btn.classList.remove('btn-harga-selected'));

            this.classList.add('btn-harga-selected');

            let selectedAmount = this.dataset.amount;
            let selectedPrice = this.dataset.price;
            let paket = button.parentNode.parentNode.previousSibling.innerText
            let whatsappLink = `https://wa.me/6282339550727?text=Halo%20Admin%20Saya%20Mau%20Order%0AUsername=%0ALink=%0APlatform=${encodeURIComponent(platformName)}%0APaket=%20${encodeURIComponent(paket)}%0AJumlah=${encodeURIComponent(selectedAmount)}%0AHarga=${encodeURIComponent(selectedPrice)}%0A`;
            
            document.querySelector('.btn-checkout').href = whatsappLink;
          });
        });
      }
    });
  });
        }
      }
    }

    // Initial load
    updateProductList();

    // Event listeners for navigation links
    nav_link[0].addEventListener('click', () => {
      if (!nav_link[0].classList.contains('active')) {
        nav_link[0].classList.add('active');
        nav_link[1].classList.remove('active');
        updateProductList();
      }
    });

    nav_link[1].addEventListener('click', () => {
      if (!nav_link[1].classList.contains('active')) {
        nav_link[1].classList.add('active');
        nav_link[0].classList.remove('active');
        updateProductList();
      }
    });

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });