#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量将食谱页面的 Guestbook 替换为 WalineComment
"""

import os
import re
from pathlib import Path

# 食谱文件目录
RECIPES_DIR = Path("src/pages/recipes")

def replace_guestbook_with_waline(file_path):
    """替换单个文件中的 Guestbook 为 WalineComment"""
    print(f"Processing: {file_path.name}")
    
    # 读取文件内容
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否包含 Guestbook
    if 'Guestbook' not in content:
        print(f"  ⏭️  No Guestbook found, skipping...")
        return False
    
    # 1. 替换 import 语句
    content = content.replace(
        'import Guestbook from "../../components/Guestbook.astro";',
        'import WalineComment from "../../components/WalineComment.astro";'
    )
    
    # 2. 替换组件使用
    content = content.replace('<Guestbook />', '<WalineComment />')
    
    # 3. 替换注释
    content = content.replace('<!-- Guestbook Section -->', '<!-- Comment Section -->')
    
    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✅ Successfully updated {file_path.name}")
    return True

def main():
    """主函数"""
    print("=" * 60)
    print("批量替换食谱页面：Guestbook → WalineComment")
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
            result = replace_guestbook_with_waline(recipe_file)
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
    print(f"  ⏭️  Skipped (no Guestbook): {skip_count}")
    print(f"  ❌ Errors: {error_count}")
    print(f"  📁 Total files: {len(recipe_files)}")
    print("=" * 60)

if __name__ == "__main__":
    main()
