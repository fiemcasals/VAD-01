from PIL import Image

img = Image.open('foto_robot.jpg')
w, h = img.size

# We want to crop out the empty space. Let's crop 15% from left, 15% from right, 10% from top, 10% from bottom.
left = int(w * 0.15)
right = int(w * 0.85)
top = int(h * 0.10)
bottom = int(h * 0.85)

cropped = img.crop((left, top, right, bottom))
cropped.save('foto_robot.jpg')
print(f"Original size: {w}x{h}, New size: {cropped.size}")
