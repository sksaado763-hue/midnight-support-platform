import re

with open('agency_live.html', 'r', encoding='utf-8') as f:
    html = f.read()

def clean(text):
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'&#8217;', "'", text)
    text = re.sub(r'&#038;', '&', text)
    text = re.sub(r'&#8220;', '"', text)
    text = re.sub(r'&#8221;', '"', text)
    text = re.sub(r'&#8230;', '...', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

main_match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
content = main_match.group(1) if main_match else html

sections = list(re.finditer(r'<section([^>]*)>(.*?)(?=<section|</main)', content, re.DOTALL))

# Print sections 7, 10, 16 in detail
for i in [6, 9, 15, 17, 18]:  # 0-indexed
    if i >= len(sections):
        continue
    match = sections[i]
    attrs = match.group(1)
    sec_content = match.group(2)
    headings = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', sec_content, re.DOTALL)
    headings_clean = [(tag, clean(text)) for tag, text in headings if clean(text)]
    
    paras = re.findall(r'<p[^>]*>(.*?)</p>', sec_content, re.DOTALL)
    para_text = [clean(p) for p in paras if clean(p)]
    
    list_items = re.findall(r'<li[^>]*>(.*?)</li>', sec_content, re.DOTALL)
    items_clean = [clean(li) for li in list_items if clean(li)]
    
    print(f"=== SECTION {i+1} ===")
    for tag, h in headings_clean:
        print(f"  [{tag.upper()}] {h}")
    for p in para_text:
        if len(p) > 20:
            print(f"  [P] {p[:500]}")
    if items_clean:
        print(f"  [LIST] ({len(items_clean)} items):")
        for item in items_clean:
            print(f"    - {item[:200]}")
    print()

