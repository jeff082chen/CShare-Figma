#!/bin/bash

set -euo pipefail

OUTPUT_FILE="project_dump.txt"
: > "$OUTPUT_FILE"

# Ignore build/system directories so the dump stays focused on the Vite project.
EXCLUDE_DIRS=".git|node_modules|dist|.DS_Store|.idea|.vscode|ui"

echo "===== DIRECTORY STRUCTURE =====" >> "$OUTPUT_FILE"
tree -a -I "$EXCLUDE_DIRS" . >> "$OUTPUT_FILE" 2>/dev/null
echo -e "\n" >> "$OUTPUT_FILE"

# Collect all relevant source assets for this React/Vite codebase.
find . \( \
    -path "*/node_modules" -o \
    -path "*/.git" -o \
    -path "*/dist" -o \
    -path "*/ui" -o \
    -name ".DS_Store" \
    \) -prune -o -type f \( \
        -name "*.ts" -o \
        -name "*.tsx" -o \
        -name "*.js" -o \
        -name "*.jsx" -o \
        -name "*.css" -o \
        -name "*.scss" -o \
        -name "*.html" -o \
        -name "*.md" -o \
        -name "*.json" \
    \) -print | sort | while IFS= read -r file; do
    echo "===== FILE: $file =====" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo -e "\n" >> "$OUTPUT_FILE"
done

echo "✅ Project sources written to $OUTPUT_FILE (node_modules/dist excluded)."
