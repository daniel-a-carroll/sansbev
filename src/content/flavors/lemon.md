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
# Nutrition Facts, from the can label (src/assets/six/six-can-lemon-back.png).
# Calories and sodium are shown with FDA rounding (calories to the nearest 5
# at 50 or under, sodium to the nearest 5 mg); the label draft said
# 31 calories and 47 mg. Everything else is as printed, pending the
# corrected labels. Keep this block and the label art in step.
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
    - { name: Calcium, amountMg: 8 }
    - { name: Iron, amountMg: 0 }
    - { name: Potassium, amountMg: 83 }
    - { name: Vitamin C, amountMg: 8.9 }
    - { name: Folate, amountMcg: 0 }
    - { name: Pantothenic Acid, amountMg: 0 }
    - { name: Manganese, amountMg: 0 }
color:
  field: '#B98A2E'
  onText: '#1A1917'
  ink: '#7A5A16'
---
