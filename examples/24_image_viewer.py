import json
import time
from pathlib import Path

import numpy as onp
import viser


def main() -> None:
    json_file = Path(__file__).parent / "assets/images.json"
    len_prefix = len("data:image/jpeg;base64,")
    with json_file.open() as f:
        data = json.load(f)
    images = {key: value[len_prefix:] for key, value in data["image"].items()}
    cameras = {
        key: onp.array(value).reshape(4, 4).T[:3, :]
        for key, value in data["c2w"].items()
    }

    server = viser.ViserServer()

    with server.gui.add_folder("Image Viewer"):
        # add an imageviewer for testing
        server.gui.add_image_viewer(order=0, images=images, cameras=cameras)

    # Pre-generate a point cloud to send.
    point_positions = onp.random.uniform(low=-1.0, high=1.0, size=(5000, 3))
    color_coeffs = onp.random.uniform(0.4, 1.0, size=(5000, 3))

    server.scene.add_point_cloud(
        "/point_cloud",
        points=point_positions,
        colors=color_coeffs,
        position=(0, 0, 0),
        point_shape="circle",
    )
    while True:
        time.sleep(1)


if __name__ == "__main__":
    main()
