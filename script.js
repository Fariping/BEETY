document.addEventListener('DOMContentLoaded', function() {
    const MAX_TOTAL_ORDERS = 30;  
    const BEEF_PRICE = 15;        
    const CHICKEN_PRICE = 8;       

    const orderForm = document.getElementById('order-form');
    const soldOutMessage = document.getElementById('sold-out-message');
    const remainingCounter = document.getElementById('remaining-meals');

    function checkOrderLimit(beefQty, chickenQty) {
        const totalNewOrders = beefQty + chickenQty;
        
        if (totalNewOrders > MAX_TOTAL_ORDERS) {
            soldOutMessage.style.display = "block";
            orderForm.style.display = "none";
            return false;
        }

        const remaining = MAX_TOTAL_ORDERS - totalNewOrders;
        remainingCounter.textContent = `الوجبات المتبقية: ${remaining}`;
        return true;
    }

    const beefInput = document.getElementById('beef-meal');
    const chickenInput = document.getElementById('chicken-meal');

    [beefInput, chickenInput].forEach(input => {
        input.addEventListener('input', function() {
            const beefQty = parseInt(beefInput.value) || 0;
            const chickenQty = parseInt(chickenInput.value) || 0;
            checkOrderLimit(beefQty, chickenQty);
        });
    });

    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(beefInput.value) || 0;
        const chickenQuantity = parseInt(chickenInput.value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

        if (!name || name.length < 2) {
            alert("يرجى إدخال اسم صحيح");
            return;
        }

        if (!phone || phone.length < 8) {
            alert("يرجى إدخال رقم جوال صحيح");
            return;
        }

        if ((beefQuantity + chickenQuantity) === 0) {
            alert("يرجى اختيار وجبة واحدة على الأقل");
            return;
        }

        const totalSideDishes = sideDish1 + sideDish2;
        if (totalSideDishes > (beefQuantity + chickenQuantity)) {
            alert("عدد الأطباق الجانبية لا يمكن أن يتجاوز عدد الوجبات");
            return;
        }

        const totalPrice = (beefQuantity * BEEF_PRICE) + (chickenQuantity * CHICKEN_PRICE);

        const templateParams = {
            from_name: name,
            phone: phone,
            beef_quantity: beefQuantity,
            chicken_quantity: chickenQuantity,
            side_dish1: sideDish1,
            side_dish2: sideDish2,
            total_price: totalPrice
        };

        const submitButton = document.getElementById("submit-order");
        submitButton.disabled = true;
        submitButton.textContent = "جاري إرسال الطلب...";

        // تم تحديث معرف القالب هنا
        emailjs.send("service_t9ogwct", "template_0hkm9zd", templateParams)
            .then(function(response) {
                alert("تم إرسال الطلب بنجاح!");
                orderForm.reset();
                checkOrderLimit(0, 0);
            })
            .catch(function(error) {
                console.error("Error:", error);
                alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
            })
            .finally(function() {
                submitButton.disabled = false;
                submitButton.textContent = "إرسال الطلب";
            });
    });

    checkOrderLimit(0, 0);
});