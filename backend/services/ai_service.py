    # 4. Qwen3-VL Analysis (High-level understanding)
    qwen_model, qwen_processor = get_qwen_model()
    if qwen_model:
        try:
            from qwen_vl_utils import process_vision_info
            
            messages = [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "image": image_path,
                        },
                        {"type": "text", "text": "Analyze this floor plan. Identify all rooms and their spatial relationships. Return a JSON object with 'rooms' and 'connections'."},
                    ],
                }
            ]
            
            # Preparation for inference
            text = qwen_processor.apply_chat_template(
                messages, tokenize=False, add_generation_prompt=True
            )
            image_inputs, video_inputs = process_vision_info(messages)
            inputs = qwen_processor(
                text=[text],
                images=image_inputs,
                videos=video_inputs,
                padding=True,
                return_tensors="pt",
            )
            inputs = inputs.to(qwen_model.device)

            # Inference
            generated_ids = qwen_model.generate(**inputs, max_new_tokens=512)
            generated_ids_trimmed = [
                out_ids[len(in_ids) :] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
            ]
            output_text = qwen_processor.batch_decode(
                generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False
            )[0]
            
            # Store raw Qwen analysis for debugging or further processing
            results["qwen_analysis"] = output_text
            
            # Note: Parsing the Qwen output into structured 'rooms' data would happen here
            # if we trust Qwen more than OCR/YOLO for room detection.
            
        except Exception as e:
            print(f"Error running Qwen inference: {e}")
            results["qwen_error"] = str(e)
