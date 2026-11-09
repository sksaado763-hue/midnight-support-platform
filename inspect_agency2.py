import re

with open('agency_live.html', 'r', encoding='utf-8') as f:
    html = f.read()

def clean(text):
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'&#8217;', "'", text)
    text = re.sub(r'&#038;', '&', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

main_match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
content = main_match.group(1) if main_match else html

# Extract sections with full text
sections = list(re.finditer(r'<section([^>]*)>(.*?)(?=<section|</main)', content, re.DOTALL))
print(f"Total sections: {len(sections)}\n")

for i, match in enumerate(sections):
    attrs = match.group(1)
    sec_content = match.group(2)
    headings = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', sec_content, re.DOTALL)
    headings_clean = [(tag, clean(text)) for tag, text in headings if clean(text)]
    
    # get all paragraph text
    paras = re.findall(r'<p[^>]*>(.*?)</p>', sec_content, re.DOTALL)
    para_text = [clean(p) for p in paras if clean(p)]
    
    # lists
    list_items = re.findall(r'<li[^>]*>(.*?)</li>', sec_content, re.DOTALL)
    items_clean = [clean(li) for li in list_items if clean(li)]
    
    print(f"=== SECTION {i+1} ===")
    for tag, h in headings_clean:
        print(f"  [{tag.upper()}] {h}")
    for p in para_text[:5]:
        if len(p) > 20:
            print(f"  [P] {p[:300]}")
    if items_clean:
        print(f"  [LIST] ({len(items_clean)} items):")
        for item in items_clean[:10]:
            print(f"    - {item[:150]}")
    print()

