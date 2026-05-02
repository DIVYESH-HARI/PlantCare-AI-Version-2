"""
disease_data.py
Maps every YOLO class name (from plant_disease.yaml) to:
  - display_name  : human-readable label
  - plant         : plant type
  - is_healthy    : bool
  - severity      : "none" | "low" | "medium" | "high"
  - description   : short disease description
  - remedies      : list[dict] with icon, title, desc, type
"""

DISEASE_DB: dict = {
    # ─── Apple ──────────────────────────────────────────────────────────────
    "Apple___Apple_scab": {
        "display_name": "Apple Scab",
        "plant": "Apple",
        "is_healthy": False,
        "severity": "medium",
        "description": "Fungal disease caused by Venturia inaequalis. Creates dark, scaly lesions on leaves and fruit.",
        "remedies": [
            {"icon": "🧪", "title": "Fungicide Spray", "desc": "Apply captan or myclobutanil fungicide beginning at green tip stage and repeat every 10–14 days.", "type": "Chemical"},
            {"icon": "🍂", "title": "Remove Fallen Leaves", "desc": "Rake and destroy fallen leaves in autumn to eliminate overwintering fungal spores.", "type": "Cultural"},
            {"icon": "✂️", "title": "Prune for Airflow", "desc": "Open up the canopy with selective pruning to reduce humid micro-climates that promote infection.", "type": "Manual"},
            {"icon": "🌿", "title": "Neem Oil", "desc": "Spray diluted neem oil (2%) as a preventive organic option before symptom onset.", "type": "Organic"},
        ],
    },
    "Apple___Black_rot": {
        "display_name": "Apple Black Rot",
        "plant": "Apple",
        "is_healthy": False,
        "severity": "high",
        "description": "Caused by Botryosphaeria obtusa. Produces brown leaf spots with purple margins and mummified fruit.",
        "remedies": [
            {"icon": "🧪", "title": "Captan Fungicide", "desc": "Apply captan-based fungicide at petal fall and three more times at 10-day intervals.", "type": "Chemical"},
            {"icon": "✂️", "title": "Remove Mummified Fruit", "desc": "Collect and destroy all mummified fruit and dead wood — primary overwintering sites.", "type": "Manual"},
            {"icon": "💧", "title": "Avoid Wounding", "desc": "Protect trees from hail, insect, and mechanical wounds which invite secondary infection.", "type": "Preventive"},
            {"icon": "🌿", "title": "Bordeaux Mixture", "desc": "Apply Bordeaux mixture (copper sulfate + lime) during dormant season for suppression.", "type": "Organic"},
        ],
    },
    "Apple___Cedar_apple_rust": {
        "display_name": "Cedar Apple Rust",
        "plant": "Apple",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Gymnosporangium juniperi-virginianae. Produces bright orange-yellow lesions on leaves.",
        "remedies": [
            {"icon": "🧪", "title": "Mancozeb / Myclobutanil", "desc": "Apply from pink bud stage through 3rd cover spray. Timing is critical — protect before spore release.", "type": "Chemical"},
            {"icon": "🌲", "title": "Remove Nearby Cedars", "desc": "Remove or relocate eastern red cedar (Juniperus virginiana) trees within 300 m — alternate host.", "type": "Cultural"},
            {"icon": "🛡️", "title": "Plant Resistant Varieties", "desc": "Choose rust-resistant apple cultivars such as Liberty, Enterprise, or Redfree for new plantings.", "type": "Preventive"},
        ],
    },
    "Apple___healthy": {
        "display_name": "Healthy",
        "plant": "Apple",
        "is_healthy": True,
        "severity": "none",
        "description": "Your apple plant appears healthy! No disease detected.",
        "remedies": [
            {"icon": "✅", "title": "Keep Monitoring", "desc": "Continue weekly visual inspections of leaves, bark, and fruit for early signs of disease.", "type": "Preventive"},
            {"icon": "💧", "title": "Consistent Watering", "desc": "Water deeply and infrequently. Avoid wetting foliage to prevent fungal conditions.", "type": "Cultural"},
            {"icon": "🌿", "title": "Seasonal Fertilisation", "desc": "Apply balanced NPK fertiliser in early spring to support vigorous growth and disease resistance.", "type": "Cultural"},
        ],
    },

    # ─── Blueberry ──────────────────────────────────────────────────────────
    "Blueberry___healthy": {
        "display_name": "Healthy",
        "plant": "Blueberry",
        "is_healthy": True,
        "severity": "none",
        "description": "Your blueberry plant looks healthy!",
        "remedies": [
            {"icon": "✅", "title": "Maintain Soil pH", "desc": "Keep soil pH between 4.5–5.5 for optimal nutrient uptake in blueberries.", "type": "Cultural"},
            {"icon": "🍂", "title": "Mulch Annually", "desc": "Apply 2–3 inches of wood chip or pine bark mulch to retain moisture and suppress weeds.", "type": "Cultural"},
            {"icon": "💧", "title": "Drip Irrigation", "desc": "Use drip irrigation to keep foliage dry and roots consistently moist.", "type": "Preventive"},
        ],
    },

    # ─── Cherry ─────────────────────────────────────────────────────────────
    "Cherry_(including_sour)___Powdery_mildew": {
        "display_name": "Powdery Mildew",
        "plant": "Cherry",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Podosphaera clandestina. White powdery fungal growth on leaf surfaces and young shoots.",
        "remedies": [
            {"icon": "🧪", "title": "Sulfur Fungicide", "desc": "Apply wettable sulfur or potassium bicarbonate at first sign of powdery coating. Repeat weekly.", "type": "Chemical"},
            {"icon": "🌿", "title": "Neem Oil Spray", "desc": "Mix 2 tsp neem oil + 1 tsp dish soap per litre water. Spray undersides of leaves bi-weekly.", "type": "Organic"},
            {"icon": "✂️", "title": "Remove Infected Shoots", "desc": "Prune and destroy infected shoots in early summer before spore spread.", "type": "Manual"},
            {"icon": "💧", "title": "Improve Air Circulation", "desc": "Thin out crowded branches to reduce humidity pockets that favour powdery mildew.", "type": "Preventive"},
        ],
    },
    "Cherry_(including_sour)___healthy": {
        "display_name": "Healthy",
        "plant": "Cherry",
        "is_healthy": True,
        "severity": "none",
        "description": "Your cherry plant appears healthy!",
        "remedies": [
            {"icon": "✅", "title": "Dormant Oil Spray", "desc": "Apply horticultural oil during late winter dormancy to smother overwintering pests and fungal spores.", "type": "Preventive"},
            {"icon": "💧", "title": "Avoid Overhead Irrigation", "desc": "Water at the base to keep foliage dry and discourage fungal disease.", "type": "Cultural"},
        ],
    },

    # ─── Corn ───────────────────────────────────────────────────────────────
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
        "display_name": "Gray Leaf Spot",
        "plant": "Corn",
        "is_healthy": False,
        "severity": "high",
        "description": "Caused by Cercospora zeae-maydis. Produces rectangular, tan-gray lesions between leaf veins — a major yield threat.",
        "remedies": [
            {"icon": "🧪", "title": "Strobilurin Fungicide", "desc": "Apply strobilurin or triazole fungicide at VT/R1 growth stage when conditions favour disease.", "type": "Chemical"},
            {"icon": "🌾", "title": "Crop Rotation", "desc": "Rotate with non-host crops (soybean, wheat) for minimum 1 year to break disease cycle.", "type": "Cultural"},
            {"icon": "🛡️", "title": "Resistant Hybrids", "desc": "Select corn hybrids with high GLS resistance ratings for next season's planting.", "type": "Preventive"},
            {"icon": "🍂", "title": "Residue Management", "desc": "Till or shred crop residue post-harvest to reduce overwintering inoculum in the field.", "type": "Cultural"},
        ],
    },
    "Corn_(maize)___Common_rust_": {
        "display_name": "Common Rust",
        "plant": "Corn",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Puccinia sorghi. Produces brick-red pustules on both leaf surfaces.",
        "remedies": [
            {"icon": "🧪", "title": "Triazole Fungicide", "desc": "Apply propiconazole or tebuconazole at early pustule stage for best efficacy.", "type": "Chemical"},
            {"icon": "🛡️", "title": "Plant Resistant Varieties", "desc": "Use rust-resistant corn hybrids — most modern commercial hybrids have good resistance.", "type": "Preventive"},
            {"icon": "🌾", "title": "Early Planting", "desc": "Plant early to allow the crop to mature before peak rust infection periods in late summer.", "type": "Cultural"},
        ],
    },
    "Corn_(maize)___Northern_Leaf_Blight": {
        "display_name": "Northern Leaf Blight",
        "plant": "Corn",
        "is_healthy": False,
        "severity": "high",
        "description": "Caused by Exserohilum turcicum. Creates long, cigar-shaped tan lesions that can cause significant yield loss.",
        "remedies": [
            {"icon": "🧪", "title": "Fungicide at Tasseling", "desc": "Apply propiconazole or azoxystrobin fungicide at VT–R1 stage when forecast models indicate risk.", "type": "Chemical"},
            {"icon": "🌾", "title": "Crop Rotation", "desc": "Rotate with soybean or other non-grass crops to reduce soil-borne inoculum.", "type": "Cultural"},
            {"icon": "🛡️", "title": "Resistant Hybrids", "desc": "Select hybrids with Ht1, Ht2, or quantitative resistance genes for NCLB.", "type": "Preventive"},
        ],
    },
    "Corn_(maize)___healthy": {
        "display_name": "Healthy",
        "plant": "Corn",
        "is_healthy": True,
        "severity": "none",
        "description": "Your corn plant appears healthy!",
        "remedies": [
            {"icon": "✅", "title": "Scout Regularly", "desc": "Walk fields weekly from V6 to R3 stage checking at least 20 plants per location.", "type": "Preventive"},
            {"icon": "💧", "title": "Balanced Fertilisation", "desc": "Maintain adequate potassium levels — deficiency increases susceptibility to leaf diseases.", "type": "Cultural"},
        ],
    },

    # ─── Grape ──────────────────────────────────────────────────────────────
    "Grape___Black_rot": {
        "display_name": "Black Rot",
        "plant": "Grape",
        "is_healthy": False,
        "severity": "high",
        "description": "Caused by Guignardia bidwellii. Produces small tan lesions on leaves and mummifies berries black.",
        "remedies": [
            {"icon": "🧪", "title": "Mancozeb Spray", "desc": "Apply mancozeb from bud burst through berry touch stage on a 7–10 day schedule.", "type": "Chemical"},
            {"icon": "🍇", "title": "Remove Mummified Fruit", "desc": "Destroy all mummified clusters — they are the primary overwintering source of spores.", "type": "Manual"},
            {"icon": "✂️", "title": "Canopy Management", "desc": "Thin shoots and leaves to improve air circulation and reduce disease-conducive humidity.", "type": "Cultural"},
        ],
    },
    "Grape___Esca_(Black_Measles)": {
        "display_name": "Esca (Black Measles)",
        "plant": "Grape",
        "is_healthy": False,
        "severity": "high",
        "description": "Complex trunk disease caused by Phaeomoniella and Phaeoacremonium spp. Creates striped, scorched leaf patterns.",
        "remedies": [
            {"icon": "✂️", "title": "Prune Infected Wood", "desc": "Remove and destroy infected canes during dormancy. Make clean cuts below visible discoloration.", "type": "Manual"},
            {"icon": "🛡️", "title": "Protect Pruning Wounds", "desc": "Apply wound protectant (Bordeaux paste or trichoderma-based products) immediately after pruning.", "type": "Preventive"},
            {"icon": "💧", "title": "Avoid Water Stress", "desc": "Maintain consistent irrigation — water-stressed vines are significantly more susceptible.", "type": "Cultural"},
        ],
    },
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
        "display_name": "Leaf Blight",
        "plant": "Grape",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Isariopsis clavispora. Produces dark brown irregular spots, often leading to premature leaf drop.",
        "remedies": [
            {"icon": "🧪", "title": "Copper Fungicide", "desc": "Apply copper oxychloride or copper hydroxide formulations at 10-day intervals.", "type": "Chemical"},
            {"icon": "🍂", "title": "Destroy Fallen Leaves", "desc": "Collect and burn fallen leaves in autumn to eliminate overwintering inoculum.", "type": "Cultural"},
            {"icon": "🌿", "title": "Organic Spray", "desc": "Spray diluted garlic extract or potassium bicarbonate as a preventive organic measure.", "type": "Organic"},
        ],
    },
    "Grape___healthy": {
        "display_name": "Healthy",
        "plant": "Grape",
        "is_healthy": True,
        "severity": "none",
        "description": "Your grapevine looks healthy!",
        "remedies": [
            {"icon": "✅", "title": "Preventive Sprays", "desc": "Apply lime sulfur during dormancy as a preventive measure against fungal diseases.", "type": "Preventive"},
            {"icon": "✂️", "title": "Winter Pruning", "desc": "Prune vines annually to maintain good structure and remove potentially infected old wood.", "type": "Cultural"},
        ],
    },

    # ─── Orange ─────────────────────────────────────────────────────────────
    "Orange___Haunglongbing_(Citrus_greening)": {
        "display_name": "Citrus Greening (HLB)",
        "plant": "Orange",
        "is_healthy": False,
        "severity": "high",
        "description": "Caused by Candidatus Liberibacter asiaticus — a bacterial disease spread by Asian citrus psyllid. Currently incurable.",
        "remedies": [
            {"icon": "🚫", "title": "Remove Infected Trees", "desc": "HLB has no cure. Infected trees must be removed and destroyed to protect surrounding orchards.", "type": "Critical"},
            {"icon": "🐛", "title": "Control Asian Citrus Psyllid", "desc": "Apply systemic insecticides (imidacloprid) to kill the psyllid vector before it spreads the bacteria.", "type": "Chemical"},
            {"icon": "🛡️", "title": "Use Certified Nursery Stock", "desc": "Only plant certified disease-free citrus trees from licensed nurseries.", "type": "Preventive"},
            {"icon": "📋", "title": "Report to Authorities", "desc": "HLB is a notifiable disease in many regions. Contact your local agricultural authority immediately.", "type": "Regulatory"},
        ],
    },

    # ─── Peach ──────────────────────────────────────────────────────────────
    "Peach___Bacterial_spot": {
        "display_name": "Bacterial Spot",
        "plant": "Peach",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Xanthomonas arboricola pv. pruni. Produces water-soaked spots on leaves that turn brown and fall out, creating a shot-hole effect.",
        "remedies": [
            {"icon": "🧪", "title": "Copper Bactericide", "desc": "Apply copper hydroxide sprays starting at petal fall on a 7–14 day schedule.", "type": "Chemical"},
            {"icon": "🛡️", "title": "Plant Resistant Varieties", "desc": "Select peach varieties with known bacterial spot resistance for new plantings.", "type": "Preventive"},
            {"icon": "💧", "title": "Avoid Wetting Foliage", "desc": "Use drip irrigation and avoid overhead sprinklers — wet conditions spread bacteria rapidly.", "type": "Cultural"},
        ],
    },
    "Peach___healthy": {
        "display_name": "Healthy",
        "plant": "Peach",
        "is_healthy": True,
        "severity": "none",
        "description": "Your peach tree looks healthy!",
        "remedies": [
            {"icon": "✅", "title": "Dormant Copper Spray", "desc": "Apply copper sulfate during dormancy to suppress bacterial and fungal inoculum.", "type": "Preventive"},
            {"icon": "✂️", "title": "Annual Pruning", "desc": "Prune to an open vase shape for good light penetration and air circulation.", "type": "Cultural"},
        ],
    },

    # ─── Pepper ─────────────────────────────────────────────────────────────
    "Pepper,_bell___Bacterial_spot": {
        "display_name": "Bacterial Spot",
        "plant": "Pepper",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Xanthomonas campestris pv. vesicatoria. Creates water-soaked lesions on leaves and fruit.",
        "remedies": [
            {"icon": "🧪", "title": "Copper + Mancozeb", "desc": "Tank-mix copper hydroxide with mancozeb and spray every 7 days during wet weather.", "type": "Chemical"},
            {"icon": "🌱", "title": "Use Certified Seeds", "desc": "Start from hot-water-treated or certified pathogen-free seeds to avoid seed-borne infection.", "type": "Preventive"},
            {"icon": "🌾", "title": "Crop Rotation", "desc": "Rotate with non-solanaceous crops for 2+ years to break the disease cycle in soil.", "type": "Cultural"},
            {"icon": "💧", "title": "Drip Irrigation", "desc": "Switch to drip irrigation to reduce leaf wetness and bacterial splashing from soil.", "type": "Cultural"},
        ],
    },
    "Pepper,_bell___healthy": {
        "display_name": "Healthy",
        "plant": "Pepper",
        "is_healthy": True,
        "severity": "none",
        "description": "Your bell pepper plant looks healthy!",
        "remedies": [
            {"icon": "✅", "title": "Monitor for Pests", "desc": "Check weekly for aphids and thrips which vector viral diseases into pepper crops.", "type": "Preventive"},
            {"icon": "💧", "title": "Consistent Watering", "desc": "Maintain even soil moisture to prevent blossom-end rot and stress-induced susceptibility.", "type": "Cultural"},
        ],
    },

    # ─── Potato ─────────────────────────────────────────────────────────────
    "Potato___Early_blight": {
        "display_name": "Early Blight",
        "plant": "Potato",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Alternaria solani. Produces dark brown target-like concentric ring lesions, starting on older leaves.",
        "remedies": [
            {"icon": "🧪", "title": "Chlorothalonil Spray", "desc": "Apply chlorothalonil or azoxystrobin fungicide at first sign of symptoms on a 7-day schedule.", "type": "Chemical"},
            {"icon": "🌿", "title": "Neem Oil Treatment", "desc": "Spray neem oil solution (3 mL/L) every 10 days as an organic preventive measure.", "type": "Organic"},
            {"icon": "🌾", "title": "Crop Rotation", "desc": "Rotate with non-solanaceous crops every 2–3 years to reduce soil pathogen levels.", "type": "Cultural"},
            {"icon": "💧", "title": "Avoid Overhead Watering", "desc": "Water at the base in early morning so foliage dries quickly during the day.", "type": "Cultural"},
        ],
    },
    "Potato___Late_blight": {
        "display_name": "Late Blight",
        "plant": "Potato",
        "is_healthy": False,
        "severity": "high",
        "description": "Caused by Phytophthora infestans — the same pathogen responsible for the Irish Potato Famine. Destroys crops rapidly in cool, wet weather.",
        "remedies": [
            {"icon": "🚨", "title": "Act Immediately", "desc": "Late blight spreads very fast. Remove and destroy infected plants immediately to prevent spread.", "type": "Critical"},
            {"icon": "🧪", "title": "Metalaxyl + Mancozeb", "desc": "Apply systemic fungicide combinations (metalaxyl + mancozeb) on a strict 5–7 day schedule.", "type": "Chemical"},
            {"icon": "🌾", "title": "Hilling", "desc": "Hill soil up around tubers to prevent spores washing down and infecting them.", "type": "Cultural"},
            {"icon": "🛡️", "title": "Resistant Varieties", "desc": "Plant certified late blight-resistant varieties (Sarpo Mira, Defender) in future seasons.", "type": "Preventive"},
        ],
    },
    "Potato___healthy": {
        "display_name": "Healthy",
        "plant": "Potato",
        "is_healthy": True,
        "severity": "none",
        "description": "Your potato plant looks healthy!",
        "remedies": [
            {"icon": "✅", "title": "Preventive Fungicide", "desc": "Apply preventive fungicide when weather forecast shows cool, rainy conditions (late blight risk).", "type": "Preventive"},
            {"icon": "🌱", "title": "Use Certified Seed", "desc": "Always plant from certified disease-free seed potatoes to avoid soil and seed-borne pathogens.", "type": "Cultural"},
        ],
    },

    # ─── Raspberry ──────────────────────────────────────────────────────────
    "Raspberry___healthy": {
        "display_name": "Healthy",
        "plant": "Raspberry",
        "is_healthy": True,
        "severity": "none",
        "description": "Your raspberry plant looks healthy!",
        "remedies": [
            {"icon": "✅", "title": "Remove Old Canes", "desc": "After fruiting, cut out old floricanes at ground level to improve air circulation.", "type": "Cultural"},
            {"icon": "🌿", "title": "Mulch Regularly", "desc": "Apply 3–4 inches of organic mulch to suppress weeds and retain soil moisture.", "type": "Cultural"},
        ],
    },

    # ─── Soybean ────────────────────────────────────────────────────────────
    "Soybean___healthy": {
        "display_name": "Healthy",
        "plant": "Soybean",
        "is_healthy": True,
        "severity": "none",
        "description": "Your soybean plant looks healthy!",
        "remedies": [
            {"icon": "✅", "title": "Scout for Rust", "desc": "Monitor for Asian soybean rust (Phakopsora pachyrhizi) from R1 stage onward.", "type": "Preventive"},
            {"icon": "🌾", "title": "Maintain Plant Populations", "desc": "Avoid overcrowding — adequate spacing reduces disease pressure and improves yields.", "type": "Cultural"},
        ],
    },

    # ─── Squash ─────────────────────────────────────────────────────────────
    "Squash___Powdery_mildew": {
        "display_name": "Powdery Mildew",
        "plant": "Squash",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Podosphaera xanthii. White powdery patches on leaves reduce photosynthesis and weaken the plant.",
        "remedies": [
            {"icon": "🧪", "title": "Potassium Bicarbonate", "desc": "Spray 1 tbsp potassium bicarbonate per litre of water. Highly effective and OMRI-listed.", "type": "Organic"},
            {"icon": "🌿", "title": "Neem Oil", "desc": "Apply neem oil spray every 7 days — disrupts fungal growth without harming beneficial insects.", "type": "Organic"},
            {"icon": "✂️", "title": "Remove Worst Leaves", "desc": "Cut off heavily infected leaves and dispose of them away from the garden.", "type": "Manual"},
            {"icon": "🛡️", "title": "Resistant Varieties", "desc": "Choose powdery mildew-resistant squash varieties for next season.", "type": "Preventive"},
        ],
    },

    # ─── Strawberry ─────────────────────────────────────────────────────────
    "Strawberry___Leaf_scorch": {
        "display_name": "Leaf Scorch",
        "plant": "Strawberry",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Diplocarpon earlianum. Produces irregular dark purple spots that merge to create a scorched appearance.",
        "remedies": [
            {"icon": "🧪", "title": "Captan Fungicide", "desc": "Apply captan fungicide in spring from early leaf emergence through the harvest season.", "type": "Chemical"},
            {"icon": "🍂", "title": "Remove Infected Foliage", "desc": "Remove and destroy infected leaves, especially in autumn, to reduce overwintering inoculum.", "type": "Manual"},
            {"icon": "💧", "title": "Drip Irrigation", "desc": "Change to drip irrigation to keep leaves dry — leaf wetness is required for infection.", "type": "Cultural"},
            {"icon": "🌿", "title": "Organic Copper Spray", "desc": "Apply copper-based organic sprays as a preventive before rainy periods.", "type": "Organic"},
        ],
    },
    "Strawberry___healthy": {
        "display_name": "Healthy",
        "plant": "Strawberry",
        "is_healthy": True,
        "severity": "none",
        "description": "Your strawberry plant looks healthy!",
        "remedies": [
            {"icon": "✅", "title": "Renovate After Harvest", "desc": "Mow leaves and thin plants post-harvest season to rejuvenate the patch.", "type": "Cultural"},
            {"icon": "🌿", "title": "Straw Mulch", "desc": "Apply straw mulch around plants to prevent rain-splash spreading soilborne pathogens.", "type": "Preventive"},
        ],
    },

    # ─── Tomato ─────────────────────────────────────────────────────────────
    "Tomato___Bacterial_spot": {
        "display_name": "Bacterial Spot",
        "plant": "Tomato",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Xanthomonas vesicatoria. Creates water-soaked leaf lesions and scabby fruit spots.",
        "remedies": [
            {"icon": "🧪", "title": "Copper Bactericide", "desc": "Apply fixed copper (copper hydroxide or copper octanoate) every 5–7 days during wet weather.", "type": "Chemical"},
            {"icon": "🌱", "title": "Seed Treatment", "desc": "Treat seeds with hot water (50 °C for 25 min) or use certified pathogen-free seeds.", "type": "Preventive"},
            {"icon": "🌾", "title": "Crop Rotation", "desc": "Avoid growing tomatoes or peppers in the same spot for 2+ years.", "type": "Cultural"},
            {"icon": "💧", "title": "Drip Irrigation", "desc": "Use drip irrigation and stake plants to improve airflow and keep foliage dry.", "type": "Cultural"},
        ],
    },
    "Tomato___Early_blight": {
        "display_name": "Early Blight",
        "plant": "Tomato",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Alternaria solani. Dark bullseye-pattern lesions on older leaves — very common in warm, humid conditions.",
        "remedies": [
            {"icon": "🧪", "title": "Chlorothalonil / Azoxystrobin", "desc": "Begin preventive sprays when plants are 30 cm tall. Reapply every 7–10 days.", "type": "Chemical"},
            {"icon": "🌿", "title": "Neem Oil Spray", "desc": "Mix 2 tsp neem oil with 1L water. Spray every 10 days — especially effective as a preventive.", "type": "Organic"},
            {"icon": "✂️", "title": "Remove Lower Leaves", "desc": "Remove all leaves within 30 cm of soil level to prevent splash-spread from soil.", "type": "Manual"},
            {"icon": "💧", "title": "Mulch the Soil", "desc": "Apply plastic or organic mulch to prevent infected soil from splashing onto leaves.", "type": "Cultural"},
        ],
    },
    "Tomato___Late_blight": {
        "display_name": "Late Blight",
        "plant": "Tomato",
        "is_healthy": False,
        "severity": "high",
        "description": "Caused by Phytophthora infestans. Water-soaked lesions rapidly turn dark brown — entire plants can collapse within days.",
        "remedies": [
            {"icon": "🚨", "title": "Act Immediately", "desc": "Remove and bag infected plants immediately. Do NOT compost — spores will spread.", "type": "Critical"},
            {"icon": "🧪", "title": "Chlorothalonil Spray", "desc": "Apply chlorothalonil preventively during cool, wet weather (15–20°C with high humidity).", "type": "Chemical"},
            {"icon": "🛡️", "title": "Resistant Varieties", "desc": "Grow late blight-resistant varieties (Defiant, Mountain Magic, Plum Regal) in future.", "type": "Preventive"},
            {"icon": "🌬️", "title": "Improve Air Circulation", "desc": "Stake plants and remove lower leaves to reduce humidity in the canopy.", "type": "Cultural"},
        ],
    },
    "Tomato___Leaf_Mold": {
        "display_name": "Leaf Mold",
        "plant": "Tomato",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Passalora fulva (Cladosporium fulvum). Pale green-yellow patches on upper surface, olive-gray mold underneath — mainly in greenhouses.",
        "remedies": [
            {"icon": "🌬️", "title": "Improve Ventilation", "desc": "Increase ventilation in greenhouses — leaf mold thrives above 85% relative humidity.", "type": "Cultural"},
            {"icon": "🧪", "title": "Chlorothalonil Spray", "desc": "Apply chlorothalonil or copper fungicide at first sign of yellowing — every 7 days.", "type": "Chemical"},
            {"icon": "💧", "title": "Reduce Leaf Wetness", "desc": "Avoid wetting leaves during watering and water in the morning to allow quick drying.", "type": "Cultural"},
        ],
    },
    "Tomato___Septoria_leaf_spot": {
        "display_name": "Septoria Leaf Spot",
        "plant": "Tomato",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Septoria lycopersici. Circular spots with grey centers and dark borders — spreads rapidly upward through the plant.",
        "remedies": [
            {"icon": "🧪", "title": "Mancozeb or Chlorothalonil", "desc": "Begin preventive fungicide sprays when plants first set fruit. Reapply every 7–10 days.", "type": "Chemical"},
            {"icon": "✂️", "title": "Remove Infected Leaves", "desc": "Pinch off infected leaves immediately and dispose of them away from the garden.", "type": "Manual"},
            {"icon": "🌾", "title": "Crop Rotation", "desc": "Do not plant tomatoes in the same bed for at least 2 years.", "type": "Cultural"},
            {"icon": "🌿", "title": "Copper Soap Spray", "desc": "Apply copper soap (copper octanoate) as an organic alternative, every 7–10 days.", "type": "Organic"},
        ],
    },
    "Tomato___Spider_mites Two-spotted_spider_mite": {
        "display_name": "Spider Mites",
        "plant": "Tomato",
        "is_healthy": False,
        "severity": "medium",
        "description": "Tetranychus urticae infestation. Creates stippled, bronzed leaves and fine webbing — thrives in hot, dry conditions.",
        "remedies": [
            {"icon": "💧", "title": "Water Spray", "desc": "Forcefully spray plants with water, focusing on leaf undersides. Repeat daily for a week.", "type": "Manual"},
            {"icon": "🌿", "title": "Neem Oil / Insecticidal Soap", "desc": "Apply neem oil or insecticidal soap every 3–5 days until mite populations collapse.", "type": "Organic"},
            {"icon": "🐛", "title": "Introduce Predatory Mites", "desc": "Release Phytoseiulus persimilis or Neoseiulus californicus — commercially available biological control.", "type": "Biological"},
            {"icon": "🌡️", "title": "Increase Humidity", "desc": "Mites hate humidity. Mist plants and maintain soil moisture to create less favourable conditions.", "type": "Cultural"},
        ],
    },
    "Tomato___Target_Spot": {
        "display_name": "Target Spot",
        "plant": "Tomato",
        "is_healthy": False,
        "severity": "medium",
        "description": "Caused by Corynespora cassiicola. Produces circular brown lesions with concentric rings on leaves and fruit.",
        "remedies": [
            {"icon": "🧪", "title": "Fluxapyroxad Fungicide", "desc": "Apply trifloxystrobin or fluxapyroxad fungicide at first symptom. Alternate modes of action.", "type": "Chemical"},
            {"icon": "✂️", "title": "Remove Lower Leaves", "desc": "Remove infected lower leaves to reduce the spore source and slow upward progression.", "type": "Manual"},
            {"icon": "💧", "title": "Manage Crop Canopy", "desc": "Prune to reduce canopy density and improve air circulation within the foliage.", "type": "Cultural"},
        ],
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "display_name": "Yellow Leaf Curl Virus",
        "plant": "Tomato",
        "is_healthy": False,
        "severity": "high",
        "description": "TYLCV — a begomovirus transmitted by whiteflies. Causes severe leaf curling, yellowing and yield losses up to 100%.",
        "remedies": [
            {"icon": "🐛", "title": "Control Whiteflies", "desc": "Apply imidacloprid or thiamethoxam as soil drench or foliar spray to eliminate whitefly vector.", "type": "Chemical"},
            {"icon": "🌿", "title": "Reflective Mulch", "desc": "Use silver reflective mulch to repel whiteflies — reduces virus spread significantly.", "type": "Preventive"},
            {"icon": "🛡️", "title": "Resistant Varieties", "desc": "Plant TYLCV-tolerant varieties (Ty-1 gene) — now widely available in commercial seed catalogues.", "type": "Preventive"},
            {"icon": "🚫", "title": "Remove Infected Plants", "desc": "Remove and destroy infected plants immediately to prevent whiteflies from spreading the virus further.", "type": "Critical"},
        ],
    },
    "Tomato___Tomato_mosaic_virus": {
        "display_name": "Tomato Mosaic Virus",
        "plant": "Tomato",
        "is_healthy": False,
        "severity": "high",
        "description": "ToMV — highly contagious virus spread by contact. Creates mottled light-dark green mosaic patterns and distorted growth.",
        "remedies": [
            {"icon": "🧤", "title": "Strict Hygiene", "desc": "Wash hands thoroughly with soap before handling plants. Disinfect tools with 10% bleach solution.", "type": "Critical"},
            {"icon": "🚫", "title": "Remove Infected Plants", "desc": "Remove and destroy infected plants immediately. Do not compost them.", "type": "Manual"},
            {"icon": "🌱", "title": "Use Certified Seeds", "desc": "Plant from certified virus-free seeds or transplants to prevent seed-borne transmission.", "type": "Preventive"},
            {"icon": "🐛", "title": "Control Aphids", "desc": "Manage aphid populations which can spread the virus between plants.", "type": "Chemical"},
        ],
    },
    "Tomato___healthy": {
        "display_name": "Healthy",
        "plant": "Tomato",
        "is_healthy": True,
        "severity": "none",
        "description": "Your tomato plant looks healthy!",
        "remedies": [
            {"icon": "✅", "title": "Weekly Inspection", "desc": "Inspect leaves, stems, and fruit weekly. Early detection makes all diseases far easier to treat.", "type": "Preventive"},
            {"icon": "💧", "title": "Consistent Watering", "desc": "Water evenly and consistently at the base. Irregular watering causes blossom-end rot.", "type": "Cultural"},
            {"icon": "🌿", "title": "Preventive Neem Spray", "desc": "Apply neem oil spray every 2 weeks as a broad-spectrum preventive measure.", "type": "Organic"},
        ],
    },
}


def get_disease_info(class_name: str) -> dict:
    """Return disease info for a given YOLO class name, with a safe fallback."""
    info = DISEASE_DB.get(class_name)
    if info:
        return info
    # Fallback for unknown classes
    return {
        "display_name": class_name.replace("___", " — ").replace("_", " ").title(),
        "plant": class_name.split("___")[0].replace("_", " ") if "___" in class_name else "Unknown",
        "is_healthy": "healthy" in class_name.lower(),
        "severity": "unknown",
        "description": "Disease information not available in database.",
        "remedies": [
            {"icon": "🔍", "title": "Consult an Expert", "desc": "Please consult a local agricultural extension officer for advice on this condition.", "type": "Advisory"},
        ],
    }
