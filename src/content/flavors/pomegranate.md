---
name: Pomegranate
order: 3
status: in-development
description: 'Carbonated water, organic pomegranate juice and organic lemon juice, with caffeine from green coffee beans, L-theanine from green tea, and salt. No added sugar.'
# Label order. Six slots on every SKU; the two juice lines change by can.
# The can prints the two juices on one line, "Organic Juice (Pomegranate and Lemon)".
ingredients:
  - Carbonated water
  - Organic pomegranate juice
  - Organic lemon juice
  - Caffeine
  - L-theanine
  - Salt
juicePercent: 20
canSizeFlOz: 12
caffeineMg: 220
lTheanineMg: 200
# Nutrition Facts, from the can label (src/assets/six/six-can-pomegranate-back.png).
# Calories and sodium are shown with FDA rounding (calories to the nearest 5
# at 50 or under, sodium to the nearest 5 mg); the label draft said
# 38 calories and 50 mg. Everything else is as printed, pending the
# corrected labels. Keep this block and the label art in step.
nutrition:
  servingsPerContainer: 1
  servingSizeFlOz: 12
  calories: 40
  totalFatG: 0
  saturatedFatG: 0
  transFatG: 0
  cholesterolMg: 0
  sodiumMg: 50
  totalCarbohydrateG: 9
  dietaryFiberG: 0
  totalSugarsG: 8
  addedSugarsG: 0
  proteinG: 0
  micronutrients:
    - { name: Vitamin D, amountMcg: 0 }
    - { name: Calcium, amountMg: 5 }
    - { name: Iron, amountMg: 0.1 }
    - { name: Potassium, amountMg: 116 }
    - { name: Vitamin C, amountMg: 6.6 }
    - { name: Folate, amountMcg: 14 }
    - { name: Pantothenic Acid, amountMg: 0.2 }
    - { name: Manganese, amountMg: 0.02 }
color:
  field: '#93224A'
  onText: '#F4EFE6'
  ink: '#93224A'
---
