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
    
    // Gửi dữ liệu đến Google Form
    sendOrderToGoogleForm(orderDetails, total);

    alert('Đơn hàng của bạn đã được gửi đi!');
    cart = []; // Xóa giỏ hàng sau khi đặt hàng
    updateCart(); // Cập nhật giỏ hàng
}

function sendOrderToGoogleForm(orderDetails, total) {
    const url = "https://docs.google.com/forms/d/101Ky21Gx_iCfEOhnyAiCDoqvBhn72PRN5bi8Po-QlkA/edit"; // Thay thế bằng URL Google Form của bạn

    // Gửi dữ liệu đến Google Form
    const data = new URLSearchParams();
    data.append("entry.XXXXXXX", orderDetails); // Thay thế XXXX bằng ID của trường
    data.append("entry.YYYYYYY", total); // Thay thế YYYYYY bằng ID của trường

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
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
