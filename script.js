document.getElementById('submit-order').addEventListener('click', function () {
    const name = document.querySelector('.user-details input[placeholder="الاسم"]').value;
    const phone = document.querySelector('.user-details input[placeholder="رقم الجوال"]').value;

    if (!name || !phone) {
        alert('يرجى إدخال الاسم ورقم الجوال');
        return;
    }

    alert(`شكراً لطلبك، ${name}! سيتم التواصل معك قريباً.`);
});
