---
name: Lemon
order: 2
status: in-development
description: 'Carbonated water, organic lemon juice and organic pear juice, with caffeine from green coffee beans, L-theanine from green tea, and salt. No added sugar.'
# Label order. Six slots on every SKU; the two juice lines change by can.
# The can prints the two juices on one line, "Organic Juice (Lemon and Pear)".
ingredients:
  - Carbonated water
  - Organic lemon juice
  - Organic pear juice
  - Caffeine
  - L-theanine
  - Salt
juicePercent: 20
canSizeFlOz: 12
caffeineMg: 220
lTheanineMg: 200
# Nutrition Facts, transcribed from the corrected can label
# (src/assets/six/six-can-lemon-back.png, FDA rounding applied, 2026-10-12).
# This block drives the live panel, the calorie line on the home page and the
# Product JSON-LD. If the label art changes, change this in the same commit.
nutrition:
  servingsPerContainer: 1
  servingSizeFlOz: 12
  calories: 30
  totalFatG: 0
  saturatedFatG: 0
  transFatG: 0
  cholesterolMg: 0
  sodiumMg: 45
  totalCarbohydrateG: 8
  dietaryFiberG: 0
  totalSugarsG: 6
  addedSugarsG: 0
  proteinG: 0
  micronutrients:
    - { name: Vitamin D, amountMcg: 0 }
    - { name: Calcium, amountMg: 10 }
    - { name: Iron, amountMg: 0 }
    - { name: Potassium, amountMg: 80 }
    - { name: Vitamin C, amountMg: 8.9 }
    - { name: Folate, amountMcg: 0 }
    - { name: Pantothenic Acid, amountMg: 0 }
    - { name: Manganese, amountMg: 0 }
color:
  field: '#B98A2E'
  onText: '#1A1917'
  ink: '#7A5A16'
---
