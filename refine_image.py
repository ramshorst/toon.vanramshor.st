from PIL import Image

import collections

import collections

def refine_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # 1. Identify Background with Flood Fill
    # We'll create a mask where 0 = background, 1 = foreground
    mask = [[1 for _ in range(height)] for _ in range(width)]
    
    q = collections.deque([(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)])
    visited = set(q)
    
    # Threshold for "background white"
    threshold = 200
    
    while q:
        x, y = q.popleft()
        
        if x < 0 or x >= width or y < 0 or y >= height:
            continue
            
        r, g, b, a = pixels[x, y]
        
        # If it's light enough, it's background
        if r > threshold and g > threshold and b > threshold:
            mask[x][y] = 0 # Mark as background
            
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    q.append((nx, ny))

    # 2. Process Edge Pixels to Restore Anti-Aliasing without White Halo
    # Instead of eroding, we modify the edge pixels.
    # We assume the original image was on a white background.
    # So, lighter edge pixels = more transparency needed.
    # And we should replace the "white" color component with the nearest "dark" neighbor color.
    
    edge_pixels = []
    for x in range(width):
        for y in range(height):
            if mask[x][y] == 1: # Foreground
                is_edge = False
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < width and 0 <= ny < height and mask[nx][ny] == 0:
                        is_edge = True
                        break
                if is_edge:
                    edge_pixels.append((x, y))

    for x, y in edge_pixels:
        r, g, b, a = pixels[x, y]
        
        # Calculate brightness (0-255)
        brightness = (r + g + b) / 3.0
        
        # Heuristic: New Alpha is inverse of brightness (assuming white bg)
        # Darker pixels (outline) -> Opaque
        # Lighter pixels (anti-aliasing) -> Transparent
        new_alpha = int(255 - brightness)
        
        # Clamp and boost alpha slightly to avoid too much fading
        new_alpha = max(0, min(255, int(new_alpha * 1.5)))
        
        if new_alpha < 10:
             pixels[x, y] = (0, 0, 0, 0)
             continue

        # Find a darker neighbor to borrow color from (to remove white fringe)
        best_neighbor_color = None
        min_brightness = brightness
        
        # Look in a small radius
        for dx in range(-2, 3):
            for dy in range(-2, 3):
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and mask[nx][ny] == 1:
                    nr, ng, nb, na = pixels[nx, ny]
                    nbrightness = (nr + ng + nb) / 3.0
                    if nbrightness < min_brightness:
                        min_brightness = nbrightness
                        best_neighbor_color = (nr, ng, nb)
        
        if best_neighbor_color:
            pixels[x, y] = (best_neighbor_color[0], best_neighbor_color[1], best_neighbor_color[2], new_alpha)
        else:
            # If no darker neighbor, just apply the new alpha to original color
            pixels[x, y] = (r, g, b, new_alpha)

    # 3. Apply Mask for Pure Background
    for x in range(width):
        for y in range(height):
            if mask[x][y] == 0:
                pixels[x, y] = (0, 0, 0, 0)
    
    img.save(output_path, "PNG")
    print(f"Saved refined image to {output_path}")

if __name__ == "__main__":
    # Use the ORIGINAL source again
    source_path = "/Users/toon/.gemini/antigravity/brain/5897d754-29e9-4246-9125-71f5e407b897/toon_cartoon_sheet_1765325636507.png"
    output_path = "/Users/toon/dev/toon.vanramshor.st/public/toon_cartoon.png"
    
    refine_image(source_path, output_path)
