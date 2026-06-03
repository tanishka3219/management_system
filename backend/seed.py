from database import SessionLocal, engine
import models

db = SessionLocal()

# Check if tables exist, if not create them
models.Base.metadata.create_all(bind=engine)

# Seed Products
products_data = [
    {"product_name": "iPhone 15 Pro", "sku": "IPHONE15PRO", "description": "Apple iPhone 15 Pro 256GB Space Black", "price": 999.00, "quantity_in_stock": 45},
    {"product_name": "MacBook Pro M3", "sku": "MACBOOKPROM3", "description": "Apple MacBook Pro 14 inch M3 16GB 512GB", "price": 1599.00, "quantity_in_stock": 20},
    {"product_name": "Sony WH-1000XM5", "sku": "SONYXM5", "description": "Sony Noise Cancelling Wireless Headphones", "price": 349.00, "quantity_in_stock": 8},
    {"product_name": "Logitech MX Master 3S", "sku": "MXMASTER3S", "description": "Logitech Ergonomic Wireless Mouse", "price": 99.00, "quantity_in_stock": 60},
    {"product_name": "Dell UltraSharp 27", "sku": "DELLU27", "description": "Dell U2723QE 27 inch 4K USB-C Hub Monitor", "price": 499.00, "quantity_in_stock": 15}
]

for p in products_data:
    existing = db.query(models.Product).filter(models.Product.sku == p["sku"]).first()
    if not existing:
        db_product = models.Product(**p)
        db.add(db_product)

# Seed Customers
customers_data = [
    {"full_name": "Alice Vance", "email": "alice@gmail.com", "phone_number": "+1-555-0199"},
    {"full_name": "Bob Vance", "email": "bob@gmail.com", "phone_number": "+1-555-0144"},
    {"full_name": "Charlie Brown", "email": "charlie@gmail.com", "phone_number": "+1-555-0122"}
]

for c in customers_data:
    existing = db.query(models.Customer).filter(models.Customer.email == c["email"]).first()
    if not existing:
        db_customer = models.Customer(**c)
        db.add(db_customer)

db.commit()

# Seed a couple of Orders if they don't exist yet
# Find seeded customers and products
db_customers = db.query(models.Customer).all()
db_products = db.query(models.Product).all()

if db_customers and db_products and db.query(models.Order).count() == 0:
    # Create order 1 for Alice
    order1 = models.Order(customer_id=db_customers[0].id, total_amount=1348.00, order_status="Completed")
    db.add(order1)
    db.commit()
    db.refresh(order1)
    
    item1 = models.OrderItem(order_id=order1.id, product_id=db_products[0].id, quantity=1, unit_price=999.00, subtotal=999.00)
    item2 = models.OrderItem(order_id=order1.id, product_id=db_products[2].id, quantity=1, unit_price=349.00, subtotal=349.00)
    db.add(item1)
    db.add(item2)
    
    # Create order 2 for Bob
    order2 = models.Order(customer_id=db_customers[1].id, total_amount=99.00, order_status="Pending")
    db.add(order2)
    db.commit()
    db.refresh(order2)
    
    item3 = models.OrderItem(order_id=order2.id, product_id=db_products[3].id, quantity=1, unit_price=99.00, subtotal=99.00)
    db.add(item3)
    
    db.commit()

db.close()
print("Database successfully seeded with mock products, customers, and orders!")
