import anthropic
import os
import base64
from dotenv import load_dotenv

load_dotenv()

async def analyze_floor_plan(image_path: str):
    """
    Analyze floor plan using Claude AI
    """
    client = anthropic.Anthropic(
        api_key=os.getenv("ANTHROPIC_API_KEY")
    )
    
    # Read and encode image
    with open(image_path, "rb") as img_file:
        image_data = base64.b64encode(img_file.read()).decode("utf-8")
    
    # Determine media type
    ext = os.path.splitext(image_path)[1].lower()
    media_type_map = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png'
    }
    media_type = media_type_map.get(ext, 'image/jpeg')
    
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4000,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image_data,
                        },
                    },
                    {
                        "type": "text",
                        "text": """Analyze this architectural floor plan and provide detailed JSON with:
                        {
                          "documentType": "type",
                          "scale": "scale",
                          "rooms": [{"name": "", "dimensions": "", "purpose": ""}],
                          "walls": {"count": 0, "type": ""},
                          "doors": {"count": 0, "types": []},
                          "windows": {"count": 0, "types": []},
                          "structural_elements": [],
                          "overall_layout": "",
                          "recommendations_for_3d": []
                        }
                        Respond only with valid JSON."""
                    }
                ],
            }
        ],
    )
    
    # Extract and parse response
    response_text = message.content[0].text
    
    # Clean JSON response
    import json
    response_text = response_text.replace('```json', '').replace('```', '').strip()
    analysis = json.loads(response_text)
    
    return analysis