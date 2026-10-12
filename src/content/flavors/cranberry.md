---
name: Cranberry
order: 1
status: in-development
description: 'Carbonated water, organic cranberry juice and organic pear juice, with caffeine from green coffee beans, L-theanine from green tea, and salt. No added sugar.'
# Label order. Six slots on every SKU; the two juice lines change by can.
# The can prints the two juices on one line, "Organic Juice (Cranberry and Pear)".
ingredients:
  - Carbonated water
  - Organic cranberry juice
  - Organic pear juice
  - Caffeine
  - L-theanine
  - Salt
juicePercent: 20
canSizeFlOz: 12
caffeineMg: 220
lTheanineMg: 200
# Nutrition Facts, from the can label (src/assets/six/six-can-cranberry-back.png).
# Calories and sodium are shown with FDA rounding (calories to the nearest 5
# at 50 or under, sodium to the nearest 5 mg); the label draft said
# 28 calories and 51 mg. Everything else is as printed, pending the
# corrected labels. Keep this block and the label art in step.
nutrition:
  servingsPerContainer: 1
  servingSizeFlOz: 12
  calories: 30
  totalFatG: 0
  saturatedFatG: 0
  transFatG: 0
  cholesterolMg: 0
  sodiumMg: 50
  totalCarbohydrateG: 7
  dietaryFiberG: 0
  totalSugarsG: 4
  addedSugarsG: 0
  proteinG: 0
  micronutrients:
    - { name: Vitamin D, amountMcg: 0 }
    - { name: Calcium, amountMg: 4 }
    - { name: Iron, amountMg: 0.1 }
    - { name: Potassium, amountMg: 67 }
    - { name: Vitamin C, amountMg: 0 }
    - { name: Folate, amountMcg: 0 }
    - { name: Pantothenic Acid, amountMg: 0 }
    - { name: Manganese, amountMg: 0 }
color:
  field: '#7A1E26'
  onText: '#F4EFE6'
  ink: '#7A1E26'
---
