// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Chicken Products Data
const chickenProducts = [
    {
        id: 1,
        name: "4-Month-Old Pullet",
        breed: "Rhode Island Red",
        age: "4month",
        ageText: "4 months",
        price: 850.00,
        description: "Growing pullet, nearly fully feathered. Ready for grower feed.",
        characteristics: "Still growing and developing; feathers are mostly fully grown in. Should be on grower feed (about 16-18% protein). Combs and wattles start to redden and enlarge as they near maturity. Roosters begin crowing and may start sparring; hens are usually not laying yet. Can live outdoors full-time if fully feathered.",
        availability: "Available",
        image: "images/Screenshot 2026-07-17 132725 (2).png"
    },
    {
        id: 2,
        name: "5-Month-Old Hen",
        breed: "Sussex",
        age: "5month",
        ageText: "5 months",
        price: 950.00,
        description: "Nearly mature, may start laying soon. Excellent quality breed.",
        characteristics: "Many hens begin laying their first small eggs. Switch to layer feed (16% protein with added calcium) around the first egg. Add nesting boxes now. Pecking order settling. Roosters clearly identifiable by larger combs, long saddle and hackle feathers, and spurs starting to develop.",
        availability: "Available",
        image: "images/Screenshot 2026-07-17 132822 (4).png"
    },
    {
        id: 3,
        name: "6-Month-Old Laying Hen",
        breed: "Leghorn",
        age: "6month",
        ageText: "6+ months",
        price: 1050.00,
        description: "Fully mature laying hen. Regular egg producer.",
        characteristics: "Fully mature and in regular laying (4-6 eggs per week). Eggs reach full size by 7-8 months. Need layer feed, grit, fresh water, and calcium supplements daily. Peak laying lasts 1-2 years; production declines annually. Can live 5-8+ years with good care.",
        availability: "Available",
        image: "images/Screenshot 2026-07-17 132725 (1).png"
    },
    {
        id: 4,
        name: "4-Month-Old Rooster",
        breed: "Australorp",
        age: "4month",
        ageText: "4 months",
        price: 800.00,
        description: "Young rooster, starting to develop characteristics.",
        characteristics: "Growing rooster; beginning to crow and show sparring behavior. Combs and wattles developing. Still on grower feed.",
        availability: "Available",
        image: "images/Screenshot 2026-07-17 132822 (1).png"
    },
    {
        id: 5,
        name: "5-Month-Old Rooster",
        breed: "Orpington",
        age: "5month",
        ageText: "5 months",
        price: 900.00,
        description: "Nearly mature rooster with good build.",
        characteristics: "Clearly identifiable by larger combs, long saddle and hackle feathers, and spurs starting to develop. May become more protective as maturity approaches.",
        availability: "Available",
        image: "images/logo (2).png"
    },
    {
        id: 6,
        name: "6-Month-Old Adult Rooster",
        breed: "Cochin",
        age: "6month",
        ageText: "6+ months",
        price: 1000.00,
        description: "Fully mature, fertile rooster for breeding.",
        characteristics: "Fully mature, fertile, and protective of the flock. Needs proper care and adequate space with hens.",
        availability: "Available",
        image: "images/sub.png"
    }
];

// Load products on products page
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    // Get filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    
    let productsToShow = chickenProducts;
    if (categoryFilter) {
        productsToShow = chickenProducts.filter(p => p.age === categoryFilter);
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === categoryFilter);
        });
    }
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = 
            <img src="" alt="" onerror="this.src='images/Screenshot 2026-07-17 132725 (2).png'">
            <div class="product-info">
                <h3></h3>
                <p class="product-age">Age:  | Breed: </p>
                <p class="product-price">₱</p>
                <p class="product-desc"></p>
                <p class="product-availability">Status: </p>
                <a href="product-detail.html?id=" class="product-btn">View Details</a>
            </div>
        ;
        productsGrid.appendChild(productCard);
    });
}

// Filter buttons functionality
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const productsGrid = document.getElementById('productsGrid');
            if (!productsGrid) return;
            
            productsGrid.innerHTML = '';
            let productsToShow = chickenProducts;
            if (filter !== 'all') {
                productsToShow = chickenProducts.filter(p => p.age === filter);
            }
            
            productsToShow.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = 
                    <img src="" alt="" onerror="this.src='images/Screenshot 2026-07-17 132725 (2).png'">
                    <div class="product-info">
                        <h3></h3>
                        <p class="product-age">Age:  | Breed: </p>
                        <p class="product-price">₱</p>
                        <p class="product-desc"></p>
                        <p class="product-availability">Status: </p>
                        <a href="product-detail.html?id=" class="product-btn">View Details</a>
                    </div>
                ;
                productsGrid.appendChild(productCard);
            });
        });
    });
}

// Load product details
function loadProductDetail() {
    const productDetail = document.getElementById('productDetail');
    if (!productDetail) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    const product = chickenProducts.find(p => p.id === productId);
    
    if (!product) {
        productDetail.innerHTML = '<p>Product not found.</p>';
        return;
    }
    
    productDetail.innerHTML = 
        <div class="product-detail-image">
            <img src="" alt="" onerror="this.src='images/Screenshot 2026-07-17 132725 (2).png'">
        </div>
        <div class="product-detail-info">
            <h2></h2>
            <p class="product-detail-breed"><strong>Breed:</strong> </p>
            <p class="product-detail-age"><strong>Age:</strong> </p>
            <p class="product-detail-price">₱</p>
            <p class="product-detail-availability"><strong>Availability:</strong> </p>
            
            <div class="product-detail-section">
                <h3>Description</h3>
                <p></p>
            </div>
            
            <div class="product-detail-section">
                <h3>Characteristics & Care Information</h3>
                <p></p>
            </div>
        </div>
    ;
}

// Admin functions
function showAddForm() {
    document.getElementById('addForm').style.display = 'block';
    document.getElementById('chickenForm').reset();
    document.getElementById('chickenId').value = '';
}

function hideAddForm() {
    document.getElementById('addForm').style.display = 'none';
}

function saveChicken(event) {
    event.preventDefault();
    
    const id = document.getElementById('chickenId').value;
    const name = document.getElementById('chickenName').value;
    const breed = document.getElementById('chickenBreed').value;
    const age = document.getElementById('chickenAge').value;
    const price = parseFloat(document.getElementById('chickenPrice').value);
    const description = document.getElementById('chickenDescription').value;
    const characteristics = document.getElementById('chickenCharacteristics').value;
    const availability = document.getElementById('chickenAvailability').value;
    
    let ageText = '';
    if (age === '4month') ageText = '4 months';
    else if (age === '5month') ageText = '5 months';
    else if (age === '6month') ageText = '6+ months';
    
    if (id) {
        // Edit existing
        const index = chickenProducts.findIndex(p => p.id == id);
        if (index !== -1) {
            chickenProducts[index] = {
                ...chickenProducts[index],
                name, breed, age, ageText, price, description, characteristics, availability
            };
        }
    } else {
        // Add new
        const newId = chickenProducts.length > 0 ? Math.max(...chickenProducts.map(p => p.id)) + 1 : 1;
        chickenProducts.push({
            id: newId,
            name, breed, age, ageText, price, description, characteristics, availability,
            image: "images/Screenshot 2026-07-17 132725 (2).png"
        });
    }
    
    hideAddForm();
    loadAdminTable();
    alert('Chicken saved successfully!');
}

function editChicken(id) {
    const product = chickenProducts.find(p => p.id == id);
    if (!product) return;
    
    document.getElementById('chickenId').value = product.id;
    document.getElementById('chickenName').value = product.name;
    document.getElementById('chickenBreed').value = product.breed;
    document.getElementById('chickenAge').value = product.age;
    document.getElementById('chickenPrice').value = product.price;
    document.getElementById('chickenDescription').value = product.description;
    document.getElementById('chickenCharacteristics').value = product.characteristics;
    document.getElementById('chickenAvailability').value = product.availability;
    
    document.getElementById('addForm').style.display = 'block';
}

function deleteChicken(id) {
    if (confirm('Are you sure you want to delete this chicken?')) {
        const index = chickenProducts.findIndex(p => p.id == id);
        if (index !== -1) {
            chickenProducts.splice(index, 1);
            loadAdminTable();
            alert('Chicken deleted successfully!');
        }
    }
}

function loadAdminTable() {
    const tableBody = document.getElementById('adminTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    chickenProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = 
            <td></td>
            <td></td>
            <td></td>
            <td>₱</td>
            <td></td>
            <td>
                <button class="action-btn" onclick="editChicken()">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteChicken()">Delete</button>
            </td>
        ;
        tableBody.appendChild(row);
    });
}

// Initialize page based on current page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initFilters();
    loadProductDetail();
    loadAdminTable();
});
