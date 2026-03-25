import os
import re

def extract_text_from_react(directory):
    knowledge = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.jsx')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Simple regex to find text between tags and in strings
                    text_matches = re.findall(r'>([^<]+)<', content)
                    for text in text_matches:
                        clean_text = text.strip()
                        if clean_text and len(clean_text) > 10:
                            knowledge.append(f"[{file}] {clean_text}")
    return "\n".join(knowledge)

if __name__ == "__main__":
    components_path = "e:/ARCHIVOS JOSEHP/paginas web/repositorio/INFORMES-SRJUNCO/src/components/public"
    extracted = extract_text_from_react(components_path)
    print("EXTRACTED KNOWLEDGE:\n")
    print(extracted)
    
    with open("e:/ARCHIVOS JOSEHP/paginas web/repositorio/INFORMES-SRJUNCO/scripts/web_knowledge_raw.txt", "w", encoding='utf-8') as out:
        out.write(extracted)
