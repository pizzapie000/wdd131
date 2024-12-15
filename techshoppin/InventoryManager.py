import json
import csv
from datetime import datetime
import matplotlib.pyplot as plt
import pandas as pd
import tkinter as tk
from tkinter import messagebox

# List of brand names
brands = [
    "Aigo", "Antec", "AOpen", "ASRock", "Asus", "be quiet!", "CaseLabs", "Chassis Plans",
    "Cooler Master", "Corsair", "Deepcool", "DFI", "ECS", "EVGA Corporation", "Foxconn",
    "Fractal Design", "Gigabyte Technology", "IBall", "In Win Development", "Lian Li", "MSI",
    "MiTAC", "NZXT", "Phanteks", "Razer", "Rosewill", "Seasonic", "Shuttle", "Thermaltake",
    "XFX", "XPG", "Zalman", "AMD", "Intel", "Nvidia", "Microsoft", "Sony", "Apple", "Qualcomm",
    "Sapphire", "Samsung", "Kioxia"
]

def load_products(filename):
    try:
        with open(filename, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_products(filename, products):
    with open(filename, 'w') as file:
        json.dump(products, file, indent=4)

def count_brand_products(products, brand):
    count = sum(1 for name in products if brand.lower() in name.lower())
    return count

def check_duplicate_name(products, name):
    for existing_name in products.keys():
        if any(word in existing_name.split() for word in name.split()):
            response = input(f"Product name '{name}' contains words from existing product '{existing_name}'. Is it different? (yes/no): ")
            if response.lower() != 'yes':
                return False
    return True

def add_product(products, name, cost, image, rating):
    products[name] = {
        'cost': cost,
        'image': image,
        'rating': rating,
        'added_on': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    print(f"Product '{name}' added successfully.")

    # Check and display the number of products from the same brand
    for brand in brands:
        if brand.lower() in name.lower():
            count = count_brand_products(products, brand)
            print(f"You now have {count} product(s) from {brand}.")

def delete_product(products, name):
    if name in products:
        del products[name]
        print(f"Product '{name}' deleted successfully.")
    else:
        print(f"Product '{name}' not found.")

def get_product_details():
    name = input("Enter product name: ")
    cost = float(input("Enter product cost: "))
    image = input("Enter image file name: ")
    rating = int(input("Enter product rating (1-5): "))
    return name, cost, image, rating

def export_to_csv(products, filename):
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Name', 'Cost', 'Image', 'Rating'])
        for name, details in products.items():
            writer.writerow([name, details['cost'], details['image'], details['rating']])

def import_from_csv(filename):
    products = {}
    with open(filename, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            products[row['Name']] = {
                'cost': float(row['Cost']),
                'image': row['Image'],
                'rating': int(row['Rating'])
            }
    return products

def plot_ratings(products):
    ratings = [details['rating'] for details in products.values()]
    plt.hist(ratings, bins=range(1, 7), edgecolor='black')
    plt.xlabel('Rating')
    plt.ylabel('Number of Products')
    plt.title('Product Ratings Distribution')
    plt.show()

def add_product_gui(products):
    def submit():
        name = name_entry.get()
        cost = float(cost_entry.get())
        image = image_entry.get()
        rating = int(rating_entry.get())
        add_product(products, name, cost, image, rating)
        save_products('products.json', products)
        messagebox.showinfo("Success", f"Product '{name}' added successfully.")
        root.destroy()

    root = tk.Tk()
    root.title("Add Product")
    root.geometry("400x300")

    tk.Label(root, text="Name").grid(row=0)
    tk.Label(root, text="Cost").grid(row=1)
    tk.Label(root, text="Image").grid(row=2)
    tk.Label(root, text="Rating").grid(row=3)

    name_entry = tk.Entry(root)
    cost_entry = tk.Entry(root)
    image_entry = tk.Entry(root)
    rating_entry = tk.Entry(root)

    name_entry.grid(row=0, column=1)
    cost_entry.grid(row=1, column=1)
    image_entry.grid(row=2, column=1)
    rating_entry.grid(row=3, column=1)

    tk.Button(root, text="Submit", command=submit).grid(row=4, column=1)

    root.mainloop()

def main():
    filename = 'products.json'
    products = load_products(filename)

    while True:
        print("\n1. Add Product")
        print("2. View Products")
        print("3. Delete Product")
        print("4. Export to CSV")
        print("5. Import from CSV")
        print("6. Plot Ratings")
        print("7. Add Product (GUI)")
        print("8. Exit")
        choice = input("Enter your choice: ")

        if choice == '1':
            name, cost, image, rating = get_product_details()
            if check_duplicate_name(products, name):
                add_product(products, name, cost, image, rating)
                save_products(filename, products)
        elif choice == '2':
            for name, details in products.items():
                print(f"Name: {name}, Cost: ${details['cost']}, Image: {details['image']}, Rating: {details['rating']} stars")
        elif choice == '3':
            name = input("Enter the name of the product to delete: ")
            delete_product(products, name)
            save_products(filename, products)
        elif choice == '4':
            export_to_csv(products, 'products.csv')
            print("Products exported to products.csv")
        elif choice == '5':
            products = import_from_csv('products.csv')
            save_products(filename, products)
            print("Products imported from products.csv")
        elif choice == '6':
            plot_ratings(products)
        elif choice == '7':
            add_product_gui(products)
        elif choice == '8':
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
