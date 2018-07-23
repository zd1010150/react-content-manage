# Specifications of Section Component
## Folder Name
Page
## Folder Path
src/components/page
## Folder Rules
This folder should contain components used as a section in view page or a single view page. Normally each component in this folder dedicatedly communicates with a sub store in redux, but it's unnecessary. The exported component itself can be reused by any view page. Its child component better to import from ui components for better testing and reusable purpose.