import re

with open('aws_live.html', 'r', encoding='utf-8') as f:
    html = f.read()

def clean(text):
    text = re.sub(r'<[^>]+>', ' ', text)
    for ent, rep in [('&amp;','&'),('&nbsp;',' '),('&#8217;',"'"),('&#8216;',"'"),
                     ('&#038;','&'),('&#8220;','"'),('&#8221;','"'),('&#8230;','...'),
                     ('&lt;','<'),('&gt;','>'),('&#60;','<')]:
        text = text.replace(ent, rep)
    return re.sub(r'\s+', ' ', text).strip()

main_match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
content = main_match.group(1) if main_match else html

sections = list(re.finditer(r'<section([^>]*)>(.*?)(?=<section|</main)', content, re.DOTALL))
print(f"Total sections: {len(sections)}\n")

for i, match in enumerate(sections):
    attrs = match.group(1)
    sec_content = match.group(2)
    headings = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', sec_content, re.DOTALL)
    headings_clean = [(tag, clean(text)) for tag, text in headings if clean(text)]
    paras = re.findall(r'<p[^>]*>(.*?)</p>', sec_content, re.DOTALL)
    para_text = [clean(p) for p in paras if len(clean(p)) > 15]
    list_items = re.findall(r'<li[^>]*>(.*?)</li>', sec_content, re.DOTALL)
    items_clean = [clean(li) for li in list_items if clean(li)]
    
    id_match = re.search(r'id="([^"]*)"', attrs)
    sec_id = id_match.group(1) if id_match else ''

    print(f"=== SECTION {i+1} [id='{sec_id}'] ===")
    for tag, h in headings_clean:
        print(f"  [{tag.upper()}] {h}")
    for p in para_text[:6]:
        print(f"  [P] {p[:300]}")
    if items_clean:
        print(f"  [LIST] {len(items_clean)} items:")
        for item in items_clean[:12]:
            print(f"    - {item[:180]}")
    print()

