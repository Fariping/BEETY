// إضافة فحص لحالة الحظر
function checkBlockedStatus() {
    return new Promise((resolve, reject) => {
        const testImage = new Image();
        testImage.onload = () => resolve(false);
        testImage.onerror = () => resolve(true);
        testImage.src = 'https://api.emailjs.com/favicon.ico';
    });
}

// تحسين دالة الإرسال
async function handleSubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById("submit-order");
    submitButton.disabled = true;
    
    try {
        // التحقق من وجود حظر
        const isBlocked = await checkBlockedStatus();
        if (isBlocked) {
            throw new Error(
                "يبدو أن هناك مانع إعلانات يمنع إرسال الطلب. " +
                "الرجاء تعطيل مانع الإعلانات أو استخدام طريقة اتصال بديلة:"
            );
        }

        // جمع البيانات
        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

        // إنشاء نص الطلب كاحتياطي
        const orderText = `
            الاسم: ${name}
            رقم الجوال: ${phone}
            وجبة لحم: ${beefQuantity}
            وجبة دجاج: ${chickenQuantity}
            سحاوق مع عشار: ${sideDish1}
            سلطة خيار مع زبادي: ${sideDish2}
            السعر الإجمالي: ${(beefQuantity + chickenQuantity) * 15} ريال
        `;

        // محاولة الإرسال عبر EmailJS
        const templateParams = {
            from_name: name,
            phone: phone,
            beefQuantity,
            chickenQuantity,
            sideDish1,
            sideDish2,
            total_price: (beefQuantity + chickenQuantity) * 15,
            order_text: orderText
        };

        const response = await emailjs.send(
            "service_t9ogwct",
            "template_0hkm9zd",
            templateParams
        );

        if (response.status === 200) {
            alert("تم إرسال الطلب بنجاح!");
            document.getElementById("orderForm").reset();
        } else {
            // إذا فشل الإرسال، نقدم خيارات بديلة
            throw new Error("فشل إرسال الطلب");
        }

    } catch (error) {
        console.error("تفاصيل الخطأ:", error);
        
        // عرض رسالة خطأ مع خيارات بديلة
        const errorMessage = `
            ${error.message}
            
            يمكنك إرسال الطلب عبر:
            1. واتساب: [رقم الواتساب]
            2. الاتصال مباشرة: [رقم الهاتف]
            3. تعطيل مانع الإعلانات والمحاولة مرة أخرى
        `;
        
        alert(errorMessage);
        
        // إضافة أزرار للطرق البديلة
        const alternativeButtons = document.createElement('div');
        alternativeButtons.className = 'alternative-contact';
        alternativeButtons.innerHTML = `
            <button onclick="window.open('https://wa.me/YOUR_WHATSAPP_NUMBER', '_blank')">
                إرسال عبر واتساب
            </button>
            <button onclick="window.location.href='tel:YOUR_PHONE_NUMBER'">
                اتصال مباشر
            </button>
        `;
        
        document.getElementById('orderForm').appendChild(alternativeButtons);
    } finally {
        submitButton.disabled = false;
    }
    
    return false;
}
