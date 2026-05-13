from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

# LOAD ENV
load_dotenv()

# OPENAI
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# APP
app = Flask(__name__)
CORS(app)

# =====================================
# AI DESIGN SUGGESTION
# =====================================
@app.route("/design-suggestion", methods=["POST"])
def design_suggestion():

    data = request.json

    furniture_type = data.get("furnitureType")
    wood_type = data.get("woodType")
    color = data.get("color")

    prompt = f"""
    You are an AI furniture design assistant.

    Furniture Type: {furniture_type}
    Wood Type: {wood_type}
    Color: {color}

    Give the response exactly in this format:

    Style:
    Recommended Design:
    Materials:
    Estimated Finish:
    Extra Tips:
    """

    try:

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        answer = response.choices[0].message.content

        return jsonify({
            "success": True,
            "result": answer
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        })

# =====================================
# MATERIAL ESTIMATION
# =====================================

@app.route("/material-estimation", methods=["POST"])
def material_estimation():

    data = request.json

    furniture_type = data.get("furnitureType")

    width = float(data.get("width"))

    height = float(data.get("height"))

    depth = float(data.get("depth"))

    # =========================
    # WOOD NEEDED
    # =========================

    wood_needed = round(
        (width * height * depth) / 100000,
        2
    )

    # =========================
    # SIZE DETECTION
    # =========================

    size = "small"

    if width < 100:

        size = "small"

    elif width < 180:

        size = "medium"

    else:

        size = "large"

    # =========================
    # DEFAULT VALUES
    # =========================

    wood_price = 15000
    polish_cost = 2500
    labor_cost = 4000

    # =========================
    # CHAIR
    # =========================

    if furniture_type.lower() == "chair":

        if size == "small":

            wood_price = 12000
            polish_cost = 2000
            labor_cost = 3000

        elif size == "medium":

            wood_price = 18000
            polish_cost = 3000
            labor_cost = 5000

        else:

            wood_price = 25000
            polish_cost = 4000
            labor_cost = 7000

    # =========================
    # SOFA
    # =========================

    elif furniture_type.lower() == "sofa":

        if size == "small":

            wood_price = 45000
            polish_cost = 5000
            labor_cost = 8000

        elif size == "medium":

            wood_price = 65000
            polish_cost = 7000
            labor_cost = 10000

        else:

            wood_price = 90000
            polish_cost = 10000
            labor_cost = 15000

    # =========================
    # BED
    # =========================

    elif furniture_type.lower() == "bed":

        if size == "small":

            wood_price = 35000
            polish_cost = 4000
            labor_cost = 7000

        elif size == "medium":

            wood_price = 55000
            polish_cost = 6000
            labor_cost = 10000

        else:

            wood_price = 85000
            polish_cost = 9000
            labor_cost = 14000

    # =========================
    # CLOSET
    # =========================

    elif furniture_type.lower() == "closet":

        if size == "small":

            wood_price = 50000
            polish_cost = 6000
            labor_cost = 10000

        elif size == "medium":

            wood_price = 80000
            polish_cost = 9000
            labor_cost = 15000

        else:

            wood_price = 120000
            polish_cost = 12000
            labor_cost = 20000

    # =========================
    # TOTAL COST
    # =========================

    estimated_cost = (
        wood_price +
        polish_cost +
        labor_cost
    )

    return jsonify({

        "success": True,

        "sizeCategory": size,

        "furnitureType": furniture_type,

        "woodNeeded":
            f"{wood_needed} sq.ft",

        "woodCost":
            f"LKR {wood_price}",

        "polishCost":
            f"LKR {polish_cost}",

        "laborCost":
            f"LKR {labor_cost}",

        "estimatedCost":
            f"LKR {estimated_cost}"

    })

# =====================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )