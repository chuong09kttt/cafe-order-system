// script.js
let cart = [];

function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Xóa nội dung hiện tại
    cart.forEach((entry) => {
        const div = document.createElement('div');
        div.innerText = `${entry.item} - ${entry.price} VNĐ`;
        cartDiv.appendChild(div);
    });
}

function placeOrder() {
    const orderDetails = cart.map(entry => `${entry.item} - ${entry.price} VNĐ`).join(", ");
    const total = cart.reduce((sum, entry) => sum + entry.price, 0);
    
    // Gửi dữ liệu đến Google Sheets API
    sendOrderToGoogleSheets(orderDetails, total);

    alert('Đơn hàng của bạn đã được gửi đi!');
    cart = []; // Xóa giỏ hàng sau khi đặt hàng
    updateCart(); // Cập nhật giỏ hàng
}

function sendOrderToGoogleSheets(orderDetails, total) {
    const url = "https://docs.google.com/spreadsheets/d/1xT89qFLUZT_nkOgNrnNEb4l3FP9So96WOHT4h_ceU0A/edit?resourcekey=&gid=2037062635#gid=2037062635"; // Thay thế bằng URL của Google Sheets API

    const data = {
        orderDetails: orderDetails,
        total: total,
        timestamp: new Date().toISOString()
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Order sent successfully');
        } else {
            console.error('Error sending order');
        }
    })
    .catch(error => console.error('Error:', error));
}
