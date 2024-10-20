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
    data.append("entry.692832950", orderDetails); // ID cho chi tiết đơn hàng
    data.append("entry.339655438", total.toString()); // ID cho tổng tiền

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })
    .then(response => {
        console.log(response); // Xem phản hồi từ Google Form
        if (response.ok) {
            alert('Đơn hàng của bạn đã được gửi đi!');
            console.log('Order sent successfully');
            cart = []; // Xóa giỏ hàng sau khi đặt hàng
            updateCart(); // Cập nhật giỏ hàng
        } else {
            alert('Có lỗi xảy ra khi gửi đơn hàng, vui lòng thử lại!');
            console.error('Error sending order:', response.statusText);
        }
    })
    .catch(error => {
        alert('Có lỗi xảy ra khi gửi đơn hàng, vui lòng thử lại!');
        console.error('Error:', error);
    });
}
