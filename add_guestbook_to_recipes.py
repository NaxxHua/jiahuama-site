#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量给食谱页面添加 Guestbook 组件
"""

import os
import re
from pathlib import Path

# 食谱文件目录
RECIPES_DIR = Path("src/pages/recipes")

# 要添加的 Guestbook 组件
GUESTBOOK_COMPONENT = '''
        <!-- Guestbook Section -->
        <div class="mt-8">
          <Guestbook />
        </div>'''

def add_guestbook_to_recipe(file_path):
    """给单个食谱文件添加 Guestbook 组件"""
    print(f"Processing: {file_path.name}")
    
    # 读取文件内容
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否已经添加过
    if 'Guestbook' in content:
        print(f"  ⏭️  Already has Guestbook, skipping...")
        return False
    
    # 1. 在 frontmatter imports 中添加 Guestbook 导入
    # 查找现有的 import 语句
    import_pattern = r'(import NavBar from "\.\.\/\.\.\/components\/NavBar\.jsx";)'
    import_replacement = r'\1\nimport Guestbook from "../../components/Guestbook.astro";'
    
    if re.search(import_pattern, content):
        content = re.sub(import_pattern, import_replacement, content)
        print(f"  ✅ Added Guestbook import")
    else:
        print(f"  ❌ Could not find NavBar import pattern")
        return False
    
    # 2. 在 </main> 标签前添加 Guestbook 组件
    # 查找 </main> 并在其前面插入组件
    main_pattern = r'([ \t]*)</main>'
    
    # 找到匹配位置
    match = re.search(main_pattern, content)
    if match:
        # 保持原有的缩进
        indent = match.group(1)
        # 在 </main> 前插入 Guestbook
        replacement = f'{GUESTBOOK_COMPONENT}\n{indent}</main>'
        content = re.sub(main_pattern, replacement, content, count=1)
        print(f"  ✅ Added Guestbook component before </main>")
    else:
        print(f"  ❌ Could not find </main> tag")
        return False
    
    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✅ Successfully updated {file_path.name}")
    return True

def main():
    """主函数"""
    print("=" * 60)
    print("批量给食谱页面添加 Guestbook 组件")
    print("=" * 60)
    print()
    
    # 获取所有 .astro 食谱文件（去重）
    recipe_files = list(set(RECIPES_DIR.glob("*.astro")))
    recipe_files.sort()
    
    print(f"Found {len(recipe_files)} recipe files:\n")
    for f in recipe_files:
        print(f"  - {f.name}")
    print()
    
    # 处理每个文件
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for recipe_file in recipe_files:
        try:
            result = add_guestbook_to_recipe(recipe_file)
            if result:
                success_count += 1
            else:
                skip_count += 1
        except Exception as e:
            print(f"  ❌ Error: {e}")
            error_count += 1
        print()
    
    # 总结
    print("=" * 60)
    print("Summary:")
    print(f"  ✅ Successfully updated: {success_count}")
    print(f"  ⏭️  Skipped (already has Guestbook): {skip_count}")
    print(f"  ❌ Errors: {error_count}")
    print(f"  📁 Total files: {len(recipe_files)}")
    print("=" * 60)

if __name__ == "__main__":
    main()
