// script.js
let cart = [];

// Thêm món vào giỏ hàng
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}

// Cập nhật nội dung giỏ hàng hiển thị trên trang
function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Xóa nội dung hiện tại
    cart.forEach((entry) => {
        const div = document.createElement('div');
        div.innerText = `${entry.item} - ${entry.price} VNĐ`;
        cartDiv.appendChild(div);
    });
}

// Xử lý đặt hàng
function placeOrder() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống! Vui lòng thêm món vào giỏ hàng trước khi đặt hàng.');
        return;
    }

    const orderDetails = cart.map(entry => `${entry.item} - ${entry.price} VNĐ`).join(", ");
    const total = cart.reduce((sum, entry) => sum + entry.price, 0);
    
    // Gửi dữ liệu đến Google Form
    sendOrderToGoogleForm(orderDetails, total);
}

// Gửi đơn hàng đến Google Form
function sendOrderToGoogleForm(orderDetails, total) {
    const url = "https://docs.google.com/forms/d/e/101Ky21Gx_iCfEOhnyAiCDoqvBhn72PRN5bi8Po-QlkA/formResponse"; // URL gửi dữ liệu đến Google Form

    // Gửi dữ liệu đến Google Form
    const data = new URLSearchParams();
    data.append("entry.1950817408", orderDetails); // Thay thế XXXX bằng ID của trường cho đơn hàng
    data.append("entry.1203383195", total); // Thay thế YYYYYY bằng ID của trường cho tổng tiền

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })
    .then(response => {
        if (response.ok) {
            alert('Đơn hàng của bạn đã được gửi đi!');
            console.log('Order sent successfully');
            cart = []; // Xóa giỏ hàng sau khi đặt hàng
            updateCart(); // Cập nhật giỏ hàng
        } else {
            console.error('Error sending order');
        }
    })
    .catch(error => console.error('Error:', error));
}
