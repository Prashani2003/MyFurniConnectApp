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
    Give a furniture design suggestion.

    Furniture Type: {furniture_type}
    Wood Type: {wood_type}
    Color: {color}

    Give:
    1. Style
    2. Recommended Design
    3. Extra Tips
    """

    try:

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
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

    # SIMPLE ML LOGIC
    wood_needed = round(
        (width * height * depth) / 100000,
        2
    )

    estimated_cost = round(
        wood_needed * 4500,
        2
    )

    return jsonify({
        "success": True,
        "furnitureType": furniture_type,
        "woodNeeded": f"{wood_needed} sq.ft",
        "estimatedCost": f"LKR {estimated_cost}"
    })

# =====================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )