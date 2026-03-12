document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
{ 
id: 1,
name: 'Mie Ayam',
img: '1.jpg',
price: 6000,
stars: 4,
desc: 'Mie ayam gurih dengan topping ayam manis dan kuah kaldu yang hangat.'
},

{ 
id: 2,
name: 'Bakso',
img: '2.jpg',
price: 10000,
stars: 1,
desc: 'Bakso kenyal dengan kuah kaldu sapi yang segar dan nikmat.'
},

{ 
id: 3,
name: 'Mie Ayam Bakso',
img: '3.jpg',
price: 16000,
stars: 5,
desc: 'Perpaduan mie ayam gurih dan bakso kenyal yang membuat rasa semakin lengkap.'
},

{ 
id: 4,
name: 'Mie Ayam Jamur',
img: '4.jpg',
price: 1600000,
stars: 4,
desc: 'Mie ayam dengan topping jamur spesial yang memberikan rasa lebih kaya.'
}
],

        activeItem: null,

        showDetail(item){
            this.activeItem = item
            document.querySelector('#item-detail-modal').style.display = 'flex'

            this.$nextTick(() => {
                feather.replace()
            })
        }
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada / cart masih kosong
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total +=newItem.price;
            } else {
                // jika barang sudah ada, cek apakah beda atau sama dengan ada yang ada di cart
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if(item.id !== newItem.id) {
                        return item
                    } else {
                        // jika barang sudah ada, tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total +=item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // ambil item yang mau diremove berdasarkan id nya
            const cartItem = this.items.find((item) => item.id === id);

            // jika item lebih dari 1
            if(cartItem.quantity > 1) {
                // telusuri 1 1
                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                // jika barangnya kurang 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

// Form Validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');


form.addEventListener('keyup', function() {
    for (let i = 0; i < form.elements.length; i++){
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// kirim data ketika tombol checkout diklick 
checkoutButton.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('https://wa.me/6285701884893?text=' + encodeURIComponent(message));
});

// Reset Forfm
form.reset();

// nonaktifkan tombol lagi
checkoutButton.disabled = true;

// format pesan wassap
const formatMessage = (obj) => {
    return`Data Custamer
        Nama: ${obj.name}
        Email: ${obj.email}
        No HP: ${obj.phone}
        Location: ${obj.location}
Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
TOTAL: ${rupiah(obj.total)}
Terima Kasih.`;
}

// konversi rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency : 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

// untuk tombol kirim pesan dikontak kami
function kirimWA(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const hp = document.getElementById("hp").value;

    const nomorWA = "6285701884893";

    const pesan = `Halo, saya ingin bertanya

Nama: ${nama}
Email: ${email}
No HP: ${hp}
Email: ${location}`;

    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
}