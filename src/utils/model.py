from src.utils.base import stub, api_image
from modal import Volume



volume = Volume.persisted("ckpt-store")
model_store_path = "/vol/ckpt"



@stub.function(image=api_image, 
               volumes={model_store_path: volume})
def load_model():
         
    from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
    
    processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
    model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")
    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")


    return processor, model, vocoder