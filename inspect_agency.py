import re

with open('agency_live.html', 'r', encoding='utf-8') as f:
    html = f.read()

main_match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
content = main_match.group(1) if main_match else html

sections = list(re.finditer(r'<section([^>]*)>(.*?)(?=</section>)', content, re.DOTALL))
print(f"Total sections: {len(sections)}")

for i, match in enumerate(sections):
    attrs = match.group(1)
    sec_content = match.group(2)
    h = re.search(r'<(h[1-4])[^>]*>(.*?)</\1>', sec_content, re.DOTALL)
    h_text = re.sub(r'<[^>]+>', '', h.group(2)).strip() if h else 'NO HEADING'
    c_match = re.search(r'class="([^"]*)"', attrs)
    cls = c_match.group(1) if c_match else ''
    id_match = re.search(r'id="([^"]*)"', attrs)
    sec_id = id_match.group(1) if id_match else ''
    print(f"\n--- Section {i+1} [class='{cls}'] [id='{sec_id}'] ---")
    print(f"Heading: {h_text}")
    # print first 200 chars of text
    clean_text = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', sec_content)).strip()
    print(f"Text snippet: {clean_text[:250]}...")

