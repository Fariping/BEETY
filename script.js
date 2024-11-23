// تكوين EmailJS
const EMAILJS_USER_ID = "-_n0qbKnDcV32oAOP";
const EMAILJS_SERVICE_ID = "service_t9ogwct";
const EMAILJS_TEMPLATE_ID = "template_0hkm9zd";

async function sendEmail(templateParams) {
    const url = 'https://api.emailjs.com/api/v1.0/email/send';
    const data = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_USER_ID,
        template_params: templateParams
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': window.location.origin
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById("submit-order");
    submitButton.disabled = true;
    
    try {
        // جمع البيانات
        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

        // التحقق من البيانات
        if (!name || !phone) {
            throw new Error('يرجى تعبئة جميع الحقول المطلوبة');
        }

        // إعداد بيانات الطلب
        const templateParams = {
            from_name: name,
            phone: phone,
            order_details: `
                وجبة لحم: ${beefQuantity}
                وجبة دجاج: ${chickenQuantity}
                سحاوق مع عشار: ${sideDish1}
                سلطة خيار مع زبادي: ${sideDish2}
            `,
            total_price: (beefQuantity + chickenQuantity) * 15
        };

        // محاولة الإرسال
        await sendEmail(templateParams);
        
        // نجاح الإرسال
        alert('تم إرسال الطلب بنجاح!');
        document.getElementById("orderForm").reset();

    } catch (error) {
        console.error('Error details:', error);
        
        // إنشاء نص الطلب للنسخ الاحتياطي
        const orderDetails = `
            الاسم: ${name}
            رقم الجوال: ${phone}
            الطلب:
            - وجبة لحم: ${beefQuantity}
            - وجبة دجاج: ${chickenQuantity}
            - سحاوق مع عشار: ${sideDish1}
            - سلطة خيار مع زبادي: ${sideDish2}
            السعر الإجمالي: ${(beefQuantity + chickenQuantity) * 15} ريال
        `;

        // إنشاء زر واتساب مع تفاصيل الطلب
        const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodeURIComponent(orderDetails)}`;
        
        const errorMessage = `
            عذراً، حدث خطأ أثناء إرسال الطلب.
            يمكنك:
            1. إرسال الطلب عبر واتساب
            2. المحاولة مرة أخرى لاحقاً
            3. الاتصال بنا مباشرة على الرقم: [رقم الهاتف]
        `;

        alert(errorMessage);

        // إضافة أزرار بديلة
        const alternativeButtons = document.createElement('div');
        alternativeButtons.innerHTML = `
            <button onclick="window.open('${whatsappUrl}', '_blank')" class="whatsapp-btn">
                إرسال الطلب عبر واتساب
            </button>
            <button onclick="window.location.href='tel:YOUR_PHONE_NUMBER'" class="call-btn">
                اتصال مباشر
            </button>
        `;
        
        const form = document.getElementById('orderForm');
        if (!form.querySelector('.alternative-buttons')) {
            form.appendChild(alternativeButtons);
        }
    } finally {
        submitButton.disabled = false;
    }
    
    return false;
}

// إضافة CSS للأزرار
const style = document.createElement('style');
style.textContent = `
    .whatsapp-btn, .call-btn {
        display: block;
        width: 100%;
        margin: 10px 0;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    }
    .whatsapp-btn {
        background-color: #25D366;
        color: white;
    }
    .call-btn {
        background-color: #007bff;
        color: white;
    }
`;
document.head.appendChild(style);
