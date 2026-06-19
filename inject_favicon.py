import os
import glob

def inject_favicon():
    html_files = glob.glob('*.html')
    print("Found files:", html_files)
    favicon_tag = '    <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">\n'
    
    for file in html_files:
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if 'favicon.svg' in content:
                print(f"Already in {file}")
                continue
                
            if '<head>' in content:
                content = content.replace('<head>', f'<head>\n{favicon_tag}', 1)
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Injected favicon into {file}")
            else:
                print(f"No <head> tag found in {file}")
        except Exception as e:
            print(f"Error processing {file}: {e}")

if __name__ == '__main__':
    inject_favicon()
