function order(item) {
    const orderSummary = document.getElementById("order-summary");
    orderSummary.innerHTML += `<p>Đã đặt: ${item}</p>`;
}
