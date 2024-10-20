let menu = [];
let selectedItems = [];
let totalAmount = 0;

// Lấy menu từ server backend
fetch('https://your-backend.herokuapp.com/menu')
    .then(response => response.json())
    .then(data => {
        menu = data;
        displayMenu();
    });

function displayMenu() {
    const menuContainer = document.getElementById('menu');
    menu.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-item');
        div.innerHTML = `
            <span>${item.name} - ${item.price} VND</span>
            <button onclick="addToOrder(${item.id})">Chọn</button>
        `;
        menuContainer.appendChild(div);
    });
}

function addToOrder(itemId) {
    const item = menu.find(i => i.id === itemId);
    selectedItems.push(item);
    totalAmount += item.price;
    updateOrderSummary();
}

function updateOrderSummary() {
    const summary = document.getElementById('order-summary');
    if (selectedItems.length === 0) {
        summary.innerHTML = 'Chưa có món nào được chọn.';
        document.getElementById('order-btn').disabled = true;
    } else {
        summary.innerHTML = selectedItems.map(item => `<p>${item.name} - ${item.price} VND</p>`).join('');
        summary.innerHTML += `<p>Tổng cộng: ${totalAmount} VND</p>`;
        document.getElementById('order-btn').disabled = false;
    }
}

document.getElementById('order-btn').addEventListener('click', () => {
    const customerName = prompt('Nhập tên của bạn:');
    if (!customerName) return;

    const orderData = {
        customerName,
        items: selectedItems,
        totalAmount
    };

    fetch('https://your-backend.herokuapp.com/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Đặt hàng thành công! Mã đơn hàng của bạn là: ' + data.orderId);
        selectedItems = [];
        totalAmount = 0;
        updateOrderSummary();
    });
});
