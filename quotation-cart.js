// ========================================
// ALSHAMI - Quotation Cart System
// نظام سلة عروض الأسعار الموحد
// ========================================

function getQuotationCart() {
    return JSON.parse(
        localStorage.getItem("alshamiQuotationCart")
    ) || [];
}


function saveQuotationCart(cart) {
    localStorage.setItem(
        "alshamiQuotationCart",
        JSON.stringify(cart)
    );
}


// إضافة عنصر إلى عرض السعر
function addToQuotation(item) {

    let cart = getQuotationCart();


    // البحث إذا كان المنتج موجود مسبقاً
    let existingItem = cart.find(function(cartItem) {

        return cartItem.name === item.name &&
               cartItem.category === item.category;

    });


    if (existingItem) {

        // زيادة الكمية إذا كان موجوداً
        existingItem.quantity += Number(item.quantity);

        existingItem.total =
            existingItem.quantity *
            existingItem.price;

    } else {

        // إضافة المنتج الجديد
        cart.push({

            id: Date.now(),

            name: item.name,

            category: item.category || "",

            quantity: Number(item.quantity) || 1,

            price: Number(item.price) || 0,

            total:
                (Number(item.quantity) || 1) *
                (Number(item.price) || 0)

        });

    }


    saveQuotationCart(cart);


    alert(
        "تمت إضافة العنصر إلى عرض السعر بنجاح"
    );

}


// حذف عنصر
function removeFromQuotation(id) {

    let cart = getQuotationCart();

    cart = cart.filter(function(item) {

        return item.id !== id;

    });

    saveQuotationCart(cart);

}


// تفريغ السلة
function clearQuotationCart() {

    localStorage.removeItem(
        "alshamiQuotationCart"
    );

}


// حساب إجمالي السلة
function getQuotationTotal() {

    let cart = getQuotationCart();

    return cart.reduce(function(total, item) {

        return total +
            (Number(item.total) || 0);

    }, 0);

}