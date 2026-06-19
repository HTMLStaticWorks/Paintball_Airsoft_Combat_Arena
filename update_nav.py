import os
import glob

def update_nav():
    work_dir = r"d:\OFFICE\LIVE\JUNE[16-06-26]\Paintball & Airsoft Combat Arena"
    os.chdir(work_dir)
    html_files = glob.glob('*.html')
    
    replace_normal = '<a href="pricing.html" class="nav-link">Pricing</a>\n            <a href="contact.html" class="nav-link">Contact</a>'
    replace_active_pricing = '<a href="pricing.html" class="nav-link active">Pricing</a>\n            <a href="contact.html" class="nav-link">Contact</a>'
    
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Add Contact after Pricing
        if '<a href="pricing.html" class="nav-link">Pricing</a>' in content:
            content = content.replace('<a href="pricing.html" class="nav-link">Pricing</a>', replace_normal)
        elif '<a href="pricing.html" class="nav-link active">Pricing</a>' in content:
            content = content.replace('<a href="pricing.html" class="nav-link active">Pricing</a>', replace_active_pricing)
            
        # Fix contact.html to make Contact active
        if file == 'contact.html':
            content = content.replace('<a href="contact.html" class="nav-link">Contact</a>', '<a href="contact.html" class="nav-link active">Contact</a>')
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            
if __name__ == '__main__':
    update_nav()
    print("Nav bar updated successfully.")
