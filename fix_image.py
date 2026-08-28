from PIL import Image
try:
    img = Image.open('foto_robot.jpg')
    w, h = img.size
    # Cut off the top 80 pixels where the UI from the screenshot is
    cropped = img.crop((0, 90, w, h))
    cropped.save('foto_robot.jpg')
    print("Image cropped successfully.")
except Exception as e:
    print(f"Error: {e}")
