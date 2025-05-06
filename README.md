ใช้สำหรับทดสอบ

วิธีติดตั้งโปรเจ็ค
git clone https://github.com/Shanakan78/testService.git

วิธี run database
  - ติดตั้ง mysql-installer-community
  - ใช้โปรแกรมที่เป็นเครื่องมือที่ใช้ในการจัดการ database 
  - สร้าง database ชื่อ testdata จากนั้นเลือก sql และทำการ excute จาก sql ด้านล่าง


============================================================================================ 

CREATE TABLE Product (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
price REAL NOT NULL
);
CREATE TABLE CartItem (
id INTEGER PRIMARY KEY AUTOINCREMENT, productId INTEGER,
quantity INTEGER NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (productId) REFERENCES Product(id)
);

=============================================================================================

ตัวอย่าง API request/response

# ดึงข้อมูลสินค้า
request (GET) : http://localhost:3000/products 
# response
[
    {
        "id": 1,
        "name": "หมอน",
        "price": 250
    },
    {
        "id": 2,
        "name": "ผ้าห่ม",
        "price": 500
    },
    {
        "id": 3,
        "name": "แก้วน้ำ",
        "price": 120
    }
]


# เพิ่มข้อมูลสินค้า
request (POST) : http://localhost:3000/cart 
body json : 
------------------
# json data
{
"productId": 1,
"quantity": 2
}
-------------------------------------------
# response 
{
    "id": 1,
    "productId": 1,
    "product": {
        "id": 1,
        "name": "หมอน",
        "price": 250
    },
    "quantity": 2,
    "createdAt": "2025-05-04T10:46:47.000Z",
    "updatedAt": "2025-05-04T10:46:47.000Z"
}
------------------------------------------

# ข้อมูลคำสั่งซื้อสินค้าในตะกร้า
request (GET) : http://localhost:3000/cart 
--------------------------------------------------
# response 
{
    "items": [
        {
            "id": 1,
            "name": "หมอน",
            "quantity": 2,
            "unitPrice": 250,
            "totalPrice": 500
        }
    ],
    "totalQuantity": 2,
    "totalPrice": 500
}
---------------------------------------------------

# ลบข้อมูลคำสั่งซื้อสินค้าในตะกร้า
request (DELETE) : http://localhost:3000/:cartItemId 
--------------------------------------------------
# response 
{
    "message": "Item removed"
}
---------------------------------------------------
