import csv

# Reed CVS Files
file_a_path = 'path/to/file_a.csv'
file_b_path = 'path/to/file_b.csv'

users_a = {}
users_b = {}

with open(file_a_path, 'r') as file_a:
    reader = csv.DictReader(file_a)
    for row in reader:
        users_a[row['user_id']] = {'email': row['email']}

with open(file_b_path, 'r') as file_b:
    reader = csv.DictReader(file_b)
    for row in reader:
        user_id = row['user_id']
        users_b[user_id] = {'first_name': row['first_name'], 'last_name': row['last_name']}

# Generate the combined file
merged_data = []
for user_id, user_data_b in users_b.items():
    if user_id in users_a:
        user_data_a = users_a[user_id]
        merged_data.append({
            'user_id': user_id,
            'email': user_data_a['email'],
            'first_name': user_data_b['first_name'],
            'last_name': user_data_b['last_name']
        })

# Save the combined file in CSV format
merged_file_path = 'path/to/merged_file.csv'
fieldnames = ['user_id', 'email', 'first_name', 'last_name']

with open(merged_file_path, 'w', newline='') as merged_file:
    writer = csv.DictWriter(merged_file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(merged_data)

