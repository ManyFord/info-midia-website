"""Prepare logo, favicon, segment photos, and Brazil state paths."""

from __future__ import annotations

import json
import math
import sys
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOGO_SRC = Path(
    r"C:\Users\alexa\.cursor\projects\c-Users-alexa-OneDrive-Documentos-info-midia-website\assets\c__Users_alexa_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-93bb3ec0-8aa6-4112-8343-8acb001e1ccb.png"
)
BRAND_DIR = ROOT / "public" / "brand"
SEGMENT_DIR = ROOT / "public" / "images" / "segments"
MAP_OUT = ROOT / "src" / "components" / "map" / "brazil-paths.ts"

GEOJSON_URLS = [
    "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/brazil-states.geojson",
    "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson",
    "https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/uf/geojson/uf.json",
]

SEGMENT_IMAGES = {
    "supermercados.jpg": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=75",
    "restaurantes.jpg": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=75",
    "bares.jpg": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=75",
    "varejo.jpg": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=75",
}

NAME_TO_CODE = {
    "Acre": "AC",
    "Alagoas": "AL",
    "Amapá": "AP",
    "Amapa": "AP",
    "Amazonas": "AM",
    "Bahia": "BA",
    "Ceará": "CE",
    "Ceara": "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    "Espirito Santo": "ES",
    "Goiás": "GO",
    "Goias": "GO",
    "Maranhão": "MA",
    "Maranhao": "MA",
    "Mato Grosso": "MT",
    "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG",
    "Pará": "PA",
    "Para": "PA",
    "Paraíba": "PB",
    "Paraiba": "PB",
    "Paraná": "PR",
    "Parana": "PR",
    "Pernambuco": "PE",
    "Piauí": "PI",
    "Piaui": "PI",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS",
    "Rondônia": "RO",
    "Rondonia": "RO",
    "Roraima": "RR",
    "Santa Catarina": "SC",
    "São Paulo": "SP",
    "Sao Paulo": "SP",
    "Sergipe": "SE",
    "Tocantins": "TO",
}


def download(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 InfoMidiaWebsite/1.0"},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def prepare_logo() -> None:
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    image = Image.open(LOGO_SRC).convert("RGBA")
    width, height = image.size
    pixels = image.load()
    min_x, min_y, max_x, max_y = width, height, 0, 0
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a < 10 or (r > 246 and g > 246 and b > 246):
                continue
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

    pad = 24
    cropped = image.crop(
        (
            max(0, min_x - pad),
            max(0, min_y - pad),
            min(width, max_x + pad + 1),
            min(height, max_y + pad + 1),
        )
    )
    logo_path = BRAND_DIR / "logo.png"
    cropped.save(logo_path, "PNG", optimize=True)
    print("logo", cropped.size, logo_path.stat().st_size)

    # Cube sits on the left of the wordmark. Knock out white for the favicon.
    cube = image.crop((max(0, min_x - 8), max(0, min_y - 8), 372, min(height, max_y + 8)))
    cube_pixels = cube.load()
    for y in range(cube.height):
        for x in range(cube.width):
            r, g, b, a = cube_pixels[x, y]
            chroma = max(r, g, b) - min(r, g, b)
            avg = (r + g + b) / 3
            if avg > 244 and chroma < 22:
                cube_pixels[x, y] = (r, g, b, 0)

    bbox = cube.getbbox()
    if bbox:
        cube = cube.crop(bbox)

    side = max(cube.width, cube.height) + 48
    icon = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    icon.paste(cube, ((side - cube.width) // 2, (side - cube.height) // 2), cube)
    icon_resized = icon.resize((512, 512), Image.Resampling.LANCZOS)
    icon_path = ROOT / "src" / "app" / "icon.png"
    icon_resized.save(icon_path, "PNG", optimize=True)

    apple = Image.new("RGBA", (180, 180), (7, 11, 20, 255))
    mark = icon.resize((150, 150), Image.Resampling.LANCZOS)
    apple.paste(mark, (15, 15), mark)
    apple.convert("RGB").save(ROOT / "src" / "app" / "apple-icon.png", "PNG", optimize=True)
    print("icons", icon_path.stat().st_size)


def prepare_segments() -> None:
    SEGMENT_DIR.mkdir(parents=True, exist_ok=True)
    for name, url in SEGMENT_IMAGES.items():
        destination = SEGMENT_DIR / name
        print("download", name)
        raw = download(url)
        temp = SEGMENT_DIR / f"_{name}.bin"
        temp.write_bytes(raw)
        with Image.open(temp) as photo:
            photo = photo.convert("RGB")
            photo.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            photo.save(destination, "JPEG", quality=78, optimize=True)
        temp.unlink()
        print(" saved", destination.stat().st_size, destination)


def perp_distance(point, start, end) -> float:
    x, y = point
    x1, y1 = start
    x2, y2 = end
    dx, dy = x2 - x1, y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(x - x1, y - y1)
    t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)
    t = max(0.0, min(1.0, t))
    return math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))


def rdp(points: list[tuple[float, float]], epsilon: float) -> list[tuple[float, float]]:
    if len(points) < 3:
        return points
    keep = [False] * len(points)
    keep[0] = True
    keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        start, end = stack.pop()
        max_distance = 0.0
        index = None
        a = points[start]
        b = points[end]
        for i in range(start + 1, end):
            distance = perp_distance(points[i], a, b)
            if distance > max_distance:
                max_distance = distance
                index = i
        if index is not None and max_distance > epsilon:
            keep[index] = True
            stack.append((start, index))
            stack.append((index, end))
    return [point for point, marked in zip(points, keep) if marked]


def ring_points(ring) -> list[tuple[float, float]]:
    points = []
    for coord in ring:
        if not isinstance(coord, (list, tuple)) or len(coord) < 2:
            continue
        lng, lat = float(coord[0]), float(coord[1])
        if math.isfinite(lng) and math.isfinite(lat):
            points.append((lng, lat))
    return points


def iter_polygons(geometry):
    geo_type = geometry.get("type")
    coordinates = geometry.get("coordinates") or []
    if geo_type == "Polygon":
        yield coordinates
    elif geo_type == "MultiPolygon":
        yield from coordinates
    elif geo_type == "GeometryCollection":
        for child in geometry.get("geometries") or []:
            yield from iter_polygons(child)


def state_identity(props: dict) -> tuple[str, str] | None:
    code = (
        props.get("sigla")
        or props.get("SIGLA")
        or props.get("UF")
        or props.get("uf")
        or props.get("postal")
        or props.get("code")
        or props.get("id")
    )
    name = (
        props.get("name")
        or props.get("nome")
        or props.get("NOME")
        or props.get("NM_ESTADO")
        or props.get("Estado")
        or props.get("estado")
    )
    if isinstance(code, str) and len(code) == 2 and code.isalpha():
        code = code.upper()
    else:
        code = None
    if isinstance(name, str):
        name = name.strip()
    else:
        name = None
    if code is None and name in NAME_TO_CODE:
        code = NAME_TO_CODE[name]
    if name is None and code:
        for label, sigla in NAME_TO_CODE.items():
            if sigla == code and "á" in label or (sigla == code and label not in {"Amapa", "Ceara", "Espirito Santo", "Goias", "Maranhao", "Para", "Paraiba", "Parana", "Piaui", "Rondonia", "Sao Paulo"}):
                name = label
                break
    if code and name:
        # Prefer the accented label when we know it.
        for label, sigla in NAME_TO_CODE.items():
            if sigla == code and any(ch in label for ch in "áàâãéêíóôõúç"):
                name = label
                break
            if sigla == code and name.lower() == label.lower():
                name = label
        return code, name
    return None


def prepare_map() -> None:
    payload = None
    last_error = None
    for url in GEOJSON_URLS:
        try:
            print("geojson", url)
            payload = download(url)
            json.loads(payload)
            print(" geojson bytes", len(payload))
            break
        except Exception as error:  # noqa: BLE001
            last_error = error
            print(" failed", error)
            payload = None
    if payload is None:
        raise SystemExit(f"Could not download Brazil geojson: {last_error}")

    data = json.loads(payload)
    features = data["features"] if data.get("type") == "FeatureCollection" else data
    print("features", len(features))
    print("sample props", features[0].get("properties"))

    collected = []
    all_coords: list[tuple[float, float]] = []
    for feature in features:
        identity = state_identity(feature.get("properties") or {})
        if not identity:
            print("skip props", feature.get("properties"))
            continue
        polygons = []
        for polygon in iter_polygons(feature.get("geometry") or {}):
            rings = []
            for ring in polygon:
                points = ring_points(ring)
                if len(points) >= 3:
                    rings.append(points)
                    all_coords.extend(points)
            if rings:
                polygons.append(rings)
        if polygons:
            collected.append({"code": identity[0], "name": identity[1], "polygons": polygons})

    if len(collected) < 20:
        raise SystemExit(f"Only mapped {len(collected)} states")

    min_lng = min(p[0] for p in all_coords)
    max_lng = max(p[0] for p in all_coords)
    min_lat = min(p[1] for p in all_coords)
    max_lat = max(p[1] for p in all_coords)
    pad_lng = (max_lng - min_lng) * 0.03
    pad_lat = (max_lat - min_lat) * 0.03
    min_lng -= pad_lng
    max_lng += pad_lng
    min_lat -= pad_lat
    max_lat += pad_lat
    span_lng = max_lng - min_lng
    span_lat = max_lat - min_lat
    map_width = 1000
    map_height = 1000 * (span_lat / span_lng)

    def project(lng: float, lat: float) -> tuple[float, float]:
        x = (lng - min_lng) / span_lng * map_width
        y = (max_lat - lat) / span_lat * map_height
        return x, y

    states = []
    for item in collected:
        commands = []
        centroid_points = []
        for rings in item["polygons"]:
            for ring_index, ring in enumerate(rings):
                projected = [project(lng, lat) for lng, lat in ring]
                if len(projected) > 700:
                    step = max(1, len(projected) // 700)
                    projected = projected[::step]
                    if projected[-1] != project(*ring[-1]):
                        projected.append(project(*ring[-1]))
                simplified = rdp(projected, 1.15 if ring_index == 0 else 1.4)
                if len(simplified) < 3:
                    continue
                if ring_index == 0:
                    centroid_points.extend(simplified)
                move = simplified[0]
                parts = [f"M{move[0]:.1f} {move[1]:.1f}"]
                for x, y in simplified[1:]:
                    parts.append(f"L{x:.1f} {y:.1f}")
                parts.append("Z")
                commands.append("".join(parts))
        if not commands or not centroid_points:
            continue
        cx = sum(p[0] for p in centroid_points) / len(centroid_points)
        cy = sum(p[1] for p in centroid_points) / len(centroid_points)
        states.append(
            {
                "code": item["code"],
                "name": item["name"],
                "d": "".join(commands),
                "cx": round(cx, 1),
                "cy": round(cy, 1),
            }
        )

    states.sort(key=lambda item: item["code"])
    MAP_OUT.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "/* Generated by scripts/prepare_assets.py. Do not edit by hand. */",
        "",
        f'export const brazilViewBox = "0 0 {map_width:.1f} {map_height:.1f}";',
        "",
        "export const brazilStates = [",
    ]
    for state in states:
        lines.append(
            "  { code: %s, name: %s, cx: %s, cy: %s, d: %s },"
            % (
                json.dumps(state["code"], ensure_ascii=False),
                json.dumps(state["name"], ensure_ascii=False),
                state["cx"],
                state["cy"],
                json.dumps(state["d"], ensure_ascii=False),
            )
        )
    lines.append("] as const;")
    lines.append("")
    lines.append("export type BrazilStatePath = (typeof brazilStates)[number];")
    lines.append("")
    MAP_OUT.write_text("\n".join(lines), encoding="utf-8")
    print("states", len(states), "file", MAP_OUT.stat().st_size)


if __name__ == "__main__":
    prepare_logo()
    prepare_segments()
    prepare_map()
    sys.exit(0)
